import { DynamicTag } from './dynamic-tag'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'
import type { Category } from '@prisma/client'

type CategoriesListProps = {
  categories: Category[]
}

export async function CategoriesList({ categories }: CategoriesListProps) {
  const t = await getTranslations('Categories')

  return (
    <div className="space-y-2">
      <h3 className="pl-3 text-sm text-muted-foreground">{t('categories')}</h3>
      <div className="flex flex-col gap-1.5">
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
    </div>
  )
}
