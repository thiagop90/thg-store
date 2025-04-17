import { Skeleton } from '@/components/ui/skeleton'
import { WrapperProduct } from './wrapper-product'

export function LoadingSkeleton({
  searchQuery,
}: {
  searchQuery: string | null
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start">
        {searchQuery ? (
          <Skeleton className="h-6 w-48" />
        ) : (
          <>
            <Skeleton className="mb-1.5 h-6 w-32" />
            <Skeleton className="h-4 w-[70px]" />
          </>
        )}
      </div>
      <WrapperProduct>
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="flex h-full w-full flex-col gap-2 border-b border-r p-2"
            >
              <Skeleton className="aspect-square" />
              <div className="w-full space-y-1">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-[68px]" />
              </div>
            </div>
          ))}
      </WrapperProduct>
    </>
  )
}
