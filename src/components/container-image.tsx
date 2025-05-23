'use client'

import { cn } from '@/lib/utils'
import { useState, unstable_ViewTransition as ViewTransition } from 'react'
import { Icons } from './icons'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import Link from 'next/link'
import type { Product } from '@/generated/prisma'
import Image from 'next/image'

type ContainerImageProps = {
  product: Pick<Product, 'id' | 'imageUrls' | 'name' | 'slug'>
  active?: boolean
}

export function ContainerImage({ product, active }: ContainerImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <ViewTransition name={`image-${product.id}`}>
      {active ? (
        <Carousel>
          <CarouselContent>
            {product.imageUrls.map((imageUrl, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square overflow-hidden">
                  {!imageLoaded && (
                    <div className="flex size-full items-center justify-center">
                      <Icons.loadingDots />
                    </div>
                  )}
                  <Image
                    alt={imageUrl}
                    src={imageUrl}
                    fill
                    className={cn(
                      'object-contain',
                      imageLoaded ? 'opacity-100' : 'opacity-0',
                      'p-16 min-[500px]:p-20',
                    )}
                    onLoad={handleImageLoad}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      ) : (
        <Link
          href={`/product/${product.slug}`}
          className="relative aspect-square overflow-hidden"
        >
          {!imageLoaded && (
            <div className="flex size-full items-center justify-center">
              <Icons.loadingDots />
            </div>
          )}
          <Image
            alt={product.name}
            src={product.imageUrls[0]}
            fill
            className={cn(
              'object-contain',
              imageLoaded ? 'opacity-100' : 'opacity-0',
              'p-9 min-[500px]:p-12',
            )}
            onLoad={handleImageLoad}
          />
        </Link>
      )}
    </ViewTransition>
  )
}
