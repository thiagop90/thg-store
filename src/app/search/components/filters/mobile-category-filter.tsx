'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Category } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useState, useEffect, useOptimistic, startTransition } from 'react'
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

type MobileCategoryFilterProps = {
  categories: Category[]
}

export function MobileCategoryFilter({
  categories,
}: MobileCategoryFilterProps) {
  const t = useTranslations('Categories')
  const router = useRouter()
  const pathname = usePathname()

  const [drawer, setDrawer] = useState({
    open: false,
    dismissible: false,
  })

  const getCurrentCategory = () => {
    if (pathname === '/search') return 'all'

    const lastSegment = pathname.split('/').pop()
    const matchedCategory = categories.find(
      (category) => category.slug === lastSegment,
    )

    return matchedCategory ? matchedCategory.slug : 'all'
  }

  const [optimisticCategory, setOptimisticCategory] = useOptimistic(
    { slug: getCurrentCategory() },
    (_, newCategory: { slug: string }) => newCategory,
  )

  const selectedValue = optimisticCategory.slug
  const selectedLabel = t(selectedValue as CategorySlug)

  useEffect(() => {
    if (!drawer.open) return

    const currentCategory = getCurrentCategory()

    if (selectedValue === currentCategory) {
      setDrawer({ open: false, dismissible: false })
    }
  }, [pathname, selectedValue])

  function handleChange(newValue: string) {
    const newPath = newValue === 'all' ? '/search' : `/search/${newValue}`

    if (pathname === newPath) {
      setDrawer((prev) => ({ ...prev, open: false }))
      return
    }

    startTransition(() => setOptimisticCategory({ slug: newValue }))

    setDrawer({ open: true, dismissible: true })
    router.push(newPath)
  }

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground">{t('categories')}</h3>
      <Drawer
        dismissible={!drawer.dismissible}
        direction="bottom"
        open={drawer.open}
        onOpenChange={(open) => {
          if (drawer.dismissible && !open) return
          setDrawer({ ...drawer, open })
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
            {[{ slug: 'all', id: 'all' }, ...categories].map((category) => {
              const isSelected = selectedValue === category.slug
              const Icon = categoryIcons[category.slug as CategorySlug]

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
                  disabled={drawer.dismissible}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" strokeWidth="1.75" />
                    {t(category.slug as CategorySlug)}
                  </div>
                  {isSelected &&
                    (drawer.dismissible ? (
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
