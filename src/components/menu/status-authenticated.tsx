import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, PackageSearch, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PopoverClose } from '@radix-ui/react-popover'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'
import { useState } from 'react'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { Icons } from '../icons'
import { DrawerClose } from '../ui/Drawer'

export function StatusAuthenticated() {
  const t = useTranslations('Profile')
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const { status, data } = useSession()

  async function handleLoginClick(provider: BuiltInProviderType) {
    setIsLoading(true)
    await signIn(provider)
  }

  async function handleLogoutClick() {
    setIsLoading(true)
    await signOut()
  }

  return (
    <>
      {status === 'unauthenticated' && (
        <div>
          <div className="flex items-center gap-3 p-4">
            <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{t('hello')}!</p>
              <p className="text-sm text-muted-foreground">
                {t('signinToContinueToPlatform')}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="h-14 w-full gap-2 p-4"
              onClick={() => handleLoginClick('google')}
              disabled={isLoading}
            >
              {isLoading ? <Icons.spinner /> : <Icons.google />}
              {t('continueWith')} Google
            </Button>

            <Button
              variant="outline"
              className="h-14 w-full gap-2 p-4"
              onClick={() => handleLoginClick('github')}
              disabled={isLoading}
            >
              {isLoading ? <Icons.spinner /> : <Icons.gitHub />}
              {t('continueWith')} GitHub
            </Button>
          </div>
        </div>
      )}

      {status === 'loading' && (
        <div className="flex items-center gap-3 p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
      )}

      {status === 'authenticated' && (
        <div>
          <div className="flex gap-3 p-4">
            <Avatar>
              <AvatarFallback>
                {data.user?.name?.[0].toUpperCase()}
              </AvatarFallback>
              <AvatarImage src={data?.user?.image ?? ''} />
            </Avatar>
            <div>
              <p>
                {t('hello')}, {data.user?.name}!
              </p>
              <p className="text-sm text-muted-foreground">
                {t('goodShopping')}
              </p>
            </div>
          </div>

          <DrawerClose asChild>
            <Button
              className={cn(
                'h-14 w-full justify-start gap-4 p-4 text-muted-foreground hover:bg-background',
                {
                  'pointer-events-none bg-background text-foreground':
                    pathname === '/orders',
                },
              )}
              variant="ghost"
              asChild
            >
              <Link href="/orders">
                <PackageSearch className="h-5 w-5" strokeWidth={1.75} />
                {t('orderHistory')}
              </Link>
            </Button>
          </DrawerClose>
          <Button
            variant="ghost"
            className="h-14 w-full justify-start gap-4 p-4 text-red-400 hover:bg-background hover:text-red-400"
            onClick={handleLogoutClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner />
            ) : (
              <LogOut className="h-5 w-5" strokeWidth={1.75} />
            )}
            {t('logoutOfAccount')}
          </Button>
        </div>
      )}
    </>
  )
}
