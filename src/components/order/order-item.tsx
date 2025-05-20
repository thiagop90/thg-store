'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { formatCurrency } from '@/helpers/format-currency'
import type { ProductWithTotalPrice } from '@/helpers/compute-price'
import Link from 'next/link'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface OrderItemProps {
  product: ProductWithTotalPrice
  orderProductQuantity: number
}

export function OrderItem({ product, orderProductQuantity }: OrderItemProps) {
  const t = useTranslations('OrderPage')
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const priceAfterDiscount =
    product.basePrice * (1 - product.discountPercentage / 100)
  const itemTotal = priceAfterDiscount * orderProductQuantity

  return (
    <div className="flex items-center pt-4 first:pt-0">
      <div className="flex flex-1 items-center gap-3 sm:gap-4">
        <div className="relative flex size-16 flex-shrink-0 items-center justify-center rounded-sm bg-neutral-900">
          {!isImageLoaded && <Icons.loadingDots />}
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            className={cn(
              'object-cover p-1.5 transition-opacity duration-200',
              !isImageLoaded ? 'opacity-0' : 'opacity-100',
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="flex justify-between gap-2">
            <Link
              href={`product/${product.slug}`}
              className="font-medium hover:underline hover:underline-offset-4"
            >
              {product.name}
            </Link>
            <span className="text- font-medium sm:text-base">
              {formatCurrency(itemTotal)}
            </span>
          </div>

          <div className="flex justify-between gap-2">
            <span className="text-sm text-muted-foreground">
              {t('quantity')}: {orderProductQuantity}
            </span>

            <span className="text-sm text-muted-foreground">
              {orderProductQuantity > 1 && (
                <>
                  {product.discountPercentage > 0 ? (
                    <span>{formatCurrency(priceAfterDiscount)}</span>
                  ) : (
                    <span>{formatCurrency(product.basePrice)}</span>
                  )}{' '}
                  {t('each')}
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
