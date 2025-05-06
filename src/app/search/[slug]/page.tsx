import db from '@/lib/prisma'
import { WrapperProduct } from '../components/wrapper-product'
import { computePriceAfterDiscount } from '@/helpers/compute-price'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'
import type { Prisma } from '@/generated/prisma'
import { ProductCardTransition } from '../components/product-card'

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
    getTranslations(),
    params,
    searchParams,
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
        include: { reviews: true },
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
          <ProductCardTransition key={product.id} product={product} />
        ))}
      </WrapperProduct>
    </div>
  )
}
