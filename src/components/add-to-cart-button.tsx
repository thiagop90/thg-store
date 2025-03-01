'use client'

import { useCartStore, useOpenCart } from '@/store/cart'
import { Button } from './ui/button'
import { useState } from 'react'
import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { useTranslations } from 'next-intl'
import { Icons } from './icons'

type AddToCartButtonType = {
  product: ProductWithTotalPrice
}

export function AddToCartButton({ product }: AddToCartButtonType) {
  const t = useTranslations('Cart')

  const { addToCart } = useCartStore()
  const { toggleCart } = useOpenCart()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      addToCart(product)
      toggleCart()
    }, 900)
  }

  return (
    <Button
      disabled={loading}
      onClick={handleAddToCart}
      className="w-full justify-between transition-all duration-300"
    >
      {t('addToCart')}
      {loading ? <Icons.spinner /> : <Icons.shoppingCartPlus />}
    </Button>
  )
}
