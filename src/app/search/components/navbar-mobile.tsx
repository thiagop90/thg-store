import { MobileCategoryFilter } from './category-filter/mobile-category-filter'
import { MobileSortingFilter } from './sort-filter/mobile-sorting-filter'
import db from '@/lib/prisma'

export async function NavbarMobile() {
  const categories = await db.category.findMany({})
  return (
    <>
      <div className="sticky bottom-2 z-50 -mx-2 flex items-end gap-4 rounded-2xl border bg-background/90 p-4 backdrop-blur-lg duration-300 animate-in slide-in-from-bottom [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] min-[480px]:mx-auto min-[480px]:max-w-[440px] lg:hidden">
        <MobileCategoryFilter categories={categories} />
        <MobileSortingFilter />
      </div>
    </>
  )
}
