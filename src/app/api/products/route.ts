import db from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await db.product.findMany({
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
