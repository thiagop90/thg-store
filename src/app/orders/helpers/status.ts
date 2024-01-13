import { OrderStatus } from '@prisma/client'

export function getOrderStatus(orderStatus: OrderStatus) {
  return {
    [OrderStatus.PAYMENT_CONFIRMED]: 'Payment Confirmed',
    [OrderStatus.WAITING_FOR_PAYMENT]: 'Waiting for Payment',
  }[orderStatus]
}
