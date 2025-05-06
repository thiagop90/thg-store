'use client'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useCartStore } from '@/store/cart'
import { X } from 'lucide-react'
import { CartProduct } from './cart-product'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CartSummary } from './cart-summary'
import { CheckoutButton } from './checkout-button'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Icons } from '@/components/icons'

interface CardProps {
  userId: string | undefined
}

export function Cart({ userId }: CardProps) {
  const t = useTranslations('Cart')
  const { cart, clearCart, isOpenCart, toggleCart } = useCartStore()

  const itemText = cart.length > 1 ? t('items') : 'item'

  return (
    <Drawer direction="right" open={isOpenCart} onOpenChange={toggleCart}>
      <DrawerTrigger asChild>
        <Button className="relative" size="icon" variant="outline">
          <Icons.shoppingCart />
          {cart.length > 0 && (
            <span className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-primary text-xs font-semibold">
              {cart.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        classNameOverlay="backdrop-blur"
        className="flex w-[calc(100%-1rem)] max-w-md flex-col"
      >
        <DrawerHeader className="relative p-6">
          <DrawerTitle className="text-xl">{t('myCart')}</DrawerTitle>
          <Button
            size="icon"
            variant="outline"
            className="absolute right-6 top-1/2 h-8 w-8 -translate-y-1/2"
            onClick={() => toggleCart(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DrawerHeader>
        {cart.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center">
            <Icons.shoppingCart className="h-16 w-16" />
            <p className="mt-6 text-center text-2xl font-bold">
              {t('yourCartIsEmpty')}
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-t px-6 py-1.5">
              <p>
                {cart.length} {itemText}
              </p>
              <Button
                variant="link"
                className="h-fit p-0 text-base"
                onClick={clearCart}
              >
                {t('emptyCart')}
              </Button>
            </div>

            <ScrollArea className="flex-grow px-6">
              {cart.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </ScrollArea>

            <div className="border-t px-6 pb-6">
              <CartSummary />
              <CheckoutButton userId={userId} />
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  )
}
