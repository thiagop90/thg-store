import {
  Headphones,
  Keyboard,
  LayoutGrid,
  Monitor,
  Mouse,
  Speaker,
  Square,
  type LucideIcon,
} from 'lucide-react'
import type { CategorySlug } from '@/@types/category'

export const categoryIcons: Record<CategorySlug, LucideIcon> = {
  all: LayoutGrid,
  mouses: Mouse,
  keyboards: Keyboard,
  headsets: Headphones,
  mousepads: Square,
  monitors: Monitor,
  speakers: Speaker,
}
