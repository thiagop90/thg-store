'use client'

import type { CategorySlug } from '@/@types/category'
import { categoryIcons } from '@/helpers/category-icons'
import { LayoutGrid } from 'lucide-react'
import type { Category } from '@/generated/prisma'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type CategoryFilterProps = {
  categories: Category[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const t = useTranslations('Categories')
  const pathname = usePathname()

  const categoryOptions = useMemo(
    () => [
      {
        href: '/search',
        label: t('all'),
        icon: LayoutGrid,
        id: 'all',
      },
      ...categories.map((category) => ({
        href: `/search/${category.slug}`,
        label: t(category.slug as CategorySlug),
        icon: categoryIcons[category.slug as CategorySlug],
        id: category.id,
      })),
    ],
    [categories, t],
  )

  return (
    <div className="space-y-2">
      <h3 className="pl-3 text-sm text-muted-foreground">{t('categories')}</h3>
      <div className="flex flex-col gap-1.5">
        {categoryOptions.map((category) => {
          const isActive = pathname === category.href
          return (
            <Link
              href={category.href}
              key={category.id}
              className={cn(
                'w-full truncate rounded-lg px-3 py-2 text-sm hover:bg-secondary',
                isActive && 'pointer-events-none bg-neutral-700/50',
              )}
            >
              <category.icon
                className="mr-2 inline-block h-4 w-4"
                strokeWidth="1.75"
              />
              {category.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
