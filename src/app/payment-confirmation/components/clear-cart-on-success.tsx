'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export function ClearCartOnSuccess() {
  const { cart, isOpenCart, removeAll, toggleCart } = useCartStore()

  useEffect(() => {
    if (cart.length > 0) {
      removeAll()
    }

    if (isOpenCart) {
      toggleCart()
    }
  }, [cart])

  return null
}
