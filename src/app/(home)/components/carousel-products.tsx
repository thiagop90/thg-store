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
import { Button } from '@/components/ui/button'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'
import { Icons } from '@/components/icons'

type ProductListProps = HTMLAttributes<HTMLDivElement> & {
  autoplay?: boolean
  options?: EmblaOptionsType
  products: Product[]
  progressBar?: boolean
}

export const CarouselProducts = forwardRef<HTMLDivElement, ProductListProps>(
  ({ autoplay, className, options, products, progressBar, ...props }, ref) => {
    const t = useTranslations('HomePage')

    const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false)
    const autoplayPlugin = Autoplay({ delay: 2000, stopOnInteraction: false })

    const [emblaRef, emblaApi] = useEmblaCarousel(
      { ...options, align: 'start', loop: true },
      autoplay ? [autoplayPlugin] : [],
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

    const toggleAutoplay = useCallback(() => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
      playOrStop()
    }, [emblaApi])

    useEffect(() => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      setAutoplayIsPlaying(autoplay.isPlaying())
      emblaApi
        .on('autoplay:play', () => setAutoplayIsPlaying(true))
        .on('autoplay:stop', () => setAutoplayIsPlaying(false))
        .on('reInit', () => setAutoplayIsPlaying(autoplay.isPlaying()))
    }, [emblaApi])

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
          <div className="mx-auto mt-4 flex w-fit items-center gap-3 rounded-full border bg-card p-1 pr-3">
            <Button
              className="h-8 w-8 rounded-full hover:bg-background sm:hover:bg-accent"
              size="icon"
              variant="outline"
              onClick={toggleAutoplay}
            >
              {autoplayIsPlaying ? <Icons.stop /> : <Icons.play />}
            </Button>

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
