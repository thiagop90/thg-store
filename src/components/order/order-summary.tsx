'use client'

import { useState } from 'react'
import { OrderItem } from './order-item'
import { OrderStatus, type Prisma } from '@/generated/prisma'
import { Dot, Package, PlusIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useTranslations, useLocale } from 'next-intl'
import { formatCurrency } from '@/helpers/format-currency'
import { computePriceAfterDiscount } from '@/helpers/compute-price'
import { Badge } from '@/components/ui/badge'
import { getDateFnsLocale } from '@/lib/locale'
import { OrderSummaryItem } from './order-summary-item'
import { Icons } from '@/components/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface OrderSummaryProps {
  order: Prisma.OrderGetPayload<{
    include: { orderProducts: { include: { product: true } } }
  }>
  isOpenByDefault?: boolean
}

export function OrderSummary({
  order,
  isOpenByDefault = true,
}: OrderSummaryProps) {
  const t = useTranslations('OrderPage')
  const locale = useLocale()

  const [accordionValue, setAccordionValue] = useState<string | undefined>(
    isOpenByDefault ? 'order-items' : undefined,
  )

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
    <div className="space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">
            {t('order')}{' '}
            <span className="uppercase">#{order.id.slice(0, 8)}</span>
          </h2>
          <Dot className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>

        <Badge
          className="mt-3 w-fit gap-1.5 text-sm sm:mt-0"
          variant={order.status === 'PAYMENT_CONFIRMED' ? 'success' : 'warning'}
        >
          {order.status === 'PAYMENT_CONFIRMED' ? (
            <Icons.checkCircle />
          ) : (
            <Icons.alertCircle />
          )}
          {statusText}
        </Badge>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value="order-items">
          <AccordionTrigger className="gap-4 pt-0 text-sm [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
            <span className="flex items-center gap-3">
              <Package
                size={16}
                className="shrink-0 opacity-60"
                aria-hidden="true"
              />
              <span>
                {t('totalItems')} {order.orderProducts.length}
              </span>
            </span>
            <PlusIcon
              size={16}
              className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
              aria-hidden="true"
            />
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 divide-y">
              {order.orderProducts.map((orderProduct) => (
                <OrderItem
                  key={orderProduct.productId}
                  product={computePriceAfterDiscount(orderProduct.product)}
                  orderProductQuantity={orderProduct.quantity}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="space-y-4 divide-y">
        {summaryItems.map((item, idx) => (
          <OrderSummaryItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  )
}
