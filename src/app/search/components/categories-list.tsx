import { prismaClient } from '@/lib/prisma'
import { DynamicTag } from './dynamic-tag'
import { CategoriesDropdown } from './categories-dropdown'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'

export async function CategoriesList() {
  const categories = await prismaClient.category.findMany({})

  const t = await getTranslations('Categories')

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground md:mb-0">
        {t('categories')}
      </h3>
      <div className="hidden md:block">
        <DynamicTag href="/search">{t('all')}</DynamicTag>
        {categories.map((category) => {
          const categoryName = category.slug as CategorySlug
          return (
            <DynamicTag href={`/search/${category.slug}`} key={category.id}>
              {t(categoryName)}
            </DynamicTag>
          )
        })}
      </div>
      <div className="md:hidden">
        <CategoriesDropdown categories={categories} />
      </div>
    </div>
  )
}
