import { MobileCategoryFilter } from './filters/mobile-category-filter'
import { MobileSortingFilter } from './filters/mobile-sorting-filter'
import db from '@/lib/prisma'

export async function NavbarMobile() {
  const categories = await db.category.findMany({})

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 h-24 w-full bg-popover to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] lg:hidden"></div>

      <div className="fixed inset-x-2 bottom-2 z-50 mx-auto flex w-auto max-w-[440px] items-end gap-4 rounded-2xl border bg-background/90 p-4 backdrop-blur-lg duration-300 animate-in slide-in-from-bottom [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] lg:hidden">
        <MobileCategoryFilter categories={categories} />
        <MobileSortingFilter />
      </div>
    </>
  )
}
