'use client'

import { Button } from '@/components/ui/button'
import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { useCartStore } from '@/store/cart'
import { useTranslations } from 'next-intl'

type BuyAgainButtonType = {
  product: ProductWithTotalPrice
}

export function BuyAgainButton({ product }: BuyAgainButtonType) {
  const t = useTranslations('OrderPage')

  const { addToCart, toggleCart } = useCartStore()

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
      {t('buyAgain')}
    </Button>
  )
}
