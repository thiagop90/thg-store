import { Prisma } from '@prisma/client'
import { OrderProductItem } from './order-product-item'
import { getOrderStatus } from '../helpers/status'
import { DateTime } from 'luxon'
import { useMemo } from 'react'
import { computeProductTotalPrice } from '@/helpers/compute-price'
import { formatCurrency } from '@/helpers/format-currency'

type OrderItemType = {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true }
      }
    }
  }>
}

export function OrderItem({ order }: OrderItemType) {
  const timeZone = 'America/Sao_Paulo'

  const formattedCreatedAtWithTime = DateTime.fromJSDate(order.createdAt, {
    zone: timeZone,
  }).toFormat("dd/MM/y 'at' HH:mm")

  const totalAmount = useMemo(() => {
    return order.orderProducts.reduce((acc, { product, quantity }) => {
      const productTotalPrice = computeProductTotalPrice(product)

      return acc + productTotalPrice.totalPrice * quantity
    }, 0)
  }, [order.orderProducts])

  const formattedTotalAmount = formatCurrency(totalAmount)

  return (
    <div className="rounded-lg border bg-card">
      <div className="space-y-4 divide-y border-b px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 sm:p-6">
        <div className="flex justify-between pt-4 sm:block sm:pt-0">
          <p className="font-medium">Status</p>
          <span className="text-muted-foreground sm:mt-1">
            {getOrderStatus(order.status)}
          </span>
        </div>
        <div className="flex justify-between pt-4 sm:block sm:pt-0">
          <p className="font-medium">Date placed</p>
          <span className="text-muted-foreground sm:mt-1">
            {formattedCreatedAtWithTime}
          </span>
        </div>
        <div className="flex justify-between pt-4 sm:block sm:pt-0">
          <p className="font-medium">Total amount</p>
          <span className="text-muted-foreground sm:mt-1">
            {formattedTotalAmount}
          </span>
        </div>
      </div>
      <ul className="divide-y">
        {order.orderProducts.map((orderProduct) => (
          <OrderProductItem key={orderProduct.id} orderProduct={orderProduct} />
        ))}
      </ul>
    </div>
  )
}
