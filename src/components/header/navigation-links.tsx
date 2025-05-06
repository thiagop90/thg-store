'use client'

import Link from 'next/link'
import { Computer } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function NavigationLinks() {
  const t = useTranslations('Categories')
  const pathname = usePathname()

  const links = [
    { href: '/search', label: t('all') },
    { href: '/search/mouses', label: t('mouses') },
    { href: '/search/keyboards', label: t('keyboards') },
  ]

  return (
    <div className="md:flex md:w-1/3">
      <Link
        href="/"
        className="w-fulL flex items-center justify-center md:mr-3 md:w-auto lg:mr-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-card px-3">
          <Computer strokeWidth={1.5} className="h-5 w-5 flex-none" />
        </div>
        <span
          translate="no"
          className="ml-3 flex-none font-semibold uppercase md:hidden lg:block"
        >
          THG Store
        </span>
      </Link>
      <ul className="hidden gap-4 font-medium sm:gap-6 md:flex md:items-center">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={cn(
                'underline-offset-4',
                pathname === link.href
                  ? 'pointer-events-none text-foreground underline'
                  : 'text-muted-foreground hover:text-foreground hover:underline',
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
