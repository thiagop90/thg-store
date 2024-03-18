'use server'

import { prismaClient } from '@/lib/prisma'

export async function getCategories(searchQuery: string) {
  const products = await prismaClient.category.findMany({
    where: {
      name: {
        contains: searchQuery,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      slug: true,
      name: true,
    },
  })

  return products
}
