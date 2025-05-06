'use server'

import { stripe } from '@/lib/stripe'
import db from '@/lib/prisma'
import type Stripe from 'stripe'

export type StripeSessionType = Stripe.Response<Stripe.Checkout.Session>
export type StripeSessionStatus = Stripe.Checkout.Session.Status | null

export async function getStripeSession(sessionId: string) {
  const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'payment_intent'],
  })

  return stripeSession
}

export async function getStripeSessionStatus(
  sessionId: string,
): Promise<StripeSessionStatus> {
  const stripeSession = await getStripeSession(sessionId)
  return stripeSession.status
}

export async function getOrderBySessionId(sessionId: string) {
  const order = await db.order.findFirst({
    where: {
      sessionId,
    },
    include: {
      orderProducts: {
        include: { product: true },
      },
    },
  })

  return order
}
