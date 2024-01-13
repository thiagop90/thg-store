'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { ThumbsButton } from './thumbs-button'
import { Loader } from 'lucide-react'

type ProductImagesProps = {
  imageUrls: string[]
}

export function CarouselImages({ imageUrls }: ProductImagesProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    loop: true,
    duration: 20,
  })
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    active: false,
    watchDrag: false,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div
      className="relative h-full w-full basis-full overflow-hidden lg:basis-4/6"
      ref={emblaMainRef}
    >
      <div className="flex aspect-square h-full max-h-[400px] w-full touch-pan-y backface-hidden sm:max-h-[500px]">
        {imageUrls.map((imageUrl) => (
          <>
            {!imageLoaded && (
              <div className="flex h-full w-full items-center justify-center">
                <Loader className="animate-spin text-primary" />
              </div>
            )}
            <Image
              key={imageUrl}
              src={imageUrl}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full flex-none object-contain p-12"
              onLoad={handleImageLoad}
              priority
              quality={100}
            />
          </>
        ))}
      </div>
      <ul
        className="my-12 overflow-hidden px-4 sm:px-0 lg:mb-0"
        ref={emblaThumbsRef}
      >
        <div className="flex items-center justify-center space-x-3">
          {imageUrls.map((imageUrl, index) => (
            <ThumbsButton
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              imgSrc={imageUrl}
              key={imageUrl}
            />
          ))}
        </div>
      </ul>
    </div>
  )
}
