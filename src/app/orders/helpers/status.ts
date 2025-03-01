import { OrderStatus } from '@prisma/client'
import { getTranslations } from 'next-intl/server'

export async function getOrderStatus(orderStatus: OrderStatus) {
  const t = await getTranslations('OrderPage')

  return {
    [OrderStatus.PAYMENT_CONFIRMED]: t('paymentConfirmed'),
    [OrderStatus.WAITING_FOR_PAYMENT]: t('waitingForPayment'),
  }[orderStatus]
}
