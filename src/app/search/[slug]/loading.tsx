import { Skeleton } from '@/components/ui/skeleton'
import { WrapperProduct } from '../components/wrapper-product'

export default function Loading() {
  return (
    <>
      <div className="mb-4">
        <Skeleton className="mb-1 h-5 w-[88px]" />
        <Skeleton className="h-4 w-20" />
      </div>
      <WrapperProduct>
        {Array(12)
          .fill(null)
          .map((item, index) => (
            <div
              key={index}
              className="flex h-full w-full flex-col gap-2 border-b border-r p-2"
            >
              <Skeleton className="aspect-square" />
              <div className=" w-full space-y-1">
                <Skeleton className="h-5 w-2/3 " />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-[68px]" />
              </div>
            </div>
          ))}
      </WrapperProduct>
    </>
  )
}
