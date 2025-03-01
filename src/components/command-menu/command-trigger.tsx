'use client'

import { useCommandMenu } from '@/store/command-menu'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function CommandTrigger() {
  const t = useTranslations('Products')
  const { setShowCommandMenu } = useCommandMenu()

  return (
    <div className="flex flex-1 justify-end lg:w-1/3 lg:justify-center">
      <button
        className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-lg border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground sm:w-full sm:max-w-fit sm:justify-start sm:px-3 sm:py-2 sm:text-muted-foreground lg:max-w-md"
        onClick={() => setShowCommandMenu(true)}
      >
        <SearchIcon className="h-5 w-5" />
        <span className="hidden sm:block">{t('searchProducts')}</span>
        <span className="hidden rounded-md border bg-background px-1.5 text-[10px] sm:flex lg:ml-auto">
          CTRL + K
        </span>
      </button>
    </div>
  )
}
