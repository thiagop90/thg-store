'use client'

import { Category } from '@/generated/prisma'
import { useTranslations } from 'next-intl'
import { useState, useEffect, useMemo } from 'react'
import type { CategorySlug } from '@/@types/category'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Check, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categoryIcons } from '@/helpers/category-icons'
import { Icons } from '@/components/icons'
import { useNavigation } from '@/lib/hooks/use-navigation'

type MobileCategoryFilterProps = {
  categories: Category[]
}

export function MobileCategoryFilter({
  categories,
}: MobileCategoryFilterProps) {
  const t = useTranslations('Categories')
  const [drawer, setDrawer] = useState({
    open: false,
    dismissible: false,
  })

  const {
    pendingPath,
    setPendingPath,
    optimisticState,
    handleNavigate,
    pathname,
  } = useNavigation()

  const getCategoryFromPath = (path: string) => {
    if (path === '/search') return 'all'
    const lastSegment = path.split('/').pop()
    return (
      categories.find((category) => category.slug === lastSegment)?.slug ||
      'all'
    )
  }

  const selectedCategory = getCategoryFromPath(optimisticState.pathname)
  const selectedLabel = t(selectedCategory as CategorySlug)

  const categoryOptions = useMemo(
    () => [{ slug: 'all', id: 'all' }, ...categories],
    [categories],
  )

  useEffect(() => {
    if (drawer.open && pendingPath) {
      setDrawer({ open: true, dismissible: true })

      if (pendingPath && pathname === pendingPath) {
        setDrawer({ open: false, dismissible: false })
        setPendingPath(null)
      }
    }
  }, [drawer.open, pendingPath, pathname, setPendingPath])

  function handleChange(slug: string) {
    const newPath = slug === 'all' ? '/search' : `/search/${slug}`
    if (pathname === newPath) {
      setDrawer((prev) => ({ ...prev, open: false }))
      return
    }
    handleNavigate(newPath)
  }

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground">{t('categories')}</h3>
      <Drawer
        dismissible={!drawer.dismissible}
        direction="bottom"
        open={drawer.open}
        onOpenChange={(open) => {
          if (!pendingPath) {
            setDrawer({ ...drawer, open })
          }
        }}
      >
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between rounded-lg bg-popover text-left font-normal hover:bg-popover"
          >
            <span>{selectedLabel}</span>
            <ChevronUp className="h-4 w-4 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mx-auto w-auto max-w-[440px]">
          <DrawerHeader>
            <DrawerTitle className="text-center">{t('categories')}</DrawerTitle>
          </DrawerHeader>
          <div className="space-y-1 px-4 pb-6">
            {categoryOptions.map((category) => {
              const isSelected = selectedCategory === category.slug
              const Icon = categoryIcons[category.slug as CategorySlug]
              const isPending =
                pendingPath ===
                `/search${category.slug === 'all' ? '' : '/' + category.slug}`

              return (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={cn(
                    'w-full justify-between',
                    isSelected
                      ? 'pointer-events-none bg-background text-foreground'
                      : 'text-muted-foreground hover:bg-background',
                  )}
                  onClick={() => handleChange(category.slug)}
                  disabled={!!pendingPath}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" strokeWidth="1.75" />
                    {t(category.slug as CategorySlug)}
                  </div>
                  {isSelected &&
                    (isPending ? (
                      <Icons.spinner />
                    ) : (
                      <Check className="h-4 w-4" />
                    ))}
                </Button>
              )
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
