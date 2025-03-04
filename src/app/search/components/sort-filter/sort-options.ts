export type SortOptionKeys = 'relevance' | 'lowToHigh' | 'highToLow'

export const sortOptions = (t: (key: SortOptionKeys) => string) => [
  { label: t('relevance'), param: '' },
  { label: t('lowToHigh'), param: 'price-asc' },
  { label: t('highToLow'), param: 'price-desc' },
]
