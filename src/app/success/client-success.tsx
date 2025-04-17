'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart'

export default function ClientSuccess() {
  const { removeAll } = useCartStore()

  useEffect(() => {
    removeAll()
  }, [removeAll])

  return null
}
