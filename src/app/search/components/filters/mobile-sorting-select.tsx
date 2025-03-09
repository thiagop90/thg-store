'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { sortOptions } from './sort-options'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function MobileSortingSelect() {
  const t = useTranslations('SortBy')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const sortQuery = searchParams.get('sort') || 'relevance'

  const currentOption = sortOptions(t).find(
    (option) => option.param === sortQuery,
  )
  const selectedValue = currentOption ? currentOption.label : t('relevance')

  function handleSelectChange(selectedLabel: string) {
    const selectedOption = sortOptions(t).find(
      (option) => option.label === selectedLabel,
    )
    if (!selectedOption) return

    const params = new URLSearchParams(searchParams)
    params.set('sort', selectedOption.param)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-1 flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground">{t('sortBy')}</h3>

      <Select value={selectedValue} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full rounded-lg bg-popover">
          <SelectValue aria-label={selectedValue}>{selectedValue}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('sortBy')}</SelectLabel>
            {sortOptions(t).map((option) => (
              <SelectItem key={option.param} value={option.label}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
