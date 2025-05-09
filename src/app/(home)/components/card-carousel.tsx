import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { useProductPricesFormatted } from '@/helpers/product-prices-formatted'
import Link from 'next/link'
import { DiscountBadge } from '@/components/discount-badge'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'
import { Icons } from '@/components/icons'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type ProductItemProps = {
  product: ProductWithTotalPrice
}

export function CardCarousel({ product }: ProductItemProps) {
  const { formattedBasePrice, formattedPriceAfterDiscount } =
    useProductPricesFormatted(product)
  const [loading, setLoading] = useState(true)

  return (
    <li className="group relative aspect-square h-[30vh] max-h-[275px] min-h-[240px] flex-none overflow-hidden rounded-lg border bg-card lg:hover:border-primary">
      <Link href={`/product/${product.slug}`}>
        <div className="flex h-full w-full items-center justify-center">
          {loading && <Icons.loadingDots />}
          <img
            src={product.imageUrls[0]}
            sizes="100vw"
            className={cn('object-contain p-14', loading ? 'hidden' : 'block')}
            alt={product.name}
            onLoad={() => setLoading(false)}
          />
        </div>
        <div className="absolute inset-x-4 top-4 flex items-start">
          <h4 className="mr-2 flex-1 truncate text-sm font-medium hover:underline hover:underline-offset-4">
            {product.name}
          </h4>
        </div>

        <div className="absolute bottom-4 left-4">
          {product.discountPercentage > 0 ? (
            <div>
              <p className="text-xs font-medium text-muted-foreground line-through">
                {formattedBasePrice}
              </p>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{formattedPriceAfterDiscount}</p>
                <DiscountBadge>{product.discountPercentage}</DiscountBadge>
              </div>
            </div>
          ) : (
            <p className="font-semibold">{formattedBasePrice}</p>
          )}
        </div>
      </Link>
      <div className="absolute bottom-4 right-4">
        <AddToCartButton className="h-9 w-9" product={product} />
      </div>
    </li>
  )
}
