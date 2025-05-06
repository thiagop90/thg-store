import { Categories } from './components/categories'
import db from '@/lib/prisma'
import { CarouselProducts } from './components/carousel-products'
import { SectionTitle } from './components/section-title'
import { LinkSeeAll } from './components/link-see-all'
import { getTranslations } from 'next-intl/server'
import type { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { dragFree: true }

export default async function Home() {
  const [t, deals, keyboards, mouses, headsets] = await Promise.all([
    getTranslations(),
    db.product.findMany({
      where: { discountPercentage: { gt: 0 } },
      take: 18,
    }),

    db.product.findMany({
      where: { category: { slug: 'keyboards' } },
      take: 10,
    }),

    db.product.findMany({
      where: { category: { slug: 'mouses' } },
      take: 10,
    }),

    db.product.findMany({
      where: { category: { slug: 'headsets' } },
      take: 10,
    }),
  ])

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-8 pb-8">
      <div className="-mx-4 flex flex-col bg-primary px-4 pt-6 md:mx-0 md:flex-row md:rounded-lg md:p-6">
        <div className="flex flex-col md:w-[45%] md:justify-center md:pr-6 lg:w-1/3">
          <h1
            translate="no"
            className="mb-2 text-5xl font-bold leading-relaxed tracking-tighter lg:text-[3.75rem]"
          >
            7-Day{' '}
            <span translate="no" className="text-card">
              Sale
            </span>
          </h1>
          <h3 className="mb-10 text-xl font-bold md:text-2xl">
            {t('HomePage.discountMessage')}
          </h3>
        </div>
        <div className="-mb-px md:w-[55%] lg:w-2/3">
          <CarouselProducts
            className="rounded-t-lg bg-background py-6 md:rounded-b-lg md:px-4"
            products={deals}
            options={OPTIONS}
            progressBar
            autoplay
          />
        </div>
      </div>

      <div>
        <SectionTitle className="mb-4 text-center">
          {t('HomePage.shopByCategory')}
        </SectionTitle>
        <Categories />
      </div>

      {[
        { title: t('Categories.mouses'), products: mouses, slug: 'mouses' },
        {
          title: t('Categories.keyboards'),
          products: keyboards,
          slug: 'keyboards',
        },
        {
          title: t('Categories.headsets'),
          products: headsets,
          slug: 'headsets',
        },
      ].map(({ title, products, slug }) => (
        <div key={slug}>
          <div className="mb-4 flex items-end justify-between">
            <SectionTitle>{title}</SectionTitle>
            <LinkSeeAll href={`/search/${slug}`} />
          </div>
          <CarouselProducts products={products} />
        </div>
      ))}
    </div>
  )
}
