import {
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
  Speaker,
  Square,
} from 'lucide-react'

interface CategoryIconsProps {
  [key: string]: JSX.Element | null
}

export function getCategoryIcon(category: string) {
  const className = 'h-4 w-4'
  const strokeWidth = '1.25'

  const categoryIcons: CategoryIconsProps = {
    mouses: <Mouse className={className} strokeWidth={strokeWidth} />,
    keyboards: <Keyboard className={className} strokeWidth={strokeWidth} />,
    headsets: <Headphones className={className} strokeWidth={strokeWidth} />,
    mousepads: <Square className={className} strokeWidth={strokeWidth} />,
    monitors: <Monitor className={className} strokeWidth={strokeWidth} />,
    speakers: <Speaker className={className} strokeWidth={strokeWidth} />,
  }

  return categoryIcons[category] || null
}
