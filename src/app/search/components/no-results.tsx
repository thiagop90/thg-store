import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function NoResults({ searchQuery }: { searchQuery: string | null }) {
  const t = useTranslations('SearchPage')

  return (
    <div className="-mb-[2px] flex min-h-[calc(100dvh-18.5rem)] flex-1 flex-col items-center justify-center">
      <p className="mb-4 text-center">
        {t('thereAreNoProductsThatMatch')}{' '}
        <span className="font-bold">&quot;{searchQuery}&quot;</span>
      </p>
      <Link
        href="/search"
        className={cn(
          buttonVariants({ size: 'sm', variant: 'outline' }),
          'flex items-center gap-2',
        )}
        aria-label={t('back')}
      >
        <ArrowLeft className="size-4" />
        {t('back')}
      </Link>
    </div>
  )
}
