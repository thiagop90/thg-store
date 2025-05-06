'use client'

import { useCartStore } from '@/store/cart'
import { Button, type ButtonProps } from '@/components/ui/button'
import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { useTranslations } from 'next-intl'
import { Icons } from '@/components/icons'

type AddToCartButtonType = {
  product: ProductWithTotalPrice
} & ButtonProps

export function AddToCartButton({
  product,
  size = 'icon',
  ...props
}: AddToCartButtonType) {
  const t = useTranslations('Cart')

  const { addToCart, toggleCart } = useCartStore()

  function handleAddToCart() {
    addToCart(product)
    toggleCart(false)
  }

  return (
    <Button size={size} onClick={handleAddToCart} {...props}>
      {size !== 'icon' && t('addToCart')}
      <Icons.shoppingCartPlus />
    </Button>
  )
}
