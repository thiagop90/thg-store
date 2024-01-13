import { AddToCartButton } from '@/components/add-to-cart-button'
import { DiscountBadge } from '@/components/discount-badge'
import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { useProductPricesFormatted } from '@/helpers/product-prices-formatted'

type ProductInfoType = {
  product: ProductWithTotalPrice
}

export function ProductInfo({ product }: ProductInfoType) {
  const { formattedBasePrice, formattedTotalPrice } =
    useProductPricesFormatted(product)

  const truncatedDescription = `${product.description.slice(0, 376)}`

  return (
    <div className="flex basis-full flex-col px-6 md:px-0 lg:basis-2/5">
      <div className="mb-6 flex flex-col border-b pb-6">
        <div className="mb-2 text-muted-foreground">
          <span className="">
            Sold and delivered by:{' '}
            <span className="font-bold text-primary">THG Store</span>{' '}
          </span>
          <span className="mx-1">|</span>
          <span className="font-bold text-green-500">In stock</span>
        </div>
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <h3 className="text-lg font-semibold md:text-xl">
            {formattedTotalPrice}
          </h3>
          {product.discountPercentage > 0 && (
            <DiscountBadge>{product.discountPercentage}</DiscountBadge>
          )}
        </div>
        {product.discountPercentage > 0 && (
          <p className="text-sm font-semibold text-muted-foreground line-through md:text-base">
            {formattedBasePrice}
          </p>
        )}
      </div>
      <h2 className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {truncatedDescription}
      </h2>
      <AddToCartButton product={product} />
    </div>
  )
}
