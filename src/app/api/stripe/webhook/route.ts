import { createOrder } from '@/actions/order'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const sig = await headersList.get('stripe-signature')

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: 'No Signature or webhook secret missing' },
      { status: 400 },
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 },
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const cartProducts = session.metadata?.products
      ? JSON.parse(session.metadata.products)
      : []

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found in session metadata' },
        { status: 400 },
      )
    }

    try {
      await createOrder(cartProducts, userId, session.id)
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
