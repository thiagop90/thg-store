'use client'

import { useCallback, useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { useRouter } from 'next/navigation'
import { Search, SearchIcon } from 'lucide-react'
import { getCategoryIcon } from './get-category-icon'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/actions/get-products'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { Drawer, DrawerContent } from '../ui/drawer'
import { Button } from '../ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'

interface Product {
  id: string
  name: string
  slug: string
  category: {
    slug: string
  }
}

interface ProductListProps {
  filteredProducts: Product[] | undefined
  forwardToRoute: (slug: string) => void
}

function ProductList({ filteredProducts, forwardToRoute }: ProductListProps) {
  return (
    <CommandGroup heading="Products">
      {filteredProducts?.map((product) => (
        <CommandItem
          key={product.id}
          onSelect={() => forwardToRoute(`/product/${product.slug}`)}
        >
          {getCategoryIcon(product.category.slug)}
          {product.name}
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

function LoadingSkeleton() {
  return (
    <div className="px-3 py-2">
      <div className="p-2">
        <Skeleton className="h-1.5 w-[80px]" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex h-11 w-full items-center gap-3 px-2 py-1.5"
        >
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-2 w-[200px]" />
        </div>
      ))}
    </div>
  )
}

interface SearchResultsProps {
  searchQuery: string
  filteredProducts: Product[] | undefined
  isLoadingProducts: boolean
  forwardToRoute: (slug: string) => void
}

function SearchResults({
  searchQuery,
  filteredProducts,
  isLoadingProducts,
  forwardToRoute,
}: SearchResultsProps) {
  const t = useTranslations('Products')

  return (
    <CommandList className="command-list">
      {searchQuery && (
        <CommandGroup heading={t('search')} className="border-b">
          <CommandItem
            onSelect={() => forwardToRoute(`/search?query=${searchQuery}`)}
          >
            <Search className="h-4 w-4" />
            {searchQuery}
          </CommandItem>
        </CommandGroup>
      )}
      {filteredProducts && (
        <ProductList
          filteredProducts={filteredProducts}
          forwardToRoute={forwardToRoute}
        />
      )}
      {isLoadingProducts && <LoadingSkeleton />}
      <CommandEmpty>{t('noProductsFound')}</CommandEmpty>
    </CommandList>
  )
}

export function CommandMenuDialog() {
  const t = useTranslations('Products')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const { data: filteredProducts, isLoading: isLoadingProducts } = useQuery<
    Product[]
  >({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const forwardToRoute = useCallback(
    (slug: string) => {
      router.replace(slug)
      setSearchQuery('')
      setOpen(false)
    },
    [router],
  )

  const searchInput = (
    <CommandInput
      id="searchQuery"
      placeholder={t('searchProducts')}
      value={searchQuery}
      onValueChange={setSearchQuery}
    />
  )

  return (
    <>
      <Button
        size={isMobile ? 'icon' : 'default'}
        variant="outline"
        className="gap-2 sm:w-full sm:max-w-fit sm:justify-start sm:px-3 sm:py-2 sm:text-muted-foreground lg:max-w-md"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-5 w-5" />
        <span className="hidden sm:block">{t('searchProducts')}</span>
        <span className="hidden rounded-md border bg-background px-1.5 text-[10px] sm:flex lg:ml-auto">
          CTRL + K
        </span>
      </Button>
      {isMobile ? (
        <Drawer direction="top" open={open} onOpenChange={setOpen}>
          <DrawerContent className="mx-auto max-w-lg rounded-xl">
            <Command>
              {searchInput}
              <SearchResults
                searchQuery={searchQuery}
                filteredProducts={filteredProducts}
                isLoadingProducts={isLoadingProducts}
                forwardToRoute={forwardToRoute}
              />
            </Command>
          </DrawerContent>
        </Drawer>
      ) : (
        <CommandDialog open={open} onOpenChange={setOpen}>
          {searchInput}
          <SearchResults
            searchQuery={searchQuery}
            filteredProducts={filteredProducts}
            isLoadingProducts={isLoadingProducts}
            forwardToRoute={forwardToRoute}
          />
        </CommandDialog>
      )}
    </>
  )
}
