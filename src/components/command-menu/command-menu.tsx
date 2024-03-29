'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCommandMenu } from '@/store/command-menu'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command-menu-components'
import { CommandTrigger } from './command-trigger'
import { Skeleton } from '../ui/skeleton'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { getCategoryIcon } from './get-category-icon'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/actions/get-products'

export function CommandMenuDialog() {
  const router = useRouter()
  const { showCommandMenu, setShowCommandMenu } = useCommandMenu()

  const [searchQuery, setSearchQuery] = useState('')
  const { data: filteredProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setShowCommandMenu(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setShowCommandMenu])

  const forwardToRoute = useCallback(
    (slug: string) => {
      router.replace(slug)
      setSearchQuery('')
      setShowCommandMenu(false)
    },
    [router, setShowCommandMenu],
  )

  return (
    <>
      <CommandTrigger />
      <CommandDialog open={showCommandMenu} onOpenChange={setShowCommandMenu}>
        <CommandInput
          id="searchQuery"
          placeholder="Search for products..."
          value={searchQuery}
          onValueChange={(value) => setSearchQuery(value)}
        />

        <CommandList className="command-list">
          {searchQuery && (
            <CommandGroup heading="Search" className="border-b">
              <CommandItem
                onSelect={() => forwardToRoute(`/search?query=${searchQuery}`)}
              >
                <Search className="h-4 w-4" />
                {searchQuery}
              </CommandItem>
            </CommandGroup>
          )}

          {filteredProducts && (
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
          )}

          {isLoadingProducts && (
            <div className="px-2 py-1.5">
              <div className="px-2 py-1.5">
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

          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </>
  )
}
