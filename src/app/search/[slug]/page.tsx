import { db } from '@/lib/prisma'
import { WrapperProduct } from '../components/wrapper-product'
import { Prisma } from '@prisma/client'
import { ProductCard } from '@/components/product-card'
import { computeProductTotalPrice } from '@/helpers/compute-price'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'

type CategoryItemProps = {
  params: {
    slug: string
  }
  searchParams: {
    sort: string
  }
}

export async function generateMetadata({
  params,
}: CategoryItemProps): Promise<Metadata> {
  const category = await db.category.findFirst({
    where: {
      slug: params.slug,
    },
  })

  return {
    title: `${category?.name}`,
  }
}

export default async function CategoryProducts({
  params,
  searchParams,
}: CategoryItemProps) {
  const t = await getTranslations()

  let orderByObj: Prisma.ProductOrderByWithRelationInput = {}
  const sortParam = searchParams.sort
  if (!sortParam) {
    orderByObj = { id: 'desc' }
  } else if (sortParam === 'price-desc') {
    orderByObj = { basePrice: 'desc' }
  } else if (sortParam === 'price-asc') {
    orderByObj = { basePrice: 'asc' }
  }

  const category = await db.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: {
        orderBy: orderByObj,
      },
    },
  })

  if (!category) {
    return <h2 className="text-center">{t('Categories.categoryNotFound')}</h2>
  }

  const categoryName = category.slug as CategorySlug

  return (
    <>
      <div className="mb-4 flex flex-col font-medium ">
        <span className="mb-0.5 text-xl">
          {t(`Categories.${categoryName}`)}
        </span>
        <span className="text-sm lowercase text-muted-foreground">
          {category.products.length} {t('Products.products')}
        </span>
      </div>

      <WrapperProduct>
        {category.products.map((product) => (
          <ProductCard
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </WrapperProduct>
    </>
  )
}
