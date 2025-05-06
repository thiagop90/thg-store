import db from '@/lib/prisma'
import { CarouselImages } from './components/carousel-images'
import { computePriceAfterDiscount } from '@/helpers/compute-price'
import { ProductInfo } from './components/product-info'
import { CarouselProducts } from '@/app/(home)/components/carousel-products'
import { Metadata } from 'next'
import { BackButton } from './components/back-button'
import { getTranslations } from 'next-intl/server'

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { slug } = await params

  const product = await db.product.findFirst({
    where: {
      slug,
    },
  })

  return {
    title: `${product?.name ?? 'Product Details'}`,
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params

  const [t, product] = await Promise.all([
    getTranslations('ProductPage'),
    db.product.findFirst({
      where: {
        slug,
      },
      include: {
        category: {
          include: {
            products: {
              where: {
                slug: {
                  not: slug,
                },
              },
              take: 10,
            },
          },
        },
      },
    }),
  ])

  if (!product) {
    return null
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="relative -mx-4 flex flex-col border-y bg-card py-8 md:mx-0 md:rounded-lg md:border-x md:p-12 lg:flex-row lg:items-center lg:gap-8">
        <BackButton />
        <CarouselImages imageUrls={product.imageUrls} />
        <ProductInfo product={computePriceAfterDiscount(product)} />
      </div>
      <div className="py-8">
        <h2 className="mb-4 text-2xl font-semibold">{t('relatedProducts')}</h2>
        <CarouselProducts products={product.category.products} />
      </div>
    </div>
  )
}
