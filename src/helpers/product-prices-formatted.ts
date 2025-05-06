import { formatCurrency } from './format-currency'
import { ProductWithTotalPrice } from './compute-price'

export function useProductPricesFormatted(product: ProductWithTotalPrice) {
  const formattedBasePrice = formatCurrency(product.basePrice)
  const formattedPriceAfterDiscount = formatCurrency(product.totalPrice)

  return {
    formattedBasePrice,
    formattedPriceAfterDiscount,
  }
}
