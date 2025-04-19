import { useCartPricesFormatted } from '@/helpers/cart-prices-formatted'
import { useTranslations } from 'next-intl'

type SummaryItemType = {
  label: string
  value: string
}

function SummaryItem({ label, value }: SummaryItemType) {
  return (
    <div className="mb-3 flex items-center justify-between border-b pb-1">
      <p className="text-muted-foreground">{label}</p>
      <p className="text-right font-medium">{value}</p>
    </div>
  )
}

export function CartSummary() {
  const t = useTranslations('Cart')

  const {
    formattedDiscount,
    formattedSubtotal,
    formattedPriceAfterDiscountWithDiscount,
  } = useCartPricesFormatted()

  return (
    <div className="flex flex-col py-4">
      <SummaryItem label="Subtotal" value={formattedSubtotal} />
      <SummaryItem label={t('discount')} value={`- ${formattedDiscount}`} />
      <SummaryItem label="Total" value={formattedPriceAfterDiscountWithDiscount} />
    </div>
  )
}
