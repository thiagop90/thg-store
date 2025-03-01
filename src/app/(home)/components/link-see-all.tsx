import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link, { LinkProps } from 'next/link'

export async function LinkSeeAll(props: LinkProps) {
  const t = await getTranslations('HomePage')
  const { href, ...restProps } = props

  return (
    <Link
      className="inline-flex items-center text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none"
      href={href}
      {...restProps}
    >
      {t('seeAll')} <ArrowRight className="ml-1.5 h-4 w-4" />
    </Link>
  )
}
