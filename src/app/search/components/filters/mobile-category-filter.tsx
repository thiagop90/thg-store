'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Category } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import type { CategorySlug } from '@/@types/category'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Check, ChevronUp } from 'lucide-react'

type MobileCategoryFilterProps = {
  categories: Category[]
}

export function MobileCategoryFilter({
  categories,
}: MobileCategoryFilterProps) {
  const t = useTranslations('Categories')
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const currentCategory = categories.find((category) =>
    pathname.includes(category.slug),
  )
  const selectedValue = currentCategory ? currentCategory.slug : 'all'
  const selectedLabel = t(selectedValue as CategorySlug)

  function handleChange(newValue: string) {
    router.push(newValue === 'all' ? '/search' : `/search/${newValue}`)
    setOpen(false)
  }

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground">{t('categories')}</h3>
      <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between rounded-lg bg-popover text-left font-normal hover:bg-popover"
          >
            <span>{selectedLabel}</span>
            <ChevronUp className="h-4 w-4 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent
          classNameOverlay="bg-transparent"
          className="mx-auto w-auto max-w-[440px]"
        >
          <DrawerHeader>
            <DrawerTitle>{t('categories')}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <div className="space-y-1">
              <DrawerClose asChild>
                <Button
                  variant={selectedValue === 'all' ? 'secondary' : 'ghost'}
                  className="w-full justify-between"
                  onClick={() => handleChange('all')}
                >
                  {t('all')}
                  {selectedValue === 'all' && <Check className="h-4 w-4" />}
                </Button>
              </DrawerClose>
              {categories.map((category) => (
                <DrawerClose key={category.id} asChild>
                  <Button
                    variant={
                      selectedValue === category.slug ? 'secondary' : 'ghost'
                    }
                    className="w-full justify-between"
                    onClick={() => handleChange(category.slug)}
                  >
                    {t(category.slug as CategorySlug)}
                    {selectedValue === category.slug && (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                </DrawerClose>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
