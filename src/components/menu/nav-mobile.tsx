import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Keyboard, LayoutGrid, Mouse } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { DrawerClose } from '../ui/drawer'

export function NavMobile() {
  const t = useTranslations()
  const pathname = usePathname()

  const className = 'h-5 w-5'
  const strokeWidth = '1.75'

  const links = [
    {
      href: '/',
      label: t('HomePage.home'),
      icon: <Home className={className} strokeWidth={strokeWidth} />,
    },
    {
      href: '/search',
      label: t('Categories.all'),
      icon: <LayoutGrid className={className} strokeWidth={strokeWidth} />,
    },
    {
      href: '/search/mouses',
      label: t('Categories.mouses'),
      icon: <Mouse className={className} strokeWidth={strokeWidth} />,
    },
    {
      href: '/search/keyboards',
      label: t('Categories.keyboards'),
      icon: <Keyboard className={className} strokeWidth={strokeWidth} />,
    },
  ]

  return (
    <nav>
      <div className="my-2 border-t" />

      {links.map((link, index) => (
        <DrawerClose asChild key={index}>
          <Button
            className={cn(
              'h-14 w-full justify-start gap-4 p-4 text-muted-foreground hover:bg-background',
              {
                'pointer-events-none bg-background text-foreground':
                  pathname === link.href,
              },
            )}
            variant="ghost"
            asChild
          >
            <Link href={link.href}>
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </Button>
        </DrawerClose>
      ))}
    </nav>
  )
}
