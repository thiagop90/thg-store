'use client'

import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ProductReview } from '@/generated/prisma'

interface RatingStarsProps {
  reviews: ProductReview[]
  className?: string
}

export function RatingStars({ reviews, className }: RatingStarsProps) {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0

  const roundedAverage = averageRating.toFixed(1)

  const fullStars = Math.floor(averageRating)
  const hasHalfStar = averageRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className="text-xs text-muted-foreground">
        {reviews.length > 0 ? roundedAverage : '0.0'}
      </span>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            className="size-3 fill-primary text-primary"
          />
        ))}

        {hasHalfStar && (
          <svg width="12" height="12" viewBox="0 0 24 24" className="size-3">
            <defs>
              <clipPath id={`half-clip-${roundedAverage}`}>
                <rect x="0" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <Star
              className="size-3 fill-primary"
              clipPath={`url(#half-clip-${roundedAverage})`}
              stroke="currentColor"
              strokeWidth={2}
              style={{ color: 'hsl(var(--primary))' }}
            />
            <Star
              className="size-3 text-primary"
              stroke="currentColor"
              strokeWidth={2}
              style={{ color: 'hsl(var(--primary))' }}
            />
          </svg>
        )}

        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star key={`empty-${index}`} className="size-3 text-primary" />
        ))}
      </div>

      {reviews.length > 0 && (
        <span className="text-xs text-muted-foreground">
          ({reviews.length})
        </span>
      )}
    </div>
  )
}
