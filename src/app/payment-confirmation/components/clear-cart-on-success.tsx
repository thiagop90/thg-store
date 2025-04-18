'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export function ClearCartOnSuccess() {
  const { removeAll, toggleCart } = useCartStore()

  useEffect(() => {
    removeAll()
    toggleCart()
  }, [])

  return null
}
