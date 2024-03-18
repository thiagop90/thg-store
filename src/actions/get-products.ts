'use server'

import { prismaClient } from '@/lib/prisma'

export async function getProducts(searchQuery: string) {
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
      slug: true,
      category: {
        select: {
          id: true,
          slug: true,
        },
      },
    },
    take: 5,
  })

  return products
}
