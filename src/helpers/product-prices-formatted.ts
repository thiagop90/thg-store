import { formatCurrency } from './format-currency'
import { ProductWithTotalPrice } from './compute-price'

export function useProductPricesFormatted(product: ProductWithTotalPrice) {
  const formattedBasePrice = formatCurrency(Number(product.basePrice))
  const formattedTotalPrice = formatCurrency(product.totalPrice)

  return {
    formattedBasePrice,
    formattedTotalPrice,
  }
}
