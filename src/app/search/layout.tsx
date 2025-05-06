import { SortFilter } from './components/sort-filter/sort-filter'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import { NavbarMobile } from './components/navbar-mobile'
import { ScrollToTopButton } from './components/scroll-to-top-button'
import db from '@/lib/prisma'
import { CategoryFilter } from './components/category-filter/category-filter'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('SearchPage')

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
    <div className="relative mx-auto max-w-[550px] md:max-w-[800px] lg:max-w-screen-lg xl:max-w-screen-xl">
      <ScrollToTopButton />
      <div className="lg:flex lg:gap-6">
        <div className="sticky top-16 z-40 hidden h-full w-full max-w-[175px] lg:block">
          <div className="flex flex-col gap-3 rounded-2xl border bg-neutral-800/50 p-1.5 pt-3">
            <SortFilter />
            <Separator />
            <CategoryFilter categories={categories} />
          </div>
        </div>

        {children}
      </div>
      <NavbarMobile />
    </div>
  )
}
