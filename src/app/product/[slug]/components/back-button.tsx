'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  const t = useTranslations('ProductPage')

  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute left-4 top-4 z-10"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{t('back')}</span>
    </Button>
  )
}
