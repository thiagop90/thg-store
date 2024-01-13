import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductWithTotalPrice } from '../helpers/compute-price'

type ToggleCart = {
  isOpenCart: boolean
  toggleCart: () => void
}

export const useOpenCart = create<ToggleCart>()((set, get) => ({
  isOpenCart: false,
  toggleCart: () => set({ isOpenCart: !get().isOpenCart }),
}))

export type CartProduct = ProductWithTotalPrice & {
  quantity: number
}

type CartStore = {
  cart: CartProduct[]
  quantity: () => number
  subtotal: () => number
  totalPrice: () => number
  discount: () => number
  addToCart: (product: ProductWithTotalPrice) => void
  removeFromCartByQuantity: (productId: string) => void
  removeItemFromCart: (productId: string) => void
  removeAll: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      quantity: () =>
        get().cart.reduce((total, product) => total + product.quantity, 0),

      subtotal: () =>
        get().cart.reduce(
          (total, product) =>
            total + Number(product.basePrice) * product.quantity,
          0,
        ),

      totalPrice: () =>
        get().cart.reduce(
          (total, product) => total + product.totalPrice * product.quantity,
          0,
        ),

      discount: () => get().subtotal() - get().totalPrice(),

      addToCart: (product: ProductWithTotalPrice) => {
        const updatedCart = updateCart(product, get().cart)
        set({ cart: updatedCart })
      },

      removeFromCartByQuantity: (productId: string) => {
        const updatedCart = removeCartProduct(productId, get().cart)
        set({ cart: updatedCart })
      },

      removeItemFromCart: (productId: string) => {
        const updatedCart = removeItemFromCart(productId, get().cart)
        set({ cart: updatedCart })
      },

      removeAll: () => set({ cart: [] }),
    }),

    { name: 'cart-items' },
  ),
)

function updateCart(
  product: ProductWithTotalPrice,
  cart: CartProduct[],
): CartProduct[] {
  const updatedCart = [...cart]
  const existingIndex = updatedCart.findIndex((item) => item.id === product.id)

  if (existingIndex !== -1) {
    updatedCart[existingIndex] = {
      ...updatedCart[existingIndex],
      quantity: updatedCart[existingIndex].quantity + 1,
    }
  } else {
    updatedCart.push({ ...product, quantity: 1 })
  }
  return updatedCart
}

function removeCartProduct(
  idProduct: string,
  cart: CartProduct[],
): CartProduct[] {
  const updatedCart = cart.map((item) =>
    item.id === idProduct ? { ...item, quantity: item.quantity - 1 } : item,
  )
  return updatedCart.filter((item) => item.quantity > 0)
}

function removeItemFromCart(
  idProduct: string,
  cart: CartProduct[],
): CartProduct[] {
  const updatedCart = cart.filter((item) => item.id !== idProduct)
  return updatedCart
}
