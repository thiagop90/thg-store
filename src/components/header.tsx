import { Cart } from './cart/cart'
import { PopoverMenu } from './menu/popover-menu'
import { Hydrate } from './hydrate'
import { NavHeader } from './nav-header'
import { CommandMenuDialog } from './command-menu/command-menu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/75 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <PopoverMenu />
        </div>
        <NavHeader />
        <CommandMenuDialog />
        <div className="flex justify-end gap-3 xl:w-1/3">
          <div className="hidden flex-none md:block">
            <PopoverMenu />
          </div>
          <Hydrate>
            <Cart />
          </Hydrate>
        </div>
      </div>
    </header>
  )
}
