import { Skeleton } from '@/components/ui/skeleton'
import { WrapperProduct } from './wrapper-product'

export function LoadingSkeleton({
  searchQuery,
}: {
  searchQuery: string | null
}) {
  return (
    <div className="flex-1 space-y-6 py-8">
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
              className="grid h-full w-full grid-cols-2 gap-2 border-b border-r min-[500px]:grid-cols-1"
            >
              <Skeleton className="m-2 aspect-square" />
              <div className="flex flex-col py-4 pr-4 min-[500px]:gap-3 min-[500px]:px-4 min-[500px]:pt-0">
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex items-end justify-between">
                  <Skeleton className="h-4 w-[68px]" />
                  <Skeleton className="h-10 w-10 rounded-md" />
                </div>
              </div>
            </div>
          ))}
      </WrapperProduct>
    </div>
  )
}
