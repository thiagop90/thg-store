'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const ArrowButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          'h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm transition-all duration-200 hover:bg-background/90',
          className,
        )}
        size="icon"
        variant="outline"
        type="button"
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    )
  },
)
ArrowButton.displayName = 'ArrowButton'

export const PrevButton = forwardRef<HTMLDivElement, ButtonProps>(
  ({ onClick, disabled, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center md:flex',
          className,
        )}
      >
        <ArrowButton
          onClick={onClick}
          disabled={disabled}
          aria-label="Previous slide"
          className=""
          {...props}
        >
          <ArrowLeft className="h-4 w-4" />
        </ArrowButton>
      </div>
    )
  },
)
PrevButton.displayName = 'PrevButton'

export const NextButton = forwardRef<HTMLDivElement, ButtonProps>(
  ({ onClick, disabled, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute inset-y-0 right-0 z-20 flex w-10 items-center bg-gradient-to-l from-background to-transparent transition-opacity duration-300',
          className,
        )}
      >
        <ArrowButton
          onClick={onClick}
          disabled={disabled}
          aria-label="Next slide"
          className="hidden md:flex md:flex-none"
          {...props}
        >
          <ArrowRight className="h-4 w-4" />
        </ArrowButton>
      </div>
    )
  },
)
NextButton.displayName = 'NextButton'
