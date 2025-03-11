import { CategoryFilter } from './components/filters/category-filter'
import { SortFilter } from './components/filters/sort-filter'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { MobileCategorySelect } from './components/filters/mobile-category-select'
import db from '@/lib/prisma'
import { MobileSortingSelect } from './components/filters/mobile-sorting-select'
import { Separator } from '@/components/ui/separator'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Products')

  return {
    title: {
      default: t('search'),
      template: '%s |  THG Store',
    },
  }
}

export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await db.category.findMany({})

  return (
    <div className="mx-auto flex flex-col gap-6 pb-4 sm:max-w-screen-md md:max-w-screen-lg lg:flex-row xl:max-w-screen-xl">
      <div className="sticky top-16 z-40 hidden h-full w-full max-w-[175px] lg:block">
        <div className="flex flex-col gap-3 rounded-2xl border bg-neutral-800/50 p-1.5 pt-3">
          <SortFilter />
          <Separator />
          <CategoryFilter />
        </div>
      </div>
      <div className="min-h-screen w-full sm:mx-0">{children}</div>
      <div className="fixed inset-x-2 bottom-2 z-50 mx-auto flex w-full max-w-[400px] gap-4 rounded-2xl border bg-background/90 p-4 backdrop-blur-lg duration-300 animate-in slide-in-from-bottom [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] lg:hidden">
        <MobileCategorySelect categories={categories} />
        <MobileSortingSelect />
      </div>
    </div>
  )
}
