interface OrderSummaryItemProps {
  label: string
  value: string
}

export function OrderSummaryItem({ label, value }: OrderSummaryItemProps) {
  return (
    <div className="group flex items-center justify-between pt-4 first:pt-0">
      <p className="text-muted-foreground group-last:font-medium group-last:text-foreground">
        {label}
      </p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
