import { redirect } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { getOrderBySessionId, getStripeSession } from '@/actions/stripe'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { OrderSummary } from '@/components/order/order-summary'
import { ClearCartOnSuccess } from './clear-cart-on-success'
import { getTranslations } from 'next-intl/server'

export default async function PaymentConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const [t, { session_id: sessionId }] = await Promise.all([
    getTranslations('OrderPage'),
    searchParams,
  ])

  if (!sessionId) {
    return redirect('/')
  }

  const [stripeSession, order] = await Promise.all([
    getStripeSession(sessionId),
    getOrderBySessionId(sessionId),
  ])

  if (stripeSession.status === 'open') {
    return redirect('/')
  }

  if (stripeSession.status !== 'complete') {
    return (
      <div className="flex w-full items-center justify-center pb-10 pt-6">
        <Card className="w-full max-w-[550px]">
          <CardHeader>
            <CardTitle>{t('pendingPayment')}</CardTitle>
            <CardDescription>{t('processingPayment')}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg font-medium">{t('loadingOrder')}</p>
        <p className="text-sm text-muted-foreground">{t('pleaseWait')}</p>
      </div>
    )
  }

  return (
    <div className="-mx-2 flex items-center justify-center pb-10 pt-6 min-[500px]:mx-0">
      <Card className="w-full max-w-[580px] rounded-3xl">
        <CardHeader className="p-8 text-center">
          <CardTitle>{t('thankYou')}</CardTitle>
          <CardDescription>{t('orderProcessed')}</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <ClearCartOnSuccess sessionId={sessionId} />
          <OrderSummary order={order} />
        </CardContent>
        <CardFooter className="flex-col gap-4 p-8 pt-0 sm:flex-row">
          <Link
            className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
            href="/orders"
          >
            {t('orderHistory')}
          </Link>
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            href="/search"
          >
            {t('backToShopping')}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
