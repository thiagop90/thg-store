'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { sortOptions } from './sort-options'

export function SortFilter() {
  const t = useTranslations('SortBy')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const sortQuery = searchParams.get('sort') || ''

  function buildSortUrl(sortParam: string) {
    const params = new URLSearchParams(searchParams)
    if (sortParam) {
      params.set('sort', sortParam)
    } else {
      params.delete('sort')
    }
    return `${pathname}${params.size > 0 ? `?${params.toString()}` : ''}`
  }

  return (
    <div className="space-y-2">
      <h3 className="pl-3 text-sm text-muted-foreground">{t('sortBy')}</h3>
      <div className="flex flex-col gap-1.5">
        {sortOptions(t).map((option) => {
          const isActive =
            sortQuery === option.param || (!sortQuery && option.param === '')
          return (
            <Link
              key={option.param}
              className={cn(
                'w-full truncate rounded-lg px-3 py-2 text-sm hover:bg-secondary',
                isActive && 'pointer-events-none bg-neutral-700/50',
              )}
              href={buildSortUrl(option.param)}
              aria-current={isActive ? 'true' : undefined}
              tabIndex={isActive ? -1 : 0}
            >
              <option.icon
                className="me-2 inline-block h-4 w-4"
                strokeWidth="1.75"
              />
              {option.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
