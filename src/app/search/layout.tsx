import { CategoriesList } from './components/categories-list'
import { SortList } from './components/sort-list'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

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
    <div className="flex max-w-screen-xl flex-col gap-8 pb-4 sm:mx-auto md:flex-row">
      <div className="h-full w-full flex-none md:sticky md:top-16 md:z-40 md:order-first md:max-w-[125px]">
        <CategoriesList />
      </div>
      <div className="order-last min-h-screen w-full sm:mx-0 md:order-none">
        {children}
      </div>
      <div className="order-none h-full flex-none md:sticky md:top-16 md:z-40 md:order-last md:w-[135px]">
        <SortList />
      </div>
    </div>
  )
}
