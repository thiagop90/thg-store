import { prismaClient } from '@/lib/prisma'
import { CarouselImages } from './components/carousel-images'
import { computeProductTotalPrice } from '@/helpers/compute-price'
import { ProductInfo } from './components/product-info'
import { CarouselProducts } from '@/app/(home)/components/carousel-products'
import { Metadata } from 'next'

type ProductDetailsPageProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: params.slug,
    },
  })

  return {
    title: `${product?.name ?? 'Product Details'}`,
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: params.slug,
              },
            },
            take: 10,
          },
        },
      },
    },
  })

  if (!product) {
    return null
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="-mx-4 flex flex-col overflow-hidden border-y bg-card py-8 md:mx-0 md:rounded-lg md:border-x md:p-12 lg:flex-row lg:items-center lg:gap-8">
        <CarouselImages imageUrls={product.imageUrls} />
        <ProductInfo product={computeProductTotalPrice(product)} />
      </div>
      <div className="py-8">
        <h2 className="mb-4 text-2xl font-semibold">Related Products</h2>
        <CarouselProducts products={product.category.products} />
      </div>
    </div>
  )
}
