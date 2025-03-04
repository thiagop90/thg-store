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
  const DynamicTag = active ? 'p' : Link

  return (
    <li className="mt-2">
      <DynamicTag
        className={cn('w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active,
        })}
        href={href}
      >
        {children}
      </DynamicTag>
    </li>
  )
}
