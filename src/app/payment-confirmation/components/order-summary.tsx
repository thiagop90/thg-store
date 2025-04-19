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
import { Separator } from '@/components/ui/separator'

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

  const totalOriginalPrice = order.orderProducts.reduce((total, item) => {
    return total + item.basePrice * item.quantity
  }, 0)

  const totalOrderPrice = order.orderProducts.reduce((total, item) => {
    const priceAfterDiscount =
      item.basePrice * (1 - item.discountPercentage / 100)
    return total + priceAfterDiscount * item.quantity
  }, 0)

  const discountAmount = totalOriginalPrice - totalOrderPrice

  const summaryItems = [
    {
      label: t('subtotal'),
      value: formatCurrency(totalOriginalPrice),
    },
    {
      label: t('discount'),
      value: `-${formatCurrency(discountAmount)}`,
    },
    {
      label: t('orderTotal'),
      value: formatCurrency(totalOrderPrice),
    },
  ]

  return (
    <div className="mx-auto max-w-2xl lg:max-w-4xl">
      <div className="mb-6 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">
              Pedido <span className="uppercase">#{order.id.slice(0, 8)}</span>
            </h2>
            <div className="flex items-center gap-2 ">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <Separator className="h-4" orientation="vertical" />
              <div className="flex items-center text-sm text-muted-foreground">
                <Package className="mr-1 h-4 w-4" />
                <span>Total de itens: {order.orderProducts.length}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm font-medium sm:mt-0">
            <span
              className={cn(
                'flex w-fit items-center gap-1.5 rounded-full px-3 py-1',
                orderStatus.status === 'PAYMENT_CONFIRMED'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800',
              )}
            >
              <svg
                className="size-5 text-green-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
              </svg>
              {orderStatus.text}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4 divide-y">
        {order.orderProducts.map((orderProduct) => (
          <OrderItem
            key={orderProduct.productId}
            product={computePriceAfterDiscount(orderProduct.product)}
            orderProductQuantity={orderProduct.quantity}
          />
        ))}
      </div>

      <div className="mt-10 divide-y">
        {summaryItems.map((item, index) => (
          <div
            key={item.label}
            className="group flex items-center justify-between py-4 first:pt-0 last:pb-0"
          >
            <p className="text-muted-foreground group-last:font-medium group-last:text-foreground">
              {item.label}
            </p>
            <p className="font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
