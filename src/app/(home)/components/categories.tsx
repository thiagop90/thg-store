import db from '@/lib/prisma'
import { CategoryItem } from './category-items'

export async function Categories() {
  const categories = await db.category.findMany({})

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
