import Link from 'next/link'
import { categoryIcon } from '@/constants/category-icon'
import { Category } from '@prisma/client'

type CategoryItemProps = {
  category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link
      href={`search/${category.slug}`}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-6 transition hover:border-primary"
    >
      {categoryIcon[category.slug as keyof typeof categoryIcon]}
      <span className="font-medium">{category.name}</span>
    </Link>
  )
}
