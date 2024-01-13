import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { createOrder } from '@/actions/order'
import { createCheckout } from '@/actions/checkout'
import { useCartStore } from '@/store/cart'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'

export function CheckoutButton() {
  const { cart } = useCartStore()
  const { data } = useSession()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFinishPurchaseClick = async () => {
    setIsProcessing(true)

    const order = await createOrder(cart, data?.user.id ?? '')
    const checkout = await createCheckout(cart, order.id)
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    })
  }

  return (
    <div className="space-y-3.5 px-6 pb-6">
      <Button
        className="w-full"
        onClick={handleFinishPurchaseClick}
        disabled={isProcessing || !data?.user}
      >
        {isProcessing ? (
          <>
            Processing...
            <Loader className="ml-1 h-4 w-4 animate-spin" />
          </>
        ) : (
          'Checkout'
        )}
      </Button>
      {!data?.user && (
        <p className="text-center leading-relaxed">
          <span
            onClick={() => signIn('google')}
            className="cursor-pointer font-semibold text-primary underline"
          >
            Sign in
          </span>{' '}
          to the platform to proceed with checkout.
        </p>
      )}
    </div>
  )
}
