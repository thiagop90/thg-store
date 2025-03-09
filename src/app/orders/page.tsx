import { db } from '@/lib/prisma'
import { OrderItem } from './components/order-item'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { PackageSearch } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { auth } from '@/auth'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('OrderPage')

  return {
    title: t('orderHistory'),
  }
}

export default async function OrderPage() {
  const [t, session] = await Promise.all([getTranslations('OrderPage'), auth()])

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
    <div className="mx-auto max-w-2xl py-16 lg:max-w-4xl">
      {orders.length === 0 ? (
        <div className="mt-20 flex w-full flex-col items-center justify-center">
          <PackageSearch className="h-16 w-16" strokeWidth={1.5} />
          <p className="mt-6 text-center text-2xl font-semibold">
            No orders were placed.
          </p>
          <Link
            href="/search"
            className="mt-2 text-lg font-medium leading-relaxed text-primary underline-offset-4 hover:underline"
          >
            Go shopping &#8594;
          </Link>
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">
              {t('orderHistory')}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t('checkTheStatusOfRecentOrders')}
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
