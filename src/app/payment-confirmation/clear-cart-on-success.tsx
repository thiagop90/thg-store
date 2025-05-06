'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export function ClearCartOnSuccess({ sessionId }: { sessionId: string }) {
  const { cart, clearCart, isOpenCart, toggleCart } = useCartStore()

  useEffect(() => {
    const isCartCleared = sessionStorage.getItem(`cart_cleared_${sessionId}`)

    if (cart.length > 0 && !isCartCleared) {
      clearCart()

      if (isOpenCart) {
        toggleCart(false)
      }

      sessionStorage.setItem(`cart_cleared_${sessionId}`, 'true')
    }
  }, [cart, sessionId])

  return null
}
