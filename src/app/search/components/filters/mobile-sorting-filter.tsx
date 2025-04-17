'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState, useEffect, useOptimistic, startTransition } from 'react'
import { sortOptions } from './sort-options'
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
import { Icons } from '@/components/icons'

export function MobileSortingFilter() {
  const t = useTranslations('SortBy')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [drawer, setDrawer] = useState({
    open: false,
    dismissible: false,
  })

  const sortQuery = searchParams.get('sort') || ''

  const currentOption = sortOptions(t).find(
    (option) => option.param === sortQuery,
  )

  const [optimisticSort, setOptimisticSort] = useOptimistic(currentOption)

  const selectedValue = optimisticSort ? optimisticSort.param : ''
  const selectedLabel = optimisticSort ? optimisticSort.label : t('relevance')

  useEffect(() => {
    if (!drawer.open) return

    const currentSort = searchParams.get('sort') || ''

    if (selectedValue === currentSort) {
      setDrawer({ open: false, dismissible: false })
    }
  }, [searchParams, selectedValue])

  function handleSelectChange(selectedParam: string) {
    setDrawer({ open: true, dismissible: true })

    const newOption = sortOptions(t).find(
      (option) => option.param === selectedParam,
    )

    startTransition(() => setOptimisticSort(newOption))

    const params = new URLSearchParams(searchParams)

    if (selectedParam === '') {
      params.delete('sort')
    } else {
      params.set('sort', selectedParam)
    }

    const queryString = params.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname

    router.push(url)
  }

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground">{t('sortBy')}</h3>
      <Drawer
        direction="bottom"
        open={drawer.open}
        dismissible={!drawer.dismissible}
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
            <DrawerTitle className="text-center">{t('sortBy')}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <div className="space-y-1">
              {sortOptions(t).map((option) => {
                const isSelected = selectedValue === option.param
                const Icon = option.icon

                return (
                  <Button
                    key={option.param}
                    variant="ghost"
                    className={cn(
                      'w-full justify-between',
                      isSelected
                        ? 'pointer-events-none bg-background text-foreground'
                        : 'text-muted-foreground hover:bg-background',
                    )}
                    onClick={() => handleSelectChange(option.param)}
                    disabled={drawer.dismissible}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" strokeWidth="1.75" />
                      <span>{option.label}</span>
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
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
