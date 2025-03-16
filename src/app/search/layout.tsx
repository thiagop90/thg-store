import { CategoryFilter } from './components/filters/category-filter'
import { SortFilter } from './components/filters/sort-filter'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Separator } from '@/components/ui/separator'
import { NavbarMobile } from './components/navbar-mobile'
import { ScrollToTopButton } from './components/scroll-to-top-button'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Products')

  return {
    title: {
      default: t('search'),
      template: '%s |  THG Store',
    },
  }
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto flex max-w-[550px] flex-col gap-6 pb-4 sm:max-w-screen-sm md:max-w-[800px] lg:max-w-screen-lg lg:flex-row xl:max-w-screen-xl">
      <ScrollToTopButton />

      <div className="sticky top-16 z-40 hidden h-full w-full max-w-[175px] lg:block">
        <div className="flex flex-col gap-3 rounded-2xl border bg-neutral-800/50 p-1.5 pt-3">
          <SortFilter />
          <Separator />
          <CategoryFilter />
        </div>
      </div>
      <div className="min-h-screen w-full sm:mx-0">{children}</div>

      <NavbarMobile />
    </div>
  )
}
