'use client'

import { ChevronDownIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { DynamicTag } from './dynamic-tag'
import { Category } from '@prisma/client'
import { Skeleton } from '@/components/ui/skeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import type { CategorySlug } from '@/@types/category'

type FilterItemDropdownProps = {
  categories: Category[]
}

export function CategoriesDropdown({ categories }: FilterItemDropdownProps) {
  const t = useTranslations('Categories')
  const pathname = usePathname()
  const [openSelect, setOpenSelect] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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

  const translatedActive = useMemo(() => {
    const currentCategory = categories.find(
      (category) => `/search/${category.slug}` === pathname,
    )

    return currentCategory ? t(currentCategory.slug as CategorySlug) : t('all')
  }, [pathname, categories, t])

  const handleSelectToggle = () => {
    setOpenSelect(!openSelect)
  }

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={handleSelectToggle}
        className="flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border bg-card px-4 py-2 text-sm"
      >
        {!translatedActive ? (
          <Skeleton className="h-5 w-16" />
        ) : (
          <>{translatedActive}</>
        )}
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
            <DynamicTag href="/search">{t('all')}</DynamicTag>
            {categories.map((category) => (
              <DynamicTag href={`/search/${category.slug}`} key={category.id}>
                {t(category.slug as CategorySlug)}
              </DynamicTag>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
