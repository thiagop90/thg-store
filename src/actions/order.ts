'use server'

import { OrderStatus } from '@/generated/prisma'
import db from '@/lib/prisma'
import { CartProductProps } from '@/store/cart'
import { getTranslations } from 'next-intl/server'

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

export async function getOrderStatus(
  orderStatus: OrderStatus,
): Promise<{ text: string; status: OrderStatus }> {
  const t = await getTranslations('OrderPage')

  const statusMap: Record<OrderStatus, string> = {
    [OrderStatus.PAYMENT_CONFIRMED]: t('paymentConfirmed'),
    [OrderStatus.WAITING_FOR_PAYMENT]: t('waitingForPayment'),
  }

  return {
    text: statusMap[orderStatus],
    status: orderStatus,
  }
}
