import { createOrder } from '@/actions/order'
import db from '@/lib/prisma'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  const body = await request.text()
  const sig = (await headers()).get('stripe-signature')

  let event: Stripe.Event

  try {
    if (!sig || !endpointSecret) {
      return NextResponse.json(
        { error: 'Signature or webhook secret missing' },
        { status: 400 },
      )
    }
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const cartProducts = session.metadata?.cartProducts
      ? JSON.parse(session.metadata.cartProducts)
      : []

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found in session metadata' },
        { status: 400 },
      )
    }

    if (!cartProducts.length) {
      return NextResponse.json(
        { error: 'No cart products found in session metadata' },
        { status: 400 },
      )
    }

    try {
      // Criar a ordem
      const order = await createOrder(cartProducts, userId)

      // Atualizar a ordem com status confirmado
      await db.order.update({
        where: { id: order.id },
        data: { status: 'PAYMENT_CONFIRMED' },
      })
    } catch (error) {
      console.error('Error processing order:', error)
      return NextResponse.json(
        { error: 'Error processing order' },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
