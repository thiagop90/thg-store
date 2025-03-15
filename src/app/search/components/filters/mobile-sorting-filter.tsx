'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { sortOptions } from './sort-options'
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

export function MobileSortingFilter() {
  const t = useTranslations('SortBy')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const sortQuery = searchParams.get('sort') || 'relevance'

  const currentOption = sortOptions(t).find(
    (option) => option.param === sortQuery,
  )
  const selectedValue = currentOption ? currentOption.label : t('relevance')

  function handleSelectChange(selectedParam: string) {
    const params = new URLSearchParams(searchParams)
    params.set('sort', selectedParam)
    router.push(`${pathname}?${params.toString()}`)
    setOpen(false)
  }

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground">{t('sortBy')}</h3>
      <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between rounded-lg bg-popover text-left font-normal hover:bg-popover"
          >
            <span>{selectedValue}</span>
            <ChevronUp className="h-4 w-4 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent
          classNameOverlay="bg-transparent"
          className="mx-auto w-auto max-w-[440px]"
        >
          <DrawerHeader>
            <DrawerTitle>{t('sortBy')}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <div className="space-y-1">
              {sortOptions(t).map((option) => (
                <DrawerClose key={option.param} asChild>
                  <Button
                    variant={
                      option.label === selectedValue ? 'secondary' : 'ghost'
                    }
                    className="w-full justify-between"
                    onClick={() => handleSelectChange(option.param)}
                  >
                    <span>{option.label}</span>
                    {option.label === selectedValue && (
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
