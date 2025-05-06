'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect, useMemo } from 'react'
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
import { useNavigation } from '@/lib/hooks/use-navigation'
import { useSearchParams } from 'next/navigation'

export function MobileSortingFilter() {
  const t = useTranslations('SortBy')
  const searchParams = useSearchParams()

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

  const currentSort = searchParams.get('sort') || ''
  const optimisticSort = optimisticState.sort || ''

  const options = useMemo(() => sortOptions(t), [t])
  const selectedOption = options.find(
    (option) => option.param === optimisticSort,
  )

  const selectedLabel = selectedOption ? selectedOption.label : t('relevance')

  useEffect(() => {
    if (drawer.open && pendingPath) {
      setDrawer({ open: true, dismissible: true })

      if (pendingPath && currentSort === optimisticSort) {
        setDrawer({ open: false, dismissible: false })
        setPendingPath(null)
      }
    }
  }, [drawer.open, pendingPath, optimisticSort, currentSort, setPendingPath])

  function handleChange(sortParam: string) {
    const queryString = sortParam ? `?sort=${sortParam}` : ''
    const newPath = `${pathname}${queryString}`
    handleNavigate(newPath)
  }

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground">{t('sortBy')}</h3>
      <Drawer
        direction="bottom"
        open={drawer.open}
        dismissible={!drawer.dismissible}
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
            <DrawerTitle className="text-center">{t('sortBy')}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <div className="space-y-1">
              {options.map((option) => {
                const isSelected = optimisticSort === option.param
                const Icon = option.icon
                const isPending =
                  pendingPath ===
                  `${pathname}${option.param ? `?sort=${option.param}` : ''}`

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
                    onClick={() => handleChange(option.param)}
                    disabled={!!pendingPath}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" strokeWidth="1.75" />
                      <span>{option.label}</span>
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
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
