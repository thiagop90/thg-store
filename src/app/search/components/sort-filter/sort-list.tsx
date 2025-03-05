'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { sortOptions } from './sort-options'

export function SortList() {
  const t = useTranslations('SortBy')
  const pathname = usePathname()
  const search = useSearchParams()
  const searchQuery = search ? search.get('query') : null
  const sortQuery = search ? search.get('sort') : null

  const buildSortUrl = (sortParam: string) => {
    const currentUrl = searchQuery ? `?query=${searchQuery}` : pathname
    const separator = currentUrl.includes('?') ? '&' : '?'
    return sortParam ? `${currentUrl}${separator}sort=${sortParam}` : currentUrl
  }

  return (
    <div className="space-y-2">
      <h3 className="pl-3 text-sm text-muted-foreground">{t('sortBy')}</h3>
      <div className="flex flex-col gap-2">
        {sortOptions(t).map((option) => (
          <Link
            key={option.param}
            className={cn('w-full rounded-lg px-3 py-2 hover:bg-secondary', {
              'pointer-events-none bg-neutral-700/50':
                sortQuery === option.param ||
                (!sortQuery && option.param === ''),
            })}
            href={buildSortUrl(option.param)}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
