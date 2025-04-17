'use client'

import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type FilterItemProps = LinkProps & {
  children: ReactNode
}

export function DynamicTag({ href, children }: FilterItemProps) {
  const pathname = usePathname()
  const active = pathname === href
  const DynamicTag = active ? 'div' : Link

  return (
    <DynamicTag
      className={cn(
        'group w-full truncate rounded-lg px-3 py-2 text-sm hover:bg-secondary',
        {
          'pointer-events-none bg-neutral-700/50': active,
        },
      )}
      href={href}
    >
      {children}
    </DynamicTag>
  )
}
