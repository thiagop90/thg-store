import db from '@/lib/prisma'
import { WrapperProduct } from '../components/wrapper-product'
import { Prisma } from '@prisma/client'
import { ProductCard } from '@/app/search/components/product-card'
import { computeProductTotalPrice } from '@/helpers/compute-price'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'

type CategoryItemProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort: string }>
}

export async function generateMetadata({
  params,
}: CategoryItemProps): Promise<Metadata> {
  const { slug } = await params

  const category = await db.category.findFirst({
    where: {
      slug,
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
  const [t, { slug }, { sort }] = await Promise.all([
    await getTranslations(),
    await params,
    await searchParams,
  ])

  let orderByObj: Prisma.ProductOrderByWithRelationInput = {}
  if (!sort) {
    orderByObj = { id: 'desc' }
  } else if (sort === 'price-desc') {
    orderByObj = { basePrice: 'desc' }
  } else if (sort === 'price-asc') {
    orderByObj = { basePrice: 'asc' }
  }

  const category = await db.category.findFirst({
    where: {
      slug,
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
    <div className="flex-1 space-y-6 py-8">
      <div className="flex flex-col text-center font-medium lg:text-left">
        <span className="mb-0.5 text-2xl">
          {t(`Categories.${categoryName}`)}
        </span>
        <span className="text-sm lowercase text-muted-foreground">
          {category.products.length} {t('SearchPage.products')}
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
    </div>
  )
}
