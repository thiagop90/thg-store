import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export function SectionTitle({
  className,
  children,
  ...props
}: ComponentProps<'p'>) {
  return (
    <h2 className={cn('text-xl font-semibold uppercase', className)} {...props}>
      {children}
    </h2>
  )
}
