import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { useProductPricesFormatted } from '@/helpers/product-prices-formatted'
import Link from 'next/link'
import { ContainerImage } from '@/components/container-image'
import { DiscountBadge } from './discount-badge'
import { AddToCartButton } from './add-to-cart-button'

type ProductItemProps = {
  product: ProductWithTotalPrice
}

export function ProductCard({ product }: ProductItemProps) {
  const { formattedBasePrice, formattedTotalPrice } =
    useProductPricesFormatted(product)

  return (
    <li className="group relative animate-fadeIn overflow-hidden border-b border-r bg-card transition-opacity">
      <Link
        className="flex h-full w-full flex-col p-2"
        href={`/product/${product.slug}`}
      >
        <div className="relative flex aspect-square items-center justify-center overflow-hidden p-8 md:p-10 lg:p-12">
          <ContainerImage imageUrl={product.imageUrls} />
        </div>
        {product.discountPercentage > 0 && (
          <DiscountBadge className="absolute left-2 top-2 z-20">
            {product.discountPercentage}
          </DiscountBadge>
        )}

        <div className="z-20 flex flex-1 flex-col rounded-lg border bg-background/70 p-2 transition duration-300 group-hover:-translate-y-12">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm sm:text-base">
            {product.name}
          </p>

          <div className="mt-1 flex flex-1 flex-col justify-end">
            {product.discountPercentage > 0 ? (
              <>
                <p className="text-xs text-muted-foreground line-through">
                  {formattedBasePrice}
                </p>
                <p className="font-semibold">{formattedTotalPrice}</p>
              </>
            ) : (
              <p className="font-semibold">{formattedBasePrice}</p>
            )}
          </div>
        </div>
      </Link>
      <div className="absolute inset-x-0 bottom-0 translate-y-full px-2 pb-2 transition duration-300  group-hover:-translate-y-0">
        <AddToCartButton product={product} />
      </div>
    </li>
  )
}
