import {
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
  Speaker,
  Square,
} from 'lucide-react'

const className = 'h-8 w-8 group-hover:animate-wiggle'
const strokeWidth = '1.25'

export const categoryIcon = {
  keyboards: <Keyboard strokeWidth={strokeWidth} className={className} />,
  monitors: <Monitor strokeWidth={strokeWidth} className={className} />,
  headsets: <Headphones strokeWidth={strokeWidth} className={className} />,
  mousepads: <Square strokeWidth={strokeWidth} className={className} />,
  speakers: <Speaker strokeWidth={strokeWidth} className={className} />,
  mices: <Mouse strokeWidth={strokeWidth} className={className} />,
}
