import { CartProduct, useCartStore } from '@/store/cart'
import { Minus, Plus } from 'lucide-react'

type QuantityControlType = {
  product: CartProduct
}

export function QuantityControl({ product }: QuantityControlType) {
  const { addToCart, removeFromCartByQuantity } = useCartStore()

  const handleRemoveItemByQuantity = () => removeFromCartByQuantity(product.id)

  return (
    <div className="flex h-9 items-center rounded-full border">
      <button
        disabled={product.quantity === 1}
        onClick={handleRemoveItemByQuantity}
        className="flex h-full w-9 flex-none items-center justify-center px-2 transition enabled:hover:text-primary disabled:cursor-not-allowed disabled:text-muted-foreground"
      >
        <Minus className="h-4 w-4" />
      </button>
      <p className="w-6 text-center">{product.quantity}</p>
      <button
        onClick={() => addToCart(product)}
        className="flex h-full w-9 flex-none items-center justify-center px-2 transition hover:text-primary"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
