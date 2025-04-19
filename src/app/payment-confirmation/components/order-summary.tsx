import { getOrderStatus } from '@/actions/order'
import { OrderItem } from './order-item'
import type { Prisma } from '@prisma/client'
import { Calendar, Clock, Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR, enUS } from 'date-fns/locale'
import { getLocale, getTranslations } from 'next-intl/server'
import { formatCurrency } from '@/helpers/format-currency'
import { computePriceAfterDiscount } from '@/helpers/compute-price'

interface OrderSummaryProps {
  order: Prisma.OrderGetPayload<{
    include: { orderProducts: { include: { product: true } } }
  }>
}
export default async function OrderSummary({ order }: OrderSummaryProps) {
  const [t, locale, orderStatus] = await Promise.all([
    await getTranslations('OrderPage'),
    await getLocale(),
    await getOrderStatus(order.status),
  ])

  const formattedDate = format(order.createdAt, 'PPP', {
    locale: locale === 'pt' ? ptBR : enUS,
  })

  const totalOrderPrice = order.orderProducts.reduce((total, item) => {
    const priceAfterDiscount =
      item.basePrice * (1 - item.discountPercentage / 100)
    return total + priceAfterDiscount * item.quantity
  }, 0)

  return (
    <div className="mx-auto max-w-2xl lg:max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Pedido #{order.id.slice(0, 8)}
          </h2>
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="text-sm font-medium">
          <span
            className={cn(
              'rounded-full px-2 py-1',
              orderStatus.status === 'PAYMENT_CONFIRMED'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800',
            )}
          >
            {orderStatus.text}
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {order.orderProducts.map((orderProduct) => (
          <OrderItem
            key={orderProduct.productId}
            product={computePriceAfterDiscount(orderProduct.product)}
            orderProductQuantity={orderProduct.quantity}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="mr-1 h-4 w-4" />
          <span>Total Itens: {order.orderProducts.length}</span>
        </div>
        <div className="text-lg font-semibold">
          Total: {formatCurrency(totalOrderPrice)}
        </div>
      </div>
    </div>
  )
}
