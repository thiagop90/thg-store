'use client'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useEffect, useState } from 'react'
import { StatusAuthenticated } from './status-authenticated'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import { useNavigation } from '@/lib/hooks/use-navigation'

export function AccountMenu() {
  const [open, setOpen] = useState(false)
  const {
    pendingPath,
    setPendingPath,
    optimisticState,
    handleNavigate,
    pathname,
  } = useNavigation()

  useEffect(() => {
    if (open && pendingPath) {
      setOpen(true)

      if (pendingPath && pathname === pendingPath) {
        setOpen(false)
        setPendingPath(null)
      }
    }
  }, [open, pendingPath, pathname, setPendingPath])

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        if (!pendingPath) {
          setOpen(open)
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline">
          <User className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={12}
        className="mr-2 w-[310px] rounded-2xl p-2"
      >
        <StatusAuthenticated
          pendingPath={pendingPath}
          optimisticState={optimisticState}
          handleNavigate={handleNavigate}
        />
      </PopoverContent>
    </Popover>
  )
}
