import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PopoverClose } from '@radix-ui/react-popover'
import { Home, Keyboard, LayoutGrid, Mouse } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export function NavMobile() {
  const pathname = usePathname()

  const className = 'h-5 w-5'
  const strokeWidth = '1.75'

  const links = [
    {
      href: '/',
      label: 'Home',
      icon: <Home className={className} strokeWidth={strokeWidth} />,
    },
    {
      href: '/search',
      label: 'All',
      icon: <LayoutGrid className={className} strokeWidth={strokeWidth} />,
    },
    {
      href: '/search/mouses',
      label: 'Mouses',
      icon: <Mouse className={className} strokeWidth={strokeWidth} />,
    },
    {
      href: '/search/keyboards',
      label: 'Keyboards',
      icon: <Keyboard className={className} strokeWidth={strokeWidth} />,
    },
  ]

  return (
    <nav className="md:hidden">
      <div className="my-2 border-t" />

      {links.map((link, index) => (
        <PopoverClose asChild key={index}>
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
        </PopoverClose>
      ))}
    </nav>
  )
}
