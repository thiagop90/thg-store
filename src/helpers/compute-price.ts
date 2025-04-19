import { Product } from '@prisma/client'

export type ProductWithTotalPrice = Product & { totalPrice: number }

export function computePriceAfterDiscount(
  product: Product,
): ProductWithTotalPrice {
  const totalPrice =
    product.discountPercentage > 0
      ? product.basePrice -
        (product.basePrice * product.discountPercentage) / 100
      : product.basePrice

  return { ...product, totalPrice }
}
