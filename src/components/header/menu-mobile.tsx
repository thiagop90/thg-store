'use client'

import { StatusAuthenticated } from './status-authenticated'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Icons } from '../icons'
import { useNavigation } from '@/lib/hooks/use-navigation'

export function MenuMobile() {
  const [drawer, setDrawer] = useState({
    open: false,
    dismissible: false,
  })
  const t = useTranslations()
  const {
    pendingPath,
    setPendingPath,
    optimisticState,
    handleNavigate,
    pathname,
  } = useNavigation()

  useEffect(() => {
    if (drawer.open && pendingPath) {
      setDrawer({ open: true, dismissible: true })

      if (pendingPath && pathname === pendingPath) {
        setDrawer({ open: false, dismissible: false })
        setPendingPath(null)
      }
    }
  }, [drawer.open, pendingPath, pathname, setPendingPath])

  const links = [
    {
      href: '/',
      label: t('HomePage.home'),
      icon: <Icons.home />,
    },
    {
      href: '/search',
      label: t('Categories.all'),
      icon: <Icons.layoutGrid />,
    },
    {
      href: '/search/mouses',
      label: t('Categories.mouses'),
      icon: <Icons.mouses />,
    },
    {
      href: '/search/keyboards',
      label: t('Categories.keyboards'),
      icon: <Icons.keyboards />,
    },
  ]

  return (
    <Drawer
      direction="left"
      dismissible={!drawer.dismissible}
      open={drawer.open}
      onOpenChange={(open) => {
        if (!pendingPath) {
          setDrawer({ ...drawer, open })
        }
      }}
    >
      <DrawerTrigger asChild>
        <Button className="relative flex" size="icon" variant="outline">
          <span
            className={cn(
              'absolute left-1/2 top-[calc(50%-6px)] h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground transition-all duration-200 md:hidden',
              { 'top-1/2 rotate-45': drawer.open },
            )}
          />
          <span
            className={cn(
              'absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground transition duration-200 md:hidden',
              { 'bg-transparent': drawer.open },
            )}
          />
          <span
            className={cn(
              'absolute left-1/2 top-[calc(50%+6px)] h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground transition-all duration-200 md:hidden',
              { 'top-1/2 -rotate-45': drawer.open },
            )}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="top-16 h-fit w-[310px]">
        <div className="p-2">
          <StatusAuthenticated
            pendingPath={pendingPath}
            optimisticState={optimisticState}
            handleNavigate={handleNavigate}
          />

          <nav>
            <div className="my-2 border-t" />

            {links.map((link, index) => (
              <Link
                key={index}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'h-14 w-full justify-start gap-4 p-4 text-muted-foreground hover:bg-background',
                  optimisticState.pathname === link.href &&
                    'pointer-events-none bg-background text-foreground',
                  pendingPath && 'pointer-events-none opacity-50',
                )}
                onClick={() => handleNavigate(link.href)}
                href={link.href}
              >
                <span>
                  {pendingPath === link.href ? (
                    <Icons.spinner className="size-5" />
                  ) : (
                    link.icon
                  )}
                </span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
