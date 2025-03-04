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
    <div className="flex flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground md:mb-0">
        {t('sortBy')}
      </h3>
      <div>
        {sortOptions(t).map((option) => (
          <li className="mt-2 shrink-0" key={option.param}>
            <Link
              className={cn('w-full hover:underline hover:underline-offset-4', {
                'underline underline-offset-4':
                  sortQuery === option.param ||
                  (!sortQuery && option.param === ''),
              })}
              href={buildSortUrl(option.param)}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </div>
    </div>
  )
}
