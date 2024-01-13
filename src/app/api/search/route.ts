import { prismaClient } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

async function fetchProducts(
  req: NextRequest,
  orderByObj: Prisma.ProductOrderByWithRelationInput,
) {
  const { searchParams } = new URL(req.url)
  const limit = 20
  const cursor = searchParams.get('cursor')
  const query = searchParams.get('query')
  const sortParam = searchParams.get('sort')
  const cursorObj = cursor ? { id: cursor } : undefined

  if (!sortParam) {
    orderByObj = { id: 'desc' }
  } else if (sortParam === 'price-desc') {
    orderByObj = { basePrice: 'desc' }
  } else if (sortParam === 'price-asc') {
    orderByObj = { basePrice: 'asc' }
  }

  const search = await prismaClient.product.findMany({
    where: {
      OR: [
        { name: { contains: query || '', mode: 'insensitive' } },
        { category: { name: { contains: query || '', mode: 'insensitive' } } },
      ],
    },
    take: limit,
    cursor: cursorObj,
    skip: cursor ? 1 : 0,
    orderBy: orderByObj,
  })

  return {
    search,
    nextId: search.length === limit ? search[limit - 1].id : undefined,
  }
}

export async function GET(
  req: NextRequest,
  orderByObj: Prisma.ProductOrderByWithRelationInput,
) {
  try {
    const result = await fetchProducts(req, orderByObj)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { message: 'Error retrieving products', error },
      { status: 500 },
    )
  }
}
