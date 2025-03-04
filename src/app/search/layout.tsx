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
    <div className="flex max-w-screen-xl flex-col gap-6 pb-4 sm:mx-auto md:flex-row">
      <div className="flex gap-3 pt-4 md:hidden">
        <SelectCategory categories={categories} />
        <SelectSorting />
      </div>
      <div className="sticky top-16 z-40 hidden h-full w-full flex-none md:order-first md:block md:max-w-[125px]">
        <CategoriesList categories={categories} />
      </div>
      <div className="order-last min-h-screen w-full sm:mx-0 md:order-none">
        {children}
      </div>
      <div className="sticky top-16 z-40 order-last hidden h-full w-full flex-none md:flex md:w-[135px]">
        <SortList />
      </div>
    </div>
  )
}
