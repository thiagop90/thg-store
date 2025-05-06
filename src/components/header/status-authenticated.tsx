'use client'

import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogInIcon, LogOut, PackageSearch, User } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import { useTranslations } from 'next-intl'
import { Icons } from '../icons'

interface StatusAuthenticatedProps {
  pendingPath: string | null
  optimisticState: {
    pathname: string
    sort: string
  }
  handleNavigate: (href: string, redirect?: boolean) => void
}

export function StatusAuthenticated({
  pendingPath,
  optimisticState,
  handleNavigate,
}: StatusAuthenticatedProps) {
  const t = useTranslations('Profile')
  const { data } = useSession()
  const user = data?.user

  async function handleLogoutClick() {
    handleNavigate('logout', false)
    await signOut()
  }

  return (
    <div>
      {!user ? (
        <div>
          <div className="flex items-center gap-3 p-4">
            <Avatar>
              <AvatarFallback>
                <User className="size-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p>{t('hello')}!</p>
              <p className="text-sm text-muted-foreground">
                {t('signinToContinueToPlatform')}
              </p>
            </div>
          </div>

          <Link
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'h-14 w-full justify-start gap-4 p-4 text-muted-foreground hover:bg-background',
              optimisticState.pathname === '/login' &&
                'pointer-events-none bg-background text-foreground',
              pendingPath && 'pointer-events-none opacity-50',
            )}
            onClick={() => handleNavigate('/login')}
            href="/login"
          >
            <span>
              {pendingPath === '/login' ? (
                <Icons.spinner className="size-5" />
              ) : (
                <LogInIcon className="size-5" strokeWidth={1.75} />
              )}
            </span>
            {t('signIn')}
          </Link>
        </div>
      ) : (
        <div>
          <div className="flex gap-3 p-4">
            <Avatar>
              <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
              <AvatarImage src={user?.image ?? ''} />
            </Avatar>
            <div>
              <p>
                {t('hello')}, {user?.name}!
              </p>
              <p className="text-sm text-muted-foreground">
                {t('goodShopping')}
              </p>
            </div>
          </div>

          <Link
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'h-14 w-full justify-start gap-4 p-4 text-muted-foreground hover:bg-background',
              optimisticState.pathname === '/orders' &&
                'pointer-events-none bg-background text-foreground',
              pendingPath && 'pointer-events-none opacity-50',
            )}
            onClick={() => handleNavigate('/orders')}
            href="/orders"
          >
            <span>
              {pendingPath === '/orders' ? (
                <Icons.spinner className="size-5" />
              ) : (
                <PackageSearch className="size-5" strokeWidth={1.75} />
              )}
            </span>
            {t('orderHistory')}
          </Link>

          <Button
            variant="ghost"
            className="h-14 w-full justify-start gap-4 p-4 text-red-400 hover:bg-background hover:text-red-400"
            onClick={handleLogoutClick}
            disabled={!!pendingPath}
          >
            {pendingPath === 'logout' ? (
              <Icons.spinner className="size-5 text-red-400" />
            ) : (
              <LogOut className="size-5" strokeWidth={1.75} />
            )}
            {t('logoutOfAccount')}
          </Button>
        </div>
      )}
    </div>
  )
}
