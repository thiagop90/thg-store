'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'
import type { StripeSessionStatus } from '@/actions/stripe'

export function ClearCartOnSuccess({
  sessionStatus,
}: {
  sessionStatus: StripeSessionStatus
}) {
  const { cart, clearCart, toggleCart } = useCartStore()

  useEffect(() => {
    if (cart.length > 0 && sessionStatus === 'complete') {
      clearCart()
      toggleCart(false)
    }
  }, [cart, sessionStatus])

  return null
}
