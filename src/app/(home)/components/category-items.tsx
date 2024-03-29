import Link from 'next/link'
import { Category } from '@prisma/client'
import { getCategoryIcon } from './get-category-icon'

type CategoryItemProps = {
  category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link
      href={`search/${category.slug}`}
      className="group flex flex-col items-center justify-center gap-2 rounded-lg border bg-card p-6 transition hover:border-primary"
    >
      {getCategoryIcon(category.slug)}
      <span className="font-medium">{category.name}</span>
    </Link>
  )
}
