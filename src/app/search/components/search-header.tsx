import { useTranslations } from 'next-intl'

export function SearchHeader({
  searchQuery,
  totalResults,
  totalProducts,
}: {
  searchQuery: string | null
  totalResults: number
  totalProducts: number
}) {
  const t = useTranslations('SearchPage')

  if (searchQuery) {
    return (
      <p className="mb-6 text-center lg:text-left">
        {t('showing')} {totalResults} {t('resultsTo')}{' '}
        <span className="font-bold">&quot;{searchQuery}&quot;</span>
      </p>
    )
  }

  return (
    <div className="flex flex-col text-center font-medium lg:text-left">
      <span className="mb-0.5 text-2xl">{t('allProducts')}</span>
      <span className="text-sm lowercase text-muted-foreground">
        {totalProducts} {t('items')}
      </span>
    </div>
  )
}
