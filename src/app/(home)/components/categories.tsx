import { prismaClient } from '@/lib/prisma'
import { CategoryItem } from './category-items'

export async function Categories() {
  const categories = await prismaClient.category.findMany({})

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
