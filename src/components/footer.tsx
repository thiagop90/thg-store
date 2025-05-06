import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { getTranslations } from 'next-intl/server'
import { Icons } from './icons'
import { cn } from '@/lib/utils'

const socialLinks = [
  {
    href: 'https://github.com/thiagop90',
    icon: <Icons.github />,
  },
  {
    href: 'https://linkedin.com/in/psthiago',
    icon: <Icons.linkedIn />,
  },
  {
    href: 'https://x.com/thgps01',
    icon: <Icons.twitter />,
  },
]

export async function Footer() {
  const t = await getTranslations('Footer')
  return (
    <footer className="relative border-t py-6 text-sm text-muted-foreground ">
      <div className="mx-auto flex w-full flex-col items-center gap-3 px-4">
        <p translate="no">
          © {new Date().getFullYear()} THG Store, Inc. {t('allRightsReserved')}
        </p>
        <div className="flex gap-2.5">
          {socialLinks.map((socialLink, idx) => (
            <Link
              key={idx}
              className={cn(
                buttonVariants({ size: 'icon', variant: 'outline' }),
                'h-9 w-9',
              )}
              target="_blank"
              href={socialLink.href}
            >
              {socialLink.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
