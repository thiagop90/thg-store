import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import OrderSummary from './order-summary'
import { ClearCartOnSuccess } from './clear-cart-on-success'
import { getOrderBySessionId, getStripeSessionStatus } from '@/actions/stripe'
import { CheckCircle2 } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
    <div className="-mx-2 flex items-center justify-center pb-10 pt-6 min-[500px]:mx-0">
      <Card className=" w-full max-w-[550px]">
        <CardHeader className="text-center">
          {/* <CheckCircle2 className="h-6 w-6 text-green-500" /> */}
          <CardTitle>Obrigado pelo seu pedido!</CardTitle>

          <CardDescription>
            Seu pedido foi processado com sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClearCartOnSuccess />

          {order && <OrderSummary order={order} />}
        </CardContent>

        <CardFooter>
          <Link
            className={cn(
              buttonVariants({ variant: 'default' }),
              'mr-4 w-full',
            )}
            href="/orders"
          >
            Histórico de pedidos
          </Link>
          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            href="/search"
          >
            Voltar às compras
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
