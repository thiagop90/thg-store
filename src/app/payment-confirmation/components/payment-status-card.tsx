import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import OrderSummary from './order-summary'
import { ClearCartOnSuccess } from './clear-cart-on-success'
import { getOrderBySessionId, getStripeSessionStatus } from '@/actions/stripe'

type PaymentStatusCardProps = {
  sessionId: string
}

export default async function PaymentStatusCard({
  sessionId,
}: PaymentStatusCardProps) {
  const [order, sessionStatus] = await Promise.all([
    await getOrderBySessionId(sessionId),
    await getStripeSessionStatus(sessionId),
  ])

  if (sessionStatus !== 'complete') {
    return (
      <div className="flex w-full items-center justify-center pt-16">
        <Card className="w-full max-w-[550px]">
          <CardHeader>
            <CardTitle>Pagamento Pendente</CardTitle>
            <CardDescription>
              Seu pagamento está sendo processado. Estamos verificando o status.
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
          <CardDescription>Seu pedido foi confirmado.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClearCartOnSuccess />

          {order && <OrderSummary order={order} />}
        </CardContent>
      </Card>
    </div>
  )
}
