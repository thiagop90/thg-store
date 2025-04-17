'use client'

import { useEffect, Fragment } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { getAllProducts } from '@/actions/get-all-products'
import { computeProductTotalPrice } from '@/helpers/compute-price'
import { Icons } from '@/components/icons'
import { WrapperProduct } from './components/wrapper-product'
import { ProductCard } from './components/product-card'
import { SearchHeader } from './components/search-header'
import { LoadingSkeleton } from './components/loadind-skeleton'
import { NoResults } from './components/no-results'
import type { Product } from '@prisma/client'

export default function SearchPage() {
  const t = useTranslations('SearchPage')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query')
  const sortQuery = searchParams.get('sort')
  const encodedSearchQuery = encodeURI(searchQuery || '')
  const encodedSortQuery = encodeURI(sortQuery || '')

  const { ref, inView } = useInView()

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
    getNextPageParam: (lastPage) => lastPage?.nextId,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  const totalProducts = data?.pages[0]?.totalCount || 0
  const totalResults =
    isSuccess && data
      ? data.pages.reduce((total, page) => total + page.result.length, 0)
      : 0

  if (isSuccess && totalResults === 0) {
    return <NoResults searchQuery={searchQuery} />
  }

  return (
    <div className="flex-1 space-y-6 py-8">
      {!isLoading && (
        <SearchHeader
          searchQuery={searchQuery}
          totalResults={totalResults}
          totalProducts={totalProducts}
        />
      )}
      {isLoading && <LoadingSkeleton searchQuery={searchQuery} />}
      {isSuccess && totalResults > 0 && (
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
      <div
        className="my-6 flex items-center justify-center gap-2"
        ref={ref}
        aria-live="polite"
      >
        {isFetchingNextPage && (
          <div className="flex items-center gap-2">
            <Icons.spinner className="h-5 w-5 animate-spin" />
            <span>{t('loadingMoreProducts')}</span>
          </div>
        )}
      </div>
    </div>
  )
}
