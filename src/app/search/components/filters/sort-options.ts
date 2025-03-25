import { ArrowUpDown, ArrowDown, ArrowUp, type LucideIcon } from 'lucide-react'

export type SortOptionKeys = 'relevance' | 'lowToHigh' | 'highToLow'

export type SortOption = {
  label: string
  param: string
  icon: LucideIcon
}

export const sortOptions = (
  t: (key: SortOptionKeys) => string,
): SortOption[] => [
  { label: t('relevance'), param: '', icon: ArrowUpDown },
  { label: t('lowToHigh'), param: 'price-asc', icon: ArrowDown },
  { label: t('highToLow'), param: 'price-desc', icon: ArrowUp },
]
