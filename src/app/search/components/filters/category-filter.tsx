import { DynamicTag } from './dynamic-tag'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'
import { categoryIcons } from '@/helpers/category-icons'
import { LayoutGrid } from 'lucide-react'
import db from '@/lib/prisma'

export async function CategoryFilter() {
  const [t, categories] = await Promise.all([
    await getTranslations('Categories'),
    await db.category.findMany({}),
  ])

  return (
    <div className="space-y-2">
      <h3 className="pl-3 text-sm text-muted-foreground">{t('categories')}</h3>
      <div className="flex flex-col gap-1.5">
        <DynamicTag href="/search">
          <LayoutGrid
            className="mr-2 inline-block h-4 w-4"
            strokeWidth="1.75"
          />
          {t('all')}
        </DynamicTag>
        {categories.map((category) => {
          const Icon =
            categoryIcons[category.slug as keyof typeof categoryIcons]
          return (
            <DynamicTag href={`/search/${category.slug}`} key={category.id}>
              <Icon className="mr-2 inline-block h-4 w-4" strokeWidth="1.75" />
              {t(category.slug as CategorySlug)}
            </DynamicTag>
          )
        })}
      </div>
    </div>
  )
}
