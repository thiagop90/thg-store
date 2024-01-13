import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, PackageSearch, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PopoverClose } from '@radix-ui/react-popover'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'

export function StatusAuthenticated() {
  const pathname = usePathname()
  const { status, data } = useSession()

  const handleLoginClick = async () => {
    await signIn('google')
  }

  const handleLogoutClick = async () => {
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
              <p>Hello!</p>
              <p className="text-sm text-muted-foreground">
                Sign in to continue to platform.
              </p>
            </div>
          </div>

          <button
            onClick={handleLoginClick}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-background p-4 transition hover:bg-accent"
          >
            <Image
              src="/google-logo.svg"
              alt="Google Logo"
              width={20}
              height={20}
            />
            Continue with Google
          </button>
        </div>
      )}

      {status === 'loading' && (
        <div className="flex items-center gap-3 p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
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
            <Link
              href="/orders"
              className={cn(
                'flex w-full items-center gap-4 rounded-lg p-4 text-muted-foreground hover:bg-background',
                {
                  'pointer-events-none bg-background text-foreground':
                    pathname === '/orders',
                },
              )}
            >
              <PackageSearch className="h-5 w-5" strokeWidth={1.75} />
              Order history
            </Link>
          </PopoverClose>
          <button
            onClick={handleLogoutClick}
            className="flex w-full items-center gap-4 rounded-lg p-4 text-red-400 hover:bg-background"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.75} />
            Log out of account
          </button>
        </div>
      )}
    </>
  )
}
