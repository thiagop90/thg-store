import {
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
  Speaker,
  Square,
  type LucideIcon,
} from 'lucide-react'
import type { CategorySlug } from '@/@types/category'

export const categoryIcons: Record<CategorySlug, LucideIcon> = {
  mouses: Mouse,
  keyboards: Keyboard,
  headsets: Headphones,
  mousepads: Square,
  monitors: Monitor,
  speakers: Speaker,
}
