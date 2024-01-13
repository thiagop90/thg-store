import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { useProductPricesFormatted } from '@/helpers/product-prices-formatted'
import Link from 'next/link'
import { ContainerImage } from '@/components/container-image'
import { DiscountBadge } from '@/components/discount-badge'

type ProductItemProps = {
  product: ProductWithTotalPrice
}

export function CardCarousel({ product }: ProductItemProps) {
  const { formattedBasePrice, formattedTotalPrice } =
    useProductPricesFormatted(product)

  return (
    <li className="relative aspect-square h-[30vh] max-h-[275px] flex-none overflow-hidden rounded-lg border bg-card hover:border-primary">
      <Link href={`/product/${product.slug}`}>
        <div className="flex h-full w-full items-center justify-center p-14">
          <ContainerImage imageUrl={product.imageUrls} />
        </div>
        <div className="absolute inset-x-4 top-4 flex">
          <p className="mr-2 flex-1 truncate text-sm font-semibold">
            {product.name}
          </p>

          {product.discountPercentage > 0 && (
            <DiscountBadge>{product.discountPercentage}</DiscountBadge>
          )}
        </div>

        <div className="absolute inset-x-4 bottom-4">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              {product.discountPercentage > 0 ? (
                <>
                  <p className="text-xs font-medium text-muted-foreground line-through">
                    {formattedBasePrice}
                  </p>
                  <p className="font-semibold">{formattedTotalPrice}</p>
                </>
              ) : (
                <p className="font-semibold">{formattedBasePrice}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
