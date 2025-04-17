'use client'

import {
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { computeProductTotalPrice } from '@/helpers/compute-price'
import { Product } from '@prisma/client'
import { CardCarousel } from './card-carousel'
import { cn } from '@/lib/utils'
import { NextButton, PrevButton } from './arrows-buttons'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

type ProductListProps = HTMLAttributes<HTMLDivElement> & {
  autoplay?: boolean
  options?: EmblaOptionsType
  products: Product[]
  progressBar?: boolean
}

export const CarouselProducts = forwardRef<HTMLDivElement, ProductListProps>(
  ({ autoplay, className, options, products, progressBar, ...props }, ref) => {
    const autoplayPlugin = Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })

    const [emblaRef, emblaApi] = useEmblaCarousel(
      { ...options, align: 'start' },
      autoplay ? [autoplayPlugin] : [],
    )

    const [scrollProgress, setScrollProgress] = useState(0)
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(true)

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
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
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
              <div key={product.id} className="mr-4 last:mr-0">
                <CardCarousel product={computeProductTotalPrice(product)} />
              </div>
            ))}
          </div>
          <PrevButton
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className={cn(
              canScrollPrev ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          />
          <NextButton
            onClick={scrollNext}
            disabled={!canScrollNext}
            className={cn(
              canScrollNext ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          />
        </div>
        {progressBar && (
          <div className="mx-auto mt-4 flex w-fit">
            <div className="pointer-events-none relative inset-x-0 flex h-1.5 w-52 max-w-[90%] overflow-hidden rounded-full border bg-card">
              <div
                className="absolute inset-y-0 -left-full w-full bg-primary"
                style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
              />
            </div>
          </div>
        )}
      </div>
    )
  },
)
CarouselProducts.displayName = 'CarouselProducts'
