import { getTranslations } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { Clock, Package } from 'lucide-react'
import Image from 'next/image'

interface OrderItemProps {
  order: {
    id: string
    createdAt: Date
    status: string
    orderProducts: {
      productId: string
      quantity: number
      basePrice: number
      discountPercentage: number
      product: {
        name: string
        imageUrls: string[]
      }
    }[]
  }
}

export async function OrderItem({ order }: OrderItemProps) {
  const t = await getTranslations('OrderPage')

  // Calcular o preço total da ordem
  const totalPrice = order.orderProducts.reduce((total, item) => {
    const priceAfterDiscount =
      item.basePrice * (1 - item.discountPercentage / 100)
    return total + priceAfterDiscount * item.quantity
  }, 0)

  // Formatar a data
  const formattedDate = new Date(order.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  // Mapear status para texto traduzido
  const statusMap: Record<string, string> = {
    PAYMENT_CONFIRMED: t('paymentConfirmed'),
    WAITING_FOR_PAYMENT: t('waitingForPayment'),
  }
  const statusText = statusMap[order.status] || order.status

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Pedido #{order.id.slice(0, 8)}
          </h2>
          <div className="mt-1 flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="text-sm font-medium">
          <span
            className={cn(
              'rounded-full px-2 py-1',
              order.status === 'PAYMENT_CONFIRMED'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800',
            )}
          >
            {statusText}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {order.orderProducts.map((item) => {
          const priceAfterDiscount =
            item.basePrice * (1 - item.discountPercentage / 100)
          const itemTotal = priceAfterDiscount * item.quantity

          return (
            <div
              key={item.productId}
              className="flex items-center gap-4 border-t pt-4"
            >
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={item.product.imageUrls[0] || '/placeholder.png'}
                  alt={item.product.name}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('quantity')}: {item.quantity}
                </p>
                <p className="text-sm text-muted-foreground">
                  Preço unico:{' '}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(priceAfterDiscount)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(itemTotal)}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="mr-1 h-4 w-4" />
          <span>Total Itens: {order.orderProducts.length}</span>
        </div>
        <div className="text-lg font-semibold">
          Total:{' '}
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(totalPrice)}
        </div>
      </div>
    </div>
  )
}
