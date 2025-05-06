'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { Search, SearchIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchAllProducts } from '@/actions/products'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { categoryIcons } from '@/helpers/category-icons'
import type { CategorySlug } from '@/@types/category'
import { Separator } from '../ui/separator'

export function SearchCommandMenu() {
  const t = useTranslations('SearchPage')
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const formattedQuery = searchQuery.replace(/\s+/g, '+')

  const { data: filteredProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
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
        <Command
          filter={(value, search) => {
            if (value === 'search-query') return 1
            return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }}
        >
          <CommandInput
            id="searchQuery"
            placeholder={t('searchProducts')}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />

          <CommandList className="command-list">
            {searchQuery.length > 0 && (
              <CommandGroup heading={t('search')}>
                <CommandItem
                  value="search-query"
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
                {filteredProducts?.map((product) => {
                  const Icon =
                    categoryIcons[product.category.slug as CategorySlug]

                  return (
                    <CommandItem
                      key={product.id}
                      onSelect={() =>
                        forwardToRoute(`/product/${product.slug}`)
                      }
                    >
                      <Icon className="h-4 w-4" strokeWidth="1.75" />
                      {product.name}
                    </CommandItem>
                  )
                })}
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

            {!isLoadingProducts && (
              <CommandEmpty>{t('noProductsFound')}</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
