'use server'

import { prismaClient } from '@/lib/prisma'

export async function fetchProducts(searchQuery: string) {
  const products = await prismaClient.product.findMany({
    where: {
      name: {
        contains: searchQuery,
        mode: 'insensitive',
      },
    },
    include: {
      category: true,
    },
    take: 5,
  })

  return products
}
