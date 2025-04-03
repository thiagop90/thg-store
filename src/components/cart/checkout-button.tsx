import { useState } from 'react'
import { createOrder } from '@/actions/order'
import { createCheckout } from '@/actions/checkout'
import { useCartStore } from '@/store/cart'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export function CheckoutButton({ userId }: { userId: string | undefined }) {
  const t = useTranslations('Cart')
  const router = useRouter()
  const { cart, toggleCart, removeAll } = useCartStore()

  const [isProcessing, setIsProcessing] = useState(false)

  function goToLoginPage() {
    router.push('/login')
    toggleCart()
  }

  async function handleFinishPurchaseClick() {
    if (!userId) return

    setIsProcessing(true)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    const order = await createOrder(cart, userId)
    const checkout = await createCheckout(cart, order.id)

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })

    toggleCart()
    removeAll()
  }

  return (
    <div className="space-y-4 px-6 pb-6">
      <Button
        className="w-full"
        onClick={userId ? handleFinishPurchaseClick : goToLoginPage}
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
