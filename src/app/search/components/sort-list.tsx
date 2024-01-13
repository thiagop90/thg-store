'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SortDropdown } from './sort-dropdown'

export function SortList() {
  const pathname = usePathname()
  const search = useSearchParams()
  const searchQuery = search ? search.get('query') : null
  const sortQuery = search ? search.get('sort') : null

  const buildSortUrl = (sortParam: string) => {
    const currentUrl = searchQuery ? `?query=${searchQuery}` : pathname
    const separator = currentUrl.includes('?') ? '&' : '?'
    return sortParam ? `${currentUrl}${separator}sort=${sortParam}` : currentUrl
  }

  const sortOptions = [
    { label: 'Relevance', param: '' },
    { label: 'Price: Low to High', param: 'price-asc' },
    { label: 'Price: High to Low', param: 'price-desc' },
  ]

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground md:mb-0">Sort by</h3>
      <div className="hidden md:block">
        {sortOptions.map((option) => (
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
      <div className="md:hidden">
        <SortDropdown sortOptions={sortOptions} />
      </div>
    </div>
  )
}
