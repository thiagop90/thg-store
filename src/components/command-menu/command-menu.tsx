'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Skeleton } from '../ui/skeleton'
import { useRouter } from 'next/navigation'
import { Search, SearchIcon } from 'lucide-react'
import { getCategoryIcon } from './get-category-icon'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/actions/get-products'
import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'

export function CommandMenuDialog() {
  const t = useTranslations('Products')
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const formattedQuery = searchQuery.replace(/\s+/g, '+')

  const { data: filteredProducts, isLoading: isLoadingProducts } = useQuery({
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
  }, [setOpen])

  const forwardToRoute = useCallback(
    (slug: string) => {
      router.replace(slug)
      setSearchQuery('')
      setOpen(false)
    },
    [router],
  )

  return (
    <>
      <Button
        variant="outline"
        className="h-10 w-10 p-0 sm:w-full sm:max-w-fit sm:justify-start sm:gap-2 sm:px-3 sm:py-2 sm:text-muted-foreground lg:max-w-md"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-5 w-5" />
        <span className="hidden sm:block">{t('searchProducts')}</span>
        <span className="hidden rounded-md border bg-background px-1.5 text-[10px] sm:flex lg:ml-auto">
          CTRL + K
        </span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          id="searchQuery"
          placeholder={t('searchProducts')}
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        <CommandList className="command-list">
          {searchQuery.length > 0 && (
            <CommandGroup heading={t('search')} className="border-b">
              <CommandItem
                onSelect={() =>
                  forwardToRoute(`/search?query=${formattedQuery}`)
                }
              >
                <Search className="h-4 w-4" />
                {searchQuery}
              </CommandItem>
            </CommandGroup>
          )}

          {filteredProducts && (
            <CommandGroup heading={t('products')}>
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
          )}

          {isLoadingProducts && (
            <div className="px-3 py-2">
              <div className="p-2">
                <Skeleton className="h-1.5 w-[80px]" />
              </div>
              {Array.from({ length: 5 }).map((_, i) => {
                return (
                  <div
                    key={i}
                    className="flex h-11 w-full items-center gap-3 px-2 py-1.5"
                  >
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-2 w-[200px]" />
                  </div>
                )
              })}
            </div>
          )}

          <CommandEmpty>{t('noProductsFound')}</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </>
  )
}
