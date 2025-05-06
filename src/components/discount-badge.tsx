import { cn } from '@/lib/utils'
import { Badge, BadgeProps } from './ui/badge'

export function DiscountBadge({ children, className, ...props }: BadgeProps) {
  return (
    <Badge className={cn('rounded px-1 py-0', className)} {...props}>
      -{children}%
    </Badge>
  )
}
