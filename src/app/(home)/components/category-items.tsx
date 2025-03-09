import Link from 'next/link'
import { Category } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'
import { categoryIcons } from '@/helpers/category-icons'

type CategoryItemProps = {
  category: Category
}

export async function CategoryItem({ category }: CategoryItemProps) {
  const t = await getTranslations('Categories')

  const slug = category.slug as CategorySlug
  const Icon = categoryIcons[slug]

  return (
    <Link
      href={`search/${category.slug}`}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-6 transition hover:border-primary"
    >
      <Icon className="h-8 w-8 group-hover:animate-wiggle" strokeWidth="1.25" />
      <span className="font-medium">{t(slug)}</span>
    </Link>
  )
}
