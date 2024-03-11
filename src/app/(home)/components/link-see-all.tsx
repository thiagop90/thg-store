import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link, { LinkProps } from 'next/link'

export function LinkSeeAll(props: LinkProps) {
  const { href, ...restProps } = props

  return (
    <Button
      asChild
      variant="outline"
      className="h-9 text-primary hover:text-primary"
    >
      <Link href={href} {...restProps}>
        See all <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </Button>
  )
}
