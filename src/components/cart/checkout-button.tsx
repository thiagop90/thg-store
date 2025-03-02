import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { createOrder } from '@/actions/order'
import { createCheckout } from '@/actions/checkout'
import { useCartStore } from '@/store/cart'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { useTranslations } from 'next-intl'

export function CheckoutButton() {
  const t = useTranslations('Cart')
  const { cart } = useCartStore()
  const { data } = useSession()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFinishPurchaseClick = async () => {
    setIsProcessing(true)

    const order = await createOrder(cart, data?.user?.id ?? '')
    const checkout = await createCheckout(cart, order.id)
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })

    // setIsProcessing(false)
  }

  return (
    <div className="space-y-4 px-6 pb-6">
      <Button
        className="w-full"
        onClick={handleFinishPurchaseClick}
        disabled={isProcessing || !data?.user}
      >
        {isProcessing ? (
          <>
            {t('processing')}
            <Icons.spinner className="ml-1 h-4 w-4" />
          </>
        ) : (
          <span translate="no">Checkout</span>
        )}
      </Button>
      {!data?.user && (
        <p className="text-center leading-relaxed">
          You must{' '}
          <span
            onClick={() => signIn('google')}
            className="cursor-pointer font-semibold text-primary underline underline-offset-4"
          >
            log in
          </span>{' '}
          to proceed with checkout.
        </p>
      )}
    </div>
  )
}
