import type { CartProductProps } from '@/store/cart'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function POST(request: Request) {
  const { products, userId } = await request.json()
  const origin = (await headers()).get('origin')

  const reducedProducts = products.map((product: CartProductProps) => ({
    id: product.id,
    quantity: product.quantity,
    basePrice: product.basePrice,
    discountPercentage: product.discountPercentage,
  }))

  const productsJson = JSON.stringify(reducedProducts)

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: products.map((product: CartProductProps) => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            images: product.imageUrls,
          },
          unit_amount: product.totalPrice,
        },
        quantity: product.quantity,
      }
    }),
    mode: 'payment',
    payment_method_types: ['card'],
    return_url: `${origin}/payment-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      userId,
      products: productsJson,
    },
  })

  return NextResponse.json({
    id: session.id,
    client_secret: session.client_secret,
  })
}
