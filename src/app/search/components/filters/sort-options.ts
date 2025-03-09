import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react'

export type SortOptionKeys = 'relevance' | 'lowToHigh' | 'highToLow'

export const sortOptions = (t: (key: SortOptionKeys) => string) => [
  { label: t('relevance'), param: '', icon: ArrowUpDown },
  { label: t('lowToHigh'), param: 'price-asc', icon: ArrowDown },
  { label: t('highToLow'), param: 'price-desc', icon: ArrowUp },
]
