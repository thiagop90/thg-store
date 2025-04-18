import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { stripe } from '@/lib/stripe'
import OrderSummary from './components/order-summary'
import { redirect } from 'next/navigation'
import { ClearCartOnSuccess } from './components/clear-cart-on-success'

export default async function PaymentConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams

  if (!sessionId)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'payment_intent'],
  })

  if (stripeSession.status === 'open') {
    return redirect('/')
  }

  if (stripeSession.status !== 'complete') {
    return (
      <div className="flex w-full items-center justify-center pt-16">
        <Card className="w-full max-w-[550px]">
          <CardHeader>
            <CardTitle>Pagamento Pendente</CardTitle>
            <CardDescription>
              Seu pagamento está sendo processado. Você será notificado quando
              for concluído.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center pt-16">
      <Card className="w-full max-w-[550px]">
        <CardHeader>
          <CardTitle>Pagamento bem-sucedido!</CardTitle>
          <CardDescription>Seu pedido foi confirmado</CardDescription>
        </CardHeader>

        <CardContent>
          <ClearCartOnSuccess />
          <OrderSummary stripeSession={stripeSession} />
        </CardContent>
      </Card>
    </div>
  )
}
