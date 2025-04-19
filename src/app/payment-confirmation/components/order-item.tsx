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
    <div className="border-t pt-4">
      <div className="flex items-center gap-3">
        <div className="relative size-16 flex-shrink-0 ">
          <Image
            src={product.imageUrls[0] || '/placeholder.png'}
            alt={product.name}
            fill
            className="rounded object-cover"
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <Link
            href={`/${product.slug}`}
            className="font-medium hover:underline hover:underline-offset-4 sm:text-base"
          >
            {product.name}
          </Link>

          <div className="space-y-0.5">
            <p className="text-sm">
              Preço:{' '}
              {product.discountPercentage > 0 ? (
                <>
                  <span>{formatCurrency(priceAfterDiscount)}</span>{' '}
                  <span className="ml-1.5 text-muted-foreground line-through">
                    {formatCurrency(product.basePrice)}
                  </span>
                </>
              ) : (
                <span>{formatCurrency(product.basePrice)}</span>
              )}
            </p>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                {t('quantity')}: {orderProductQuantity}
              </span>
              <span className="font-medium">{formatCurrency(itemTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
