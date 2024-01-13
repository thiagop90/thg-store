'use client'

import { Button } from '@/components/ui/button'
import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { useCartStore, useOpenCart } from '@/store/cart'

type BuyAgainButtonType = {
  product: ProductWithTotalPrice
}

export function BuyAgainButton({ product }: BuyAgainButtonType) {
  const { addToCart } = useCartStore()
  const { toggleCart } = useOpenCart()

  const handleAddToCart = () => {
    addToCart(product)
    toggleCart()
  }

  return (
    <Button
      variant="link"
      className="h-fit p-0 text-base"
      onClick={handleAddToCart}
    >
      Buy again
    </Button>
  )
}
