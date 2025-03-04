'use client'

import { WrapperProduct } from './components/wrapper-product'
import { Fragment, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Product } from '@prisma/client'
import { ProductCard } from '@/components/product-card'
import { computeProductTotalPrice } from '@/helpers/compute-price'
import { Skeleton } from '@/components/ui/skeleton'
import { useSearchParams } from 'next/navigation'
import { getAllProducts } from '@/actions/get-all-products'
import { useTranslations } from 'next-intl'
import { Icons } from '@/components/icons'

export default function SearchPage() {
  const t = useTranslations('Products')
  const { ref, inView } = useInView()
  const search = useSearchParams()
  const searchQuery = search ? search.get('query') : null
  const sortQuery = search ? search.get('sort') : null
  const encodedSearchQuery = encodeURI(searchQuery || '')
  const encodedSortQuery = encodeURI(sortQuery || '')

  const {
    isLoading,
    data,
    isSuccess,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', { encodedSearchQuery, encodedSortQuery }],
    queryFn: ({ pageParam }) =>
      getAllProducts({
        lastCursor: pageParam,
        encodedSearchQuery,
        encodedSortQuery,
      }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => {
      return lastPage?.nextId
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, inView, fetchNextPage])

  const totalResults =
    isSuccess &&
    data.pages.reduce((total, page) => total + page.result.length, 0)

  if (isLoading)
    return (
      <>
        {searchQuery && <Skeleton className="mb-4 h-6 w-48" />}
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

  if (totalResults === 0) {
    return (
      <p className="mb-4">
        {t('thereAreNoProductsThatMatch')}{' '}
        <span className="font-bold">
          {'"'}
          {searchQuery}
          {'"'}
        </span>
      </p>
    )
  }

  return (
    <>
      {searchQuery && totalResults > 0 && (
        <p className="mb-4">
          {t('showing')} {totalResults} {t('resultsTo')}{' '}
          <span className="font-bold">
            {'"'}
            {searchQuery}
            {'"'}
          </span>
        </p>
      )}
      {isSuccess && (
        <WrapperProduct>
          {data.pages.map((page) => (
            <Fragment key={page.nextId ?? 'lastPage'}>
              {page.result.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={computeProductTotalPrice(product)}
                />
              ))}
            </Fragment>
          ))}
        </WrapperProduct>
      )}

      <div className="flex justify-center" ref={ref}>
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <Icons.spinner className="text-primary" />
            {t('loadingMoreProducts')}
          </div>
        )}
      </div>
    </>
  )
}
