'use client'

import { StatusAuthenticated } from './status-authenticated'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import { NavMobile } from './nav-mobile'
import { Button } from '../ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export function MenuMobile() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [open, setOpen] = useState(false)

  const ToggleButton = (
    <Button className="relative flex" size="icon" variant="outline">
      <span
        className={cn(
          'absolute left-1/2 top-[calc(50%-6px)] h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground transition-all duration-200 md:hidden',
          { 'top-1/2 rotate-45': open },
        )}
      />
      <span
        className={cn(
          'absolute left-1/2 top-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground transition duration-200 md:hidden',
          { 'bg-transparent': open },
        )}
      />
      <span
        className={cn(
          'absolute left-1/2 top-[calc(50%+6px)] h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground transition-all duration-200 md:hidden',
          { 'top-1/2 -rotate-45': open },
        )}
      />
      <User className="hidden h-5 w-5 md:block" />
    </Button>
  )

  if (isMobile) {
    return (
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{ToggleButton}</DrawerTrigger>
        <DrawerContent className="top-16 h-fit w-[310px]">
          <div className="p-2">
            <StatusAuthenticated onClose={() => setOpen(false)} />
            <NavMobile />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{ToggleButton}</PopoverTrigger>
      <PopoverContent
        sideOffset={12}
        className="mr-2 w-[310px] rounded-2xl p-2"
      >
        <StatusAuthenticated onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}
