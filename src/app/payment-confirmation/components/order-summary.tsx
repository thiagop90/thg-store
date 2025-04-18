import db from '@/lib/prisma'
import { OrderItem } from './order-item'
import { getTranslations } from 'next-intl/server'
import { PackageSearch } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Stripe from 'stripe'

interface OrderSummaryProps {
  stripeSession: Stripe.Checkout.Session
}

export default async function OrderSummary({
  stripeSession,
}: OrderSummaryProps) {
  const t = await getTranslations('OrderPage')

  const order = await db.order.findFirst({
    where: {
      sessionId: stripeSession.id,
    },
    include: {
      orderProducts: {
        include: { product: true },
      },
    },
  })

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl py-16 lg:max-w-4xl">
        <div className="mt-20 flex w-full flex-col items-center justify-center">
          <PackageSearch className="h-16 w-16" strokeWidth={1.25} />
          <p className="mt-6 text-center text-2xl font-semibold">
            Seu pedido está sendo processado
          </p>
          <p className="mt-2 text-muted-foreground">
            O pagamento está sendo confirmado. Você receberá uma notificação
            quando concluído.
          </p>
          <Link
            href="/search"
            className={cn(buttonVariants({ size: 'sm' }), 'mt-6')}
          >
            {t('goShopping')}
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-4xl">
      {/* <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">Detalhes</h1>
        <p className="mt-2 text-muted-foreground">
          {t('checkTheStatusOfRecentOrders')}
        </p>
      </div> */}
      <div className="border-t pt-6">
        <OrderItem order={order} />
      </div>
    </div>
  )
}
