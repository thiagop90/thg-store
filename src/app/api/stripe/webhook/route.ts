import { createOrder } from '@/actions/order'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import type { CartProductProps } from '@/store/cart'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: Request) {
  const body = await request.text()
  const sig = (await headers()).get('stripe-signature')

  if (!sig || !endpointSecret) {
    return NextResponse.json(
      { error: 'Signature or webhook secret missing' },
      { status: 400 },
    )
  }

  const event = stripe.webhooks.constructEvent(body, sig, endpointSecret)

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const userId = paymentIntent.metadata?.userId
    const products = paymentIntent.metadata?.products
      ? JSON.parse(paymentIntent.metadata.products)
      : []

    const sessions = await stripe.checkout.sessions.list({
      payment_intent: paymentIntent.id,
      limit: 1,
    })

    const sessionId = sessions.data[0]?.id

    await createOrder(products as CartProductProps[], userId, sessionId)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
