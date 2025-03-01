'use client'

import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  const t = useTranslations('ProductPage')

  return (
    <button
      className="absolute left-4 top-4 z-10 flex h-8 items-center gap-1.5 rounded-lg border bg-background px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{t('back')}</span>
    </button>
  )
}
