import { CategoriesList } from './components/sort-filter/categories-list'
import { SortList } from './components/sort-filter/sort-list'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { SelectCategory } from './components/sort-filter/select-category'
import { prismaClient } from '@/lib/prisma'
import { SelectSorting } from './components/sort-filter/select-sorting'

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
  const categories = await prismaClient.category.findMany({})

  return (
    <div className="mx-auto flex flex-col gap-6 pb-4 sm:max-w-screen-md lg:max-w-[1366px] lg:flex-row">
      <div className="fixed inset-x-2 bottom-2 z-50 mx-auto flex w-full max-w-[400px] gap-4 rounded-2xl border bg-background/90 p-4 backdrop-blur-lg duration-300 animate-in slide-in-from-bottom lg:hidden">
        <SelectCategory categories={categories} />
        <SelectSorting />
      </div>
      <div className="sticky top-16 z-40 hidden h-full w-full max-w-[165px] flex-none rounded-2xl border bg-neutral-800/50 lg:order-first  lg:block">
        <div className="p-2 pt-3">
          <CategoriesList categories={categories} />
        </div>
      </div>
      <div className="order-last min-h-screen w-full sm:mx-0 lg:order-none">
        {children}
      </div>
      <div className="sticky top-16 z-40 order-last hidden h-full w-auto flex-none rounded-2xl border bg-neutral-800/50 lg:flex">
        <div className="p-2 pt-3">
          <SortList />
        </div>
      </div>
    </div>
  )
}
