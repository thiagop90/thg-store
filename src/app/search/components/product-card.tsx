'use client'
import { computePriceAfterDiscount } from '@/helpers/compute-price'
import { useProductPricesFormatted } from '@/helpers/product-prices-formatted'
import { DiscountBadge } from '@/components/discount-badge'
import { AddToCartButton } from '@/components/cart/add-to-cart-button'
import { ContainerImage } from '@/components/container-image'
import {
  startTransition,
  useEffect,
  useState,
  unstable_ViewTransition as ViewTransition,
} from 'react'
import { Button } from '@/components/ui/button'
import { EyeIcon, XIcon } from 'lucide-react'
import { RatingStars } from './rating-stars'
import type { ProductWithReviews } from '@/app/api/search/route'
import Link from 'next/link'

type ProductCardProps = {
  product: ProductWithReviews
  active?: boolean
  onClick?: () => void
  onExit?: () => void
}

function ProductCard({ product, onClick }: ProductCardProps) {
  const { formattedBasePrice, formattedPriceAfterDiscount } =
    useProductPricesFormatted(computePriceAfterDiscount(product))

  return (
    <li className="group relative animate-fadeIn overflow-hidden border-b border-r bg-card transition-opacity">
      <ViewTransition name={`card-${product.id}`}>
        <div className="grid h-full w-full grid-cols-2 min-[500px]:grid-cols-1">
          <ViewTransition name={`actionButton-${product.id}`}>
            <Button
              className="absolute left-2 top-2 z-10 h-8 w-8 border-none"
              size="icon"
              variant="outline"
              onClick={onClick}
            >
              <EyeIcon className="size-3.5" />
            </Button>
          </ViewTransition>

          <ContainerImage product={product} />
          <ViewTransition name={`productInfo-${product.id}`}>
            <div className="flex flex-col py-4 pr-4 min-[500px]:gap-3 min-[500px]:px-4 min-[500px]:pt-0">
              <div className="flex-1 space-y-1.5">
                <ViewTransition name={`productName-${product.id}`}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="hover:underline hover:underline-offset-4"
                  >
                    <h3 className="text-pretty text-sm sm:text-base">
                      {product.name}
                    </h3>
                  </Link>
                </ViewTransition>
                <ViewTransition name={`productDescription-${product.id}`}>
                  <div></div>
                </ViewTransition>
                <ViewTransition name={`productReviews-${product.id}`}>
                  <RatingStars reviews={product.reviews} />
                </ViewTransition>
              </div>

              <div className="flex items-end justify-between">
                {product.discountPercentage > 0 ? (
                  <div>
                    <ViewTransition name={`basePrice-${product.id}`}>
                      <p className="text-xs text-muted-foreground line-through">
                        {formattedBasePrice}
                      </p>
                    </ViewTransition>

                    <div className="flex items-center gap-2">
                      <ViewTransition name={`totalPrice-${product.id}`}>
                        <p className="font-semibold">
                          {formattedPriceAfterDiscount}
                        </p>
                      </ViewTransition>
                      <ViewTransition name={`discountBadge-${product.id}`}>
                        <DiscountBadge>
                          {product.discountPercentage}
                        </DiscountBadge>
                      </ViewTransition>
                    </div>
                  </div>
                ) : (
                  <ViewTransition name={`basePrice-${product.id}`}>
                    <p className="font-semibold">{formattedBasePrice}</p>
                  </ViewTransition>
                )}

                <ViewTransition name={`addToCartButton-${product.id}`}>
                  <AddToCartButton
                    product={computePriceAfterDiscount(product)}
                  />
                </ViewTransition>
              </div>
            </div>
          </ViewTransition>
        </div>
      </ViewTransition>
    </li>
  )
}

function ProductCardActive({ product, active, onExit }: ProductCardProps) {
  const { formattedBasePrice, formattedPriceAfterDiscount } =
    useProductPricesFormatted(computePriceAfterDiscount(product))

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/40 backdrop-blur"
        onClick={onExit}
      />
      <div className="fixed left-[50%] top-[50%] z-[90] w-full max-w-[480px] translate-x-[-50%] translate-y-[-50%] px-4 sm:px-0">
        <ViewTransition name={`card-${product.id}`}>
          <div className="relative grid h-fit grid-cols-1 overflow-hidden rounded-2xl border bg-card">
            <ViewTransition name={`actionButton-${product.id}`}>
              <Button
                className="absolute right-4 top-4 z-10 h-8 w-8"
                size="icon"
                variant="outline"
                onClick={onExit}
              >
                <XIcon className="size-3.5" />
              </Button>
            </ViewTransition>

            <ContainerImage product={product} active={active} />

            <ViewTransition name={`productInfo-${product.id}`}>
              <div className="space-y-5 border-t bg-background/70 p-6">
                <div className="space-y-1.5">
                  <div className="flex flex-col gap-2 sm:flex-row-reverse sm:items-center sm:justify-between">
                    <ViewTransition name={`productReviews-${product.id}`}>
                      <RatingStars reviews={product.reviews} />
                    </ViewTransition>
                    <ViewTransition name={`productName-${product.id}`}>
                      <Link
                        href={`/product/${product.slug}`}
                        className="hover:underline hover:underline-offset-4"
                      >
                        <h3 className="font-medium sm:text-lg">
                          {product.name}
                        </h3>
                      </Link>
                    </ViewTransition>
                  </div>
                  <ViewTransition name={`productDescription-${product.id}`}>
                    <p className="text-pretty text-sm font-medium text-muted-foreground">
                      {product.description}
                    </p>
                  </ViewTransition>
                </div>

                <div className="flex items-end justify-between">
                  {product.discountPercentage > 0 ? (
                    <div>
                      <ViewTransition name={`basePrice-${product.id}`}>
                        <p className="text-xs text-muted-foreground line-through">
                          {formattedBasePrice}
                        </p>
                      </ViewTransition>

                      <div className="flex items-center gap-2">
                        <ViewTransition name={`totalPrice-${product.id}`}>
                          <p className="font-semibold">
                            {formattedPriceAfterDiscount}
                          </p>
                        </ViewTransition>
                        <ViewTransition name={`discountBadge-${product.id}`}>
                          <DiscountBadge>
                            {product.discountPercentage}
                          </DiscountBadge>
                        </ViewTransition>
                      </div>
                    </div>
                  ) : (
                    <ViewTransition name={`basePrice-${product.id}`}>
                      <p className="font-semibold">{formattedBasePrice}</p>
                    </ViewTransition>
                  )}

                  <ViewTransition name={`addToCartButton-${product.id}`}>
                    <AddToCartButton
                      size="default"
                      product={computePriceAfterDiscount(product)}
                    />
                  </ViewTransition>
                </div>
              </div>
            </ViewTransition>
          </div>
        </ViewTransition>
      </div>
    </>
  )
}

export function ProductCardTransition({ product }: ProductCardProps) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        startTransition(() => setActive(false))
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [active])

  if (active) {
    return (
      <ProductCardActive
        active={active}
        product={product}
        onExit={() => startTransition(() => setActive(false))}
      />
    )
  }

  return (
    <ProductCard
      active={active}
      product={product}
      onClick={() => startTransition(() => setActive(true))}
    />
  )
}
