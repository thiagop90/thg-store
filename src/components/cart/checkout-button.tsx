import { useCallback } from 'react'
import { useCartStore } from '@/store/cart'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '../ui/button'

import { useTranslations } from 'next-intl'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export function CheckoutButton() {
  const t = useTranslations('Cart')
  const { cart } = useCartStore()

  const fetchClientSecret = useCallback(() => {
    return fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: cart,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret)
  }, [])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">
          <span translate="no">Checkout</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pagamento via Stripe</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha os dados para prosseguir.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="overflow-hidden rounded-md border">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
