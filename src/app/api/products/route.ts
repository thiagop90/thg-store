import { prismaClient } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await prismaClient.product.findMany({
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
  })

  return NextResponse.json(products)
}
