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
      <div className="fixed inset-x-2 bottom-2 z-50 mx-auto flex w-full max-w-[400px] gap-4 rounded-2xl border bg-background/80 p-4 backdrop-blur-lg duration-300 animate-in slide-in-from-bottom [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] md:hidden">
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
