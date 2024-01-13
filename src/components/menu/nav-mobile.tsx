import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PopoverClose } from '@radix-ui/react-popover'
import { Home, Keyboard, LayoutGrid, Mouse } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  {
    href: '/',
    label: 'Home',
    icon: <Home className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    href: '/search',
    label: 'All',
    icon: <LayoutGrid className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    href: '/search/mices',
    label: 'Mices',
    icon: <Mouse className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    href: '/search/keyboards',
    label: 'Keyboards',
    icon: <Keyboard className="h-5 w-5" strokeWidth={1.75} />,
  },
]
export function NavMobile() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden">
      <div className="my-2 border-t" />

      {links.map((link, index) => (
        <PopoverClose asChild key={index}>
          <Link
            className={cn(
              'flex w-full items-center gap-4 rounded-lg p-4 text-muted-foreground hover:bg-background',
              {
                'pointer-events-none bg-background text-foreground':
                  pathname === link.href,
              },
            )}
            href={link.href}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        </PopoverClose>
      ))}
    </nav>
  )
}
