'use client'

import { useCallback, useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { computePriceAfterDiscount } from '@/helpers/compute-price'
import { Product } from '@/generated/prisma'
import { CardCarousel } from './card-carousel'
import { cn } from '@/lib/utils'
import type { EmblaOptionsType } from 'embla-carousel'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type ProductListProps = {
  autoplay?: boolean
  className?: string
  options?: EmblaOptionsType
  products: Product[]
  progressBar?: boolean
}

export function CarouselProducts({
  autoplay,
  className,
  options,
  products,
  progressBar,
}: ProductListProps) {
  const autoplayPlugin = Autoplay({
    delay: 2000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  })

  const [scrollProgress, setScrollProgress] = useState(0)
  const [emblaApi, setEmblaApi] = useState<any>(null)

  const onScroll = useCallback((api: any) => {
    if (!api) return
    const progress = Math.max(0, Math.min(1, api.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)

    return () => {
      emblaApi.off('reInit', onScroll)
      emblaApi.off('scroll', onScroll)
    }
  }, [emblaApi, onScroll])

  return (
    <div className={cn('-mx-4 md:mx-0', className)}>
      <Carousel
        opts={{ ...options, align: 'start' }}
        plugins={autoplay ? [autoplayPlugin] : []}
        setApi={setEmblaApi}
      >
        <CarouselContent className="ml-0 last:mr-4 md:-ml-4 md:last:mr-0">
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-auto">
              <CardCarousel product={computePriceAfterDiscount(product)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
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
}
