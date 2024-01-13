'use client'

import { useCartStore, useOpenCart } from '@/store/cart'
import { Button } from './ui/button'
import { useState } from 'react'
import { ProductWithTotalPrice } from '@/helpers/compute-price'
import { Loader, ShoppingCart } from 'lucide-react'

type AddToCartButtonType = {
  product: ProductWithTotalPrice
}

export function AddToCartButton({ product }: AddToCartButtonType) {
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
      className="w-full gap-1 transition-all duration-300"
    >
      {loading ? 'Adding...' : 'Add to Cart'}
      {loading ? (
        <Loader className="h-4 w-4 animate-spin" strokeWidth="2.5" />
      ) : (
        <ShoppingCart className="h-4 w-4" strokeWidth="2.25" />
      )}
    </Button>
  )
}
