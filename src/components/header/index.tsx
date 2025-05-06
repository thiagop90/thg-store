import { Cart } from '../cart'
import { MenuMobile } from './menu-mobile'
import { NavigationLinks } from './navigation-links'
import { LocaleSwitcher } from './locale-switcher'
import { SearchCommandMenu } from './search-command-menu'
import { AccountMenu } from './account-menu'
import { getSession } from '@/actions/auth'

export async function Header() {
  const session = await getSession()
  const userId = session?.user?.id

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <div className="block flex-none md:hidden">
          <MenuMobile />
        </div>

        <NavigationLinks />

        <div className="flex flex-1 justify-end lg:w-1/3 lg:justify-center">
          <SearchCommandMenu />
        </div>

        <div className="flex justify-end gap-3 xl:w-1/3">
          <LocaleSwitcher />

          <div className="hidden flex-none md:block">
            <AccountMenu />
          </div>

          <Cart userId={userId} />
        </div>
      </div>
    </header>
  )
}
