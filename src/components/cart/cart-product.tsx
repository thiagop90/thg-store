import { CartProductProps, useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { SheetTrigger } from '@/components/ui/sheet'
import { QuantityControl } from './quantity-control'
import { useProductPricesFormatted } from '@/helpers/product-prices-formatted'
import { formatCurrency } from '@/helpers/format-currency'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

type CartProductType = {
  product: CartProductProps
}

export function CartProduct({ product }: CartProductType) {
  const t = useTranslations('Cart')
  const { removeItemFromCart } = useCartStore()
  const handleRemoveCartProduct = () => removeItemFromCart(product.id)

  const { formattedBasePrice, formattedPriceAfterDiscount } =
    useProductPricesFormatted(product)

  const formattedPriceWithQuantity = formatCurrency(
    product.quantity * product.totalPrice,
  )
  return (
    <li className="flex border-b py-6 last:border-0 ">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border bg-background p-1">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col ">
        <div>
          <div className="flex justify-between font-medium">
            <SheetTrigger asChild>
              <Link href={`/product/${product.slug}`} className="">
                {product.name}
              </Link>
            </SheetTrigger>
            <p className="ml-2">{formattedPriceWithQuantity}</p>
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-sm">
            {product.discountPercentage > 0 ? (
              <>
                <p>{formattedPriceAfterDiscount}</p>
                <p className="text-xs text-muted-foreground line-through">
                  {formattedBasePrice}
                </p>
              </>
            ) : (
              <p>{formattedBasePrice}</p>
            )}
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between">
          <Button
            onClick={handleRemoveCartProduct}
            variant="link"
            className="h-fit p-0 text-base"
          >
            {t('remove')}
          </Button>
          <QuantityControl product={product} />
        </div>
      </div>
    </li>
  )
}
