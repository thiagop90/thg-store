'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Category } from '@prisma/client'
import { useTranslations } from 'next-intl'
import type { CategorySlug } from '@/@types/category'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FilterItemDropdownProps = {
  categories: Category[]
}

export function SelectCategory({ categories }: FilterItemDropdownProps) {
  const t = useTranslations('Categories')
  const router = useRouter()
  const pathname = usePathname()

  const currentCategory = categories.find((category) =>
    pathname.includes(category.slug),
  )
  const selectedValue = currentCategory ? currentCategory.slug : 'all'

  function handleChange(newValue: string) {
    router.push(newValue === 'all' ? '/search' : `/search/${newValue}`)
  }

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-full rounded-lg bg-popover">
        <SelectValue aria-label={selectedValue}>
          {t(selectedValue as CategorySlug)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('categories')}</SelectLabel>
          <SelectItem value="all">{t('all')}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              {t(category.slug as CategorySlug)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
