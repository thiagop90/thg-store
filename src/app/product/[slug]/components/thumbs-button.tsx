import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

type PropType = {
  selected: boolean
  imgSrc: string
  onClick: () => void
}

export function ThumbsButton(props: PropType) {
  const { selected, imgSrc, onClick } = props
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <li className="h-20 w-20">
      <button
        onClick={onClick}
        className={cn(
          'h-full w-full rounded-lg border bg-card p-1 hover:border-primary',
          {
            'border-2 border-primary': selected && imageLoaded,
          },
        )}
        type="button"
      >
        {/* <Skeleton className="h-full w-full animate-none" /> */}
        {!imageLoaded && <Skeleton className="h-full w-full animate-none" />}
        <img
          src={imgSrc}
          alt={imgSrc}
          width={80}
          height={80}
          className={cn(
            'h-full w-full object-contain opacity-0 transition-opacity duration-500',
            imageLoaded && 'opacity-100',
          )}
          onLoad={handleImageLoad}
        />
      </button>
    </li>
  )
}
