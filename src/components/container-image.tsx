'use client'

import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type ContainerImageProps = {
  imageUrl: string[]
}

export function ContainerImage({ imageUrl }: ContainerImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <>
      {!imageLoaded && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <Loader className="animate-spin text-primary" />
        </div>
      )}
      <Image
        src={imageUrl[0]}
        width={0}
        height={0}
        sizes="100vw"
        className={cn(
          'h-full w-full shrink-0 object-contain opacity-0 transition-opacity duration-500',
          imageLoaded && 'opacity-100',
        )}
        alt=""
        onLoad={handleImageLoad}
      />
    </>
  )
}
