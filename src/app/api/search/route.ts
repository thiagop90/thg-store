import db from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

async function fetchProducts(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = 20
  const lastCursor = searchParams.get('lastCursor')
  const query = searchParams.get('query')
  const sortParam = searchParams.get('sort')

  let orderByObj: Prisma.ProductOrderByWithRelationInput = { id: 'desc' }

  if (sortParam === 'price-desc') {
    orderByObj = { basePrice: 'desc' }
  } else if (sortParam === 'price-asc') {
    orderByObj = { basePrice: 'asc' }
  }

  const totalCount = await db.product.count()

  const result = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: query || '', mode: 'insensitive' } },
        { category: { name: { contains: query || '', mode: 'insensitive' } } },
      ],
    },
    take: limit,
    ...(lastCursor && {
      skip: 1,
      cursor: { id: lastCursor },
    }),
    orderBy: orderByObj,
  })

  return {
    result,
    totalCount,
    nextId: result.length === limit ? result[limit - 1].id : undefined,
  }
}

export async function GET(req: NextRequest) {
  try {
    const result = await fetchProducts(req)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retrieving products', error },
      { status: 500 },
    )
  }
}
