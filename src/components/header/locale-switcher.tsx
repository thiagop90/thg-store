'use client'

import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { setUserLocale } from '@/i18n/locale'
import { useLocale } from 'next-intl'

export function LocaleSwitcher() {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  function toggleLocale() {
    const newLocale = locale === 'pt' ? 'en' : 'pt'
    startTransition(() => {
      setUserLocale(newLocale)
    })
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={toggleLocale}
      disabled={isPending}
    >
      {locale === 'pt' ? 'PT' : 'EN'}
    </Button>
  )
}
