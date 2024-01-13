'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

type SortDropdownProps = {
  sortOptions: { label: string; param: string }[]
}

export function SortDropdown({ sortOptions }: SortDropdownProps) {
  const [openSelect, setOpenSelect] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const search = useSearchParams()
  const searchQuery = search ? search.get('query') : null
  const sortQuery = search ? search.get('sort') : null

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const buildSortUrl = (sortParam: string) => {
    const currentUrl = searchQuery ? `?query=${searchQuery}` : pathname
    const separator = currentUrl.includes('?') ? '&' : '?'
    return sortParam ? `${currentUrl}${separator}sort=${sortParam}` : currentUrl
  }

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => {
          setOpenSelect(!openSelect)
        }}
        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border bg-card px-4 py-2 text-sm"
      >
        {!sortQuery
          ? 'Relevance'
          : sortOptions.find((option) => option.param === sortQuery)?.label}
        <ChevronDownIcon
          className={cn('h-4 w-4 transition-transform', {
            'rotate-180 transition-transform duration-200': openSelect,
          })}
        />
      </div>
      <AnimatePresence>
        {openSelect && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onClick={() => {
              setOpenSelect(false)
            }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-lg border bg-card p-4"
          >
            {sortOptions.map((option) => (
              <li className="mt-2 shrink-0" key={option.param}>
                <Link
                  className={cn(
                    'w-full hover:underline hover:underline-offset-4',
                    {
                      'underline underline-offset-4':
                        sortQuery === option.param ||
                        (!sortQuery && option.param === ''),
                    },
                  )}
                  href={buildSortUrl(option.param)}
                >
                  {option.label}
                </Link>
              </li>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
