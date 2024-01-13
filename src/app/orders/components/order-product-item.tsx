import { computeProductTotalPrice } from '@/helpers/compute-price'
import { useProductPricesFormatted } from '@/helpers/product-prices-formatted'
import { Prisma } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { BuyAgainButton } from './buy-again-button'

type OrderProductItemType = {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true
    }
  }>
}

export function OrderProductItem({ orderProduct }: OrderProductItemType) {
  const productTotalPrice = computeProductTotalPrice(orderProduct.product)
  const { formattedBasePrice, formattedTotalPrice } =
    useProductPricesFormatted(productTotalPrice)

  return (
    <li className="p-4 sm:p-6">
      <div className="flex items-center">
        <div className="h-20 w-20 shrink-0 rounded-md bg-background p-1 sm:h-24 sm:w-24">
          <Image
            src={orderProduct.product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full object-contain"
            alt={orderProduct.product.name}
          />
        </div>
        <div className="ml-6 flex-1">
          <div>
            <h5>{orderProduct.product.name}</h5>
            <div className="flex items-center gap-2">
              {orderProduct.product.discountPercentage > 0 ? (
                <>
                  <p>{formattedTotalPrice}</p>
                  <p className="text-sm text-muted-foreground line-through">
                    {formattedBasePrice}
                  </p>
                </>
              ) : (
                <p>{formattedBasePrice}</p>
              )}
            </div>
            <p className="text-muted-foreground">
              Quantity: <span>{orderProduct.quantity}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center space-x-4 divide-x border-t pt-4 sm:mt-0 sm:justify-end sm:border-t-0 sm:pt-0">
        <div className="flex flex-1 justify-center sm:flex-none">
          <Link
            href={`/product/${orderProduct.product.slug}`}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            View product
          </Link>
        </div>
        <div className="flex flex-1 justify-center pl-4 sm:flex-none">
          <BuyAgainButton product={productTotalPrice} />
        </div>
      </div>
    </li>
  )
}
