import Link from 'next/link'
import { Category } from '@/generated/prisma'
import { getTranslations } from 'next-intl/server'
import type { CategorySlug } from '@/@types/category'
import { categoryIcons } from '@/helpers/category-icons'
import { cn } from '@/lib/utils'

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
      className={cn(
        'group grid place-content-center gap-3 border bg-card p-6 transition-colors duration-200 hover:z-10 hover:border-primary',
        'first:-mb-px first:-mr-px first:rounded-tl-lg lg:first:-mb-0 lg:first:rounded-bl-lg',
        '[&:nth-child(2)]:-mb-px [&:nth-child(2)]:rounded-tr-lg sm:[&:nth-child(2)]:-mr-px sm:[&:nth-child(2)]:rounded-none lg:[&:nth-child(2)]:-mb-0',
        '[&:nth-child(3)]:-mb-px [&:nth-child(3)]:-mr-px sm:[&:nth-child(3)]:-mr-0 sm:[&:nth-child(3)]:rounded-tr-lg lg:[&:nth-child(3)]:-mb-0 lg:[&:nth-child(3)]:-mr-px lg:[&:nth-child(3)]:rounded-none',
        '[&:nth-child(4)]:-mb-px sm:[&:nth-child(4)]:-mb-0 sm:[&:nth-child(4)]:-mr-px sm:[&:nth-child(4)]:rounded-bl-lg lg:[&:nth-child(4)]:rounded-none',
        '[&:nth-child(5)]:-mr-px [&:nth-child(5)]:rounded-bl-lg sm:[&:nth-child(5)]:rounded-none',
        'last:rounded-br-lg lg:last:rounded-tr-lg',
      )}
    >
      <Icon
        className="mx-auto size-8 text-muted-foreground group-hover:animate-wiggle"
        strokeWidth="1.5"
      />
      <span className="font-medium">{t(slug)}</span>
    </Link>
  )
}
