import { Skeleton } from '@/components/ui/skeleton'
import { WrapperProduct } from '../components/wrapper-product'

export default function Loading() {
  return (
    <>
      <div className="my-8 flex flex-col items-center justify-center lg:items-start lg:justify-start">
        <Skeleton className="mb-1.5 h-6 w-28" />
        <Skeleton className="h-4 w-[70px]" />
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
