import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PropsWithChildren } from 'react'

type ArrowButtonType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

const ArrowButton = (props: ArrowButtonType) => {
  const { onClick, children } = props

  return (
    <Button
      className="group h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
      size="icon"
      variant="outline"
      type="button"
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export function PrevButton(props: ArrowButtonType) {
  const { ...restProps } = props

  return (
    <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 px-4 md:flex md:items-center md:gap-2">
      <ArrowButton {...restProps}>
        <ArrowLeft className="h-4 w-4" />
      </ArrowButton>
    </div>
  )
}

export const NextButton = (props: ArrowButtonType) => {
  const { ...restProps } = props

  return (
    <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 px-4 md:flex md:items-center md:gap-2">
      <ArrowButton {...restProps}>
        <ArrowRight className="h-4 w-4" />
      </ArrowButton>
    </div>
  )
}
