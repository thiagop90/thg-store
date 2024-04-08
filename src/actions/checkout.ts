'use server'

import { env } from '@/@types/env'
import { CartProduct } from '@/store/cart'
import Stripe from 'stripe'

export async function createCheckout(products: CartProduct[], orderId: string) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${env.HOST_URL}/orders`,
    cancel_url: env.HOST_URL,
    metadata: {
      orderId,
    },
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            description: product.description,
            images: product.imageUrls,
          },
          unit_amount: Math.round(product.totalPrice * 100),
        },
        quantity: product.quantity,
      }
    }),
  })

  return checkout
}
