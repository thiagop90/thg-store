import db from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MoveRight, PackageSearch } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { OrderSummary } from '@/components/order/order-summary'
import { Card, CardContent } from '@/components/ui/card'
import { getSession } from '@/actions/auth'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('OrderPage')

  return {
    title: t('orderHistory'),
  }
}

export default async function OrderPage() {
  const [t, session] = await Promise.all([
    getTranslations('OrderPage'),
    getSession(),
  ])

  if (!session || !session.user) {
    redirect('/')
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderProducts: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="mx-auto w-full max-w-[550px] py-16">
      {orders.length === 0 ? (
        <div className="mt-20 flex w-full flex-col items-center justify-center gap-4">
          <PackageSearch
            className="h-16 w-16 text-muted-foreground"
            strokeWidth={1.25}
          />
          <p className="text-center text-2xl font-semibold">
            {t('noOrdersWerePlaced')}
          </p>
          <Link href="/search" className={cn(buttonVariants({ size: 'sm' }))}>
            {t('backToShopping')}
          </Link>
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">
              {t('orderHistory')}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t('checkTheStatusOfRecentOrders')}
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {orders.map((order) => (
              <Card key={order.id} className="">
                <CardContent className="pt-6">
                  <OrderSummary order={order} isOpenByDefault={false} />
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
