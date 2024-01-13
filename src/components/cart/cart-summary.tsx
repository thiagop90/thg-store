import { useCartPricesFormatted } from '@/helpers/cart-prices-formatted'

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
  const {
    formattedDiscount,
    formattedSubtotal,
    formattedTotalPriceWithDiscount,
  } = useCartPricesFormatted()

  return (
    <div className="flex flex-col border-t px-6 py-4">
      <SummaryItem label="Subtotal" value={formattedSubtotal} />
      <SummaryItem label="Discount" value={`- ${formattedDiscount}`} />
      <SummaryItem label="Total" value={formattedTotalPriceWithDiscount} />
    </div>
  )
}
