import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, PackageSearch, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'
import { useState } from 'react'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { Icons } from '../icons'

export function StatusAuthenticated({
  setOpen,
}: {
  setOpen: (open: boolean) => void
}) {
  const t = useTranslations('Profile')
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const { status, data } = useSession()

  async function handleLoginClick(provider: string) {
    setIsLoading(true)
    await signIn(provider)
  }

  async function handleLogoutClick() {
    setIsLoading(true)
    await signOut()
    setOpen(false)
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
            {Object.values(['github', 'google']).map((provider, idx) => {
              const Icon = isLoading
                ? Icons.spinner
                : Icons[provider as keyof typeof Icons]

              return (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-14 w-full gap-2 p-4 capitalize"
                  onClick={() => handleLoginClick(provider)}
                  disabled={isLoading}
                >
                  {Icon && <Icon />}
                  {t('continueWith')} {provider}
                </Button>
              )
            })}
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

          <Button
            className={cn(
              'h-14 w-full justify-start gap-4 p-4 text-muted-foreground hover:bg-background',
              {
                'pointer-events-none bg-background text-foreground':
                  pathname === '/orders',
              },
            )}
            variant="ghost"
            onClick={() => setOpen(false)}
            asChild
          >
            <Link href="/orders">
              <PackageSearch className="h-5 w-5" strokeWidth={1.75} />
              {t('orderHistory')}
            </Link>
          </Button>
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
