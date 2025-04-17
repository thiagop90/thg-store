import type { CartProductProps } from '@/store/cart'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function POST(request: Request) {
  const { cartItems, returnUrl, userId } = await request.json()

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const lineItems = cartItems.map((product: CartProductProps) => {
    return {
      price_data: {
        currency: 'brl',
        product_data: {
          name: product.name,
          images: product.imageUrls,
        },
        unit_amount: Math.round(product.totalPrice * 100),
      },
      quantity: product.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.HOST_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: returnUrl,
    metadata: {
      userId,
    },
  })

  return NextResponse.json({ sessionId: session.id })
}
