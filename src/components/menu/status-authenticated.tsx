import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Loader, LogOut, PackageSearch, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PopoverClose } from '@radix-ui/react-popover'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'
import { useState } from 'react'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { Button } from '../ui/button'

export function StatusAuthenticated() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  const { status, data } = useSession()

  async function handleLoginClick(provider: BuiltInProviderType) {
    try {
      setIsLoading(true)
      await signIn(provider)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoutClick = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } finally {
      setIsLoading(false)
    }
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
              <p>Hello!</p>
              <p className="text-sm text-muted-foreground">
                Sign in to continue to platform.
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
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Image
                  src="/google-logo.svg"
                  alt="Google Logo"
                  width={16}
                  height={16}
                  priority
                />
              )}
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="h-14 w-full gap-2 p-4"
              onClick={() => handleLoginClick('github')}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Image
                  src="/github-logo.svg"
                  alt="GitHub Logo"
                  width={16}
                  height={16}
                  priority
                />
              )}
              Continue with GitHub
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
              <p>Hello, {data.user?.name}!</p>
              <p className="text-sm text-muted-foreground">Good shopping.</p>
            </div>
          </div>

          <PopoverClose asChild>
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
                Order history
              </Link>
            </Button>
          </PopoverClose>
          <Button
            variant="ghost"
            className="h-14 w-full justify-start gap-4 p-4 text-red-400 hover:bg-background hover:text-red-400"
            onClick={handleLogoutClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5" strokeWidth={1.75} />
            )}
            Log out of account
          </Button>
        </div>
      )}
    </>
  )
}
