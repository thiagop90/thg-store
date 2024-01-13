import { ArrowRight } from 'lucide-react'
import Link, { LinkProps } from 'next/link'

export function LinkSeeAll(props: LinkProps) {
  const { href, ...restProps } = props

  return (
    <Link
      href={href}
      className="flex items-center gap-1 font-medium text-primary hover:underline"
      {...restProps}
    >
      See all <ArrowRight className="h-4 w-4" />
    </Link>
  )
}
