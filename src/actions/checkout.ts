'use server'

import { CartProductProps } from '@/store/cart'
import Stripe from 'stripe'

export async function createCheckout(
  products: CartProductProps[],
  userId: string,
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${process.env.HOST_URL}/orders`,
    cancel_url: process.env.HOST_URL,
    metadata: {
      userId,
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
