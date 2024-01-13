import { prismaClient } from '@/lib/prisma'
import { DynamicTag } from './dynamic-tag'
import { CategoriesDropdown } from './categories-dropdown'

export async function CategoriesList() {
  const categories = await prismaClient.category.findMany({})

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 text-sm text-muted-foreground md:mb-0">Categories</h3>
      <div className="hidden md:block">
        <DynamicTag href="/search">All</DynamicTag>
        {categories.map((category) => (
          <DynamicTag href={`/search/${category.slug}`} key={category.id}>
            {category?.name}
          </DynamicTag>
        ))}
      </div>
      <div className="md:hidden">
        <CategoriesDropdown categories={categories} />
      </div>
    </div>
  )
}
