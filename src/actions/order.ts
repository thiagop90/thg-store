'use server'

import db from '@/lib/prisma'
import { CartProductProps } from '@/store/cart'

export async function createOrder(
  cartProducts: CartProductProps[],
  userId: string,
  sessionId: string,
) {
  const order = await db.order.create({
    data: {
      userId,
      status: 'PAYMENT_CONFIRMED',
      sessionId,
      orderProducts: {
        createMany: {
          data: cartProducts.map((product) => ({
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    },
  })

  return order
}
