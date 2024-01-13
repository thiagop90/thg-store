'use client'

import { useCartStore } from '@/store/cart'
import { formatCurrency } from './format-currency'

export function useCartPricesFormatted() {
  const { subtotal, totalPrice, discount } = useCartStore()

  const formattedSubtotal = formatCurrency(subtotal())
  const formattedDiscount = formatCurrency(discount())
  const formattedTotalPriceWithDiscount = formatCurrency(totalPrice())

  return {
    formattedSubtotal,
    formattedDiscount,
    formattedTotalPriceWithDiscount,
  }
}
