import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import Image from 'next/image'
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
          'group h-full w-full rounded-lg border bg-card p-1 hover:border-primary',
          {
            'border-2 border-primary': selected && imageLoaded,
          },
        )}
        type="button"
      >
        {!imageLoaded && <Skeleton className="h-full w-full" />}
        <Image
          src={imgSrc}
          alt={imgSrc}
          width={80}
          height={80}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          onLoad={handleImageLoad}
        />
      </button>
    </li>
  )
}
