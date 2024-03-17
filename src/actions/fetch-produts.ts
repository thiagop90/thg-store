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
    select: {
      id: true,
      name: true,
      category: {
        select: {
          slug: true,
        },
      },
    },
    take: 5,
  })

  return products
}
