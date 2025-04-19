import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { formatCurrency } from '@/helpers/format-currency'
import type { ProductWithTotalPrice } from '@/helpers/compute-price'
import Link from 'next/link'

interface OrderItemProps {
  product: ProductWithTotalPrice
  orderProductQuantity: number
}

export function OrderItem({ product, orderProductQuantity }: OrderItemProps) {
  const t = useTranslations('OrderPage')

  const priceAfterDiscount =
    product.basePrice * (1 - product.discountPercentage / 100)
  const itemTotal = priceAfterDiscount * orderProductQuantity

  return (
    <div className="flex items-center pt-4">
      <div className="flex flex-1 items-center gap-3 sm:gap-4">
        <div className="relative size-16 flex-shrink-0 sm:size-20">
          <Image
            src={product.imageUrls[0] || '/placeholder.png'}
            alt={product.name}
            fill
            className="rounded-sm bg-neutral-900 object-cover p-1.5"
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <Link
            href={`product/${product.slug}`}
            className="line-clamp-1 font-medium hover:underline hover:underline-offset-4"
          >
            {product.name}
          </Link>

          <div className="space-y-1">
            <div className="text-sm">
              Preço:{' '}
              {product.discountPercentage > 0 ? (
                <>
                  <span>{formatCurrency(priceAfterDiscount)}</span>
                  <span className="ml-1.5 text-muted-foreground line-through">
                    {formatCurrency(product.basePrice)}
                  </span>
                </>
              ) : (
                <span>{formatCurrency(product.basePrice)}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {t('quantity')}: {orderProductQuantity}
              </span>

              <span className="text-sm font-medium sm:text-base">
                {formatCurrency(itemTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
