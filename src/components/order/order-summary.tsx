import { OrderItem } from './order-item'
import { OrderStatus, type Prisma } from '@prisma/client'
import { Calendar, Package } from 'lucide-react'
import { format } from 'date-fns'
import { getLocale, getTranslations } from 'next-intl/server'
import { formatCurrency } from '@/helpers/format-currency'
import { computePriceAfterDiscount } from '@/helpers/compute-price'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { getDateFnsLocale } from '@/lib/locale'
import { OrderSummaryItem } from './order-summary-item'
import { Icons } from '@/components/icons'

interface OrderSummaryProps {
  order: Prisma.OrderGetPayload<{
    include: { orderProducts: { include: { product: true } } }
  }>
}

export async function OrderSummary({ order }: OrderSummaryProps) {
  const [t, locale] = await Promise.all([
    await getTranslations('OrderPage'),
    await getLocale(),
  ])

  const statusMap: Record<OrderStatus, string> = {
    [OrderStatus.PAYMENT_CONFIRMED]: t('paymentConfirmed'),
    [OrderStatus.WAITING_FOR_PAYMENT]: t('waitingForPayment'),
  }

  const statusText = statusMap[order.status]

  const formattedDate = format(order.createdAt, 'PPP', {
    locale: getDateFnsLocale(locale),
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            {t('order')}{' '}
            <span className="uppercase">#{order.id.slice(0, 8)}</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
            <Separator className="h-4" orientation="vertical" />
            <div className="flex items-center text-sm text-muted-foreground">
              <Package className="mr-1 h-3.5 w-3.5" />
              <span>
                {t('totalItems')} {order.orderProducts.length}
              </span>
            </div>
          </div>
        </div>

        <Badge
          className="mt-3 w-fit text-sm sm:mt-0"
          variant={order.status === 'PAYMENT_CONFIRMED' ? 'success' : 'warning'}
        >
          <Icons.checkCircle className="mr-1.5" />
          {statusText}
        </Badge>
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

      <div className="space-y-4 divide-y">
        {summaryItems.map((item, idx) => (
          <OrderSummaryItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )
}
