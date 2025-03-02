'use client'

import { Cart } from './cart/cart'
import { PopoverMenu } from './menu/popover-menu'
import { Hydrate } from './hydrate'
import { NavHeader } from './nav-header'
import { CommandMenuDialog } from './command-menu/command-menu'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { setUserLocale } from '@/i18n/locale'
import { useLocale } from 'next-intl'

export function Header() {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  function toggleLocale() {
    const newLocale = locale === 'pt' ? 'en' : 'pt'
    startTransition(() => {
      setUserLocale(newLocale)
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/75 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <PopoverMenu />
        </div>
        <NavHeader />
        <CommandMenuDialog />
        <div className="flex justify-end gap-3 xl:w-1/3">
          <div className="hidden flex-none md:block">
            <PopoverMenu />
          </div>
          <Hydrate>
            <Cart />
          </Hydrate>
          <Button
            size="icon"
            variant="outline"
            onClick={toggleLocale}
            disabled={isPending}
          >
            {locale === 'pt' ? 'PT' : 'EN'}
          </Button>
        </div>
      </div>
    </header>
  )
}
