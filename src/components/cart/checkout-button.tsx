import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { loadStripe } from '@stripe/stripe-js'
import { Button, buttonVariants } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export function CheckoutButton({ userId }: { userId: string | undefined }) {
  const t = useTranslations('Cart')
  const { cart, toggleCart } = useCartStore()
  const router = useRouter()

  const handleCheckoutClick = () => {
    if (!userId) {
      router.push('/login')
      toggleCart(false)
    }
  }

  const fetchClientSecret = useCallback(() => {
    return fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: cart,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret)
  }, [cart, userId])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" onClick={handleCheckoutClick}>
          <span translate="no">Checkout</span>
        </Button>
      </AlertDialogTrigger>
      {userId && (
        <AlertDialogContent className="z-[101] flex flex-col gap-0 bg-card p-0">
          <AlertDialogHeader className=" space-y-0 text-left">
            <div className="flex items-center justify-between border-b px-6 py-4 ">
              <AlertDialogTitle className="text-base">
                {t('paymentViaStripe')}
              </AlertDialogTitle>
              <AlertDialogCancel
                className={cn(
                  buttonVariants({ size: 'icon', variant: 'outline' }),
                  'mt-0 h-9 w-9 shrink-0',
                )}
              >
                <X className="size-4" />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>

          <div className="overflow-y-auto px-6 py-4">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}
