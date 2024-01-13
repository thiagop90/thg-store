'use client'

import { StatusAuthenticated } from './status-authenticated'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import { NavMobile } from './nav-mobile'
import { Button } from '../ui/button'

export function PopoverMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>

      <PopoverContent className="ml-4 mt-2 overflow-hidden p-2 md:ml-0 md:mr-4">
        <StatusAuthenticated />
        <NavMobile />
      </PopoverContent>
    </Popover>
  )
}
