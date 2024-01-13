import { Product } from '@prisma/client'

export type ProductWithTotalPrice = Product & {
  totalPrice: number
}

export function computeProductTotalPrice(
  product: Product,
): ProductWithTotalPrice {
  const totalPrice =
    product.discountPercentage === 0
      ? Number(product.basePrice)
      : Number(product.basePrice) -
        (Number(product.basePrice) * product.discountPercentage) / 100

  return { ...product, totalPrice }
}
