'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from 'next-intl'

type OrderStatus = 'all' | 'WAITING_FOR_PAYMENT' | 'PAYMENT_CONFIRMED'

export function StatusFilter({ defaultStatus }: { defaultStatus: string }) {
  const t = useTranslations('OrderPage')
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleStatusChange = (value: OrderStatus) => {
    const newParams = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      newParams.delete('status')
    } else {
      newParams.set('status', value)
    }
    router.push(`/orders?${newParams.toString()}`)
  }

  return (
    <Select defaultValue={defaultStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-full sm:w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">all</SelectItem>
        <SelectItem value="WAITING_FOR_PAYMENT">
          {t('waitingForPayment')}
        </SelectItem>
        <SelectItem value="PAYMENT_CONFIRMED">
          {t('paymentConfirmed')}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
