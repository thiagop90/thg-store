'use server'

import { prismaClient } from '@/lib/prisma'
import { CartProductProps } from '@/store/cart'

export async function createOrder(
  cartProducts: CartProductProps[],
  userId: string,
) {
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: 'WAITING_FOR_PAYMENT',
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
