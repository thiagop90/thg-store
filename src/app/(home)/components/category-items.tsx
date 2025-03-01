import Link from 'next/link'
import { Category } from '@prisma/client'
import { getCategoryIcon } from './get-category-icon'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'

type CategoryItemProps = {
  category: Category
}

export async function CategoryItem({ category }: CategoryItemProps) {
  const t = await getTranslations('Categories')

  const slug = category.slug as CategorySlug

  return (
    <Link
      href={`search/${category.slug}`}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-6 transition hover:border-primary"
    >
      {getCategoryIcon(category.slug)}
      <span className="font-medium">{t(slug)}</span>
    </Link>
  )
}
