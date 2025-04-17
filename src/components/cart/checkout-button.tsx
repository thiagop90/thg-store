import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export function CheckoutButton({ userId }: { userId: string | undefined }) {
  const t = useTranslations('Cart')
  const router = useRouter()
  const { cart, toggleCart } = useCartStore()

  const [isProcessing, setIsProcessing] = useState(false)

  function goToLoginPage() {
    router.push('/login')
    toggleCart()
  }

  async function handleCheckout() {
    if (!userId) return

    setIsProcessing(true)

    const stripe = await stripePromise

    const response = await fetch('/api/checkout-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems: cart,
        returnUrl: window.location.origin,
        userId,
      }),
    })

    const { sessionId } = await response.json()
    await stripe?.redirectToCheckout({ sessionId })

    toggleCart()
  }

  return (
    <div className="space-y-4 px-6 pb-6">
      <Button
        className="w-full"
        onClick={userId ? handleCheckout : goToLoginPage}
        disabled={isProcessing}
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
    </div>
  )
}
