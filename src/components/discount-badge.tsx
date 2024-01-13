import { cn } from '@/lib/utils'
import { Badge, BadgeProps } from './ui/badge'
import { ArrowDown } from 'lucide-react'

export function DiscountBadge({ children, className, ...props }: BadgeProps) {
  return (
    <Badge className={cn('gap-0.5 rounded-sm px-1 ', className)} {...props}>
      <ArrowDown strokeWidth={2.25} className="h-4 w-4" />
      {children}%
    </Badge>
  )
}
