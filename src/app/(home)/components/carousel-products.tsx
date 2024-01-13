'use client'

import {
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { computeProductTotalPrice } from '@/helpers/compute-price'
import { Product } from '@prisma/client'
import { CardCarousel } from './card-carousel'
import { cn } from '@/lib/utils'
import { NextButton, PrevButton } from './arrows-buttons'

type ProductListProps = HTMLAttributes<HTMLDivElement> & {
  autoplay?: boolean
  options?: EmblaOptionsType
  products: Product[]
  progressBar?: boolean
}

export const CarouselProducts = forwardRef<HTMLDivElement, ProductListProps>(
  ({ autoplay, className, options, products, progressBar, ...props }, ref) => {
    const emblaOptions = autoplay
      ? [Autoplay({ delay: 2000, stopOnInteraction: false })]
      : []
    const [emblaRef, emblaApi] = useEmblaCarousel(
      { ...options, align: 'start', loop: true },
      emblaOptions,
    )
    const [scrollProgress, setScrollProgress] = useState(0)

    const scrollPrev = useCallback(
      () => emblaApi && emblaApi.scrollPrev(),
      [emblaApi],
    )
    const scrollNext = useCallback(
      () => emblaApi && emblaApi.scrollNext(),
      [emblaApi],
    )

    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
      setScrollProgress(progress * 100)
    }, [])

    useEffect(() => {
      if (!emblaApi) return

      onScroll(emblaApi)
      emblaApi.on('reInit', onScroll)
      emblaApi.on('scroll', onScroll)
    }, [emblaApi, onScroll])

    return (
      <div className={cn('-mx-4 md:mx-0', className)} ref={ref} {...props}>
        <div className="relative overflow-hidden px-4 md:px-0" ref={emblaRef}>
          <div className="flex touch-pan-y backface-hidden">
            {products.map((product) => (
              <div key={product.id} className="mr-4">
                <CardCarousel product={computeProductTotalPrice(product)} />
              </div>
            ))}
          </div>
          <PrevButton onClick={scrollPrev} />
          <NextButton onClick={scrollNext} />
        </div>
        {progressBar && (
          <div className="pointer-events-none relative inset-x-0 mx-auto mt-4 flex h-1.5 w-56 max-w-[90%] overflow-hidden rounded-full border bg-card">
            <div
              className="absolute inset-y-0 -left-full w-full bg-primary"
              style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
            />
          </div>
        )}
      </div>
    )
  },
)
CarouselProducts.displayName = 'CarouselProducts'
