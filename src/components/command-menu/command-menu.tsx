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
import {
  HeadphonesIcon,
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  Search,
  SpeakerIcon,
  SquareIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useGetProducts } from '@/hooks/use-get-products'
import { useGetCategories } from '@/hooks/use-get-categories'

function getCategoryIcon(slug: string) {
  switch (slug) {
    case 'keyboards':
      return <KeyboardIcon />
    case 'monitors':
      return <MonitorIcon />
    case 'mouses':
      return <MouseIcon />
    case 'headsets':
      return <HeadphonesIcon />
    case 'speakers':
      return <SpeakerIcon />
    case 'mousepads':
      return <SquareIcon />
    default:
      return null
  }
}

type Groups = Array<{
  heading: string
  actions: Array<{
    name: string
    onSelect: () => void | Promise<void | boolean>
  }>
}>

export function CommandMenuDialog() {
  const router = useRouter()
  const { showCommandMenu, setShowCommandMenu } = useCommandMenu()

  const [searchQuery, setSearchQuery] = useState('')
  const { filteredProducts, isLoadingProducts } = useGetProducts(searchQuery)
  const { filteredCategories, isLoadingCategories } =
    useGetCategories(searchQuery)
  const isLoading = isLoadingProducts || isLoadingCategories
  const noResults =
    filteredProducts.length === 0 && filteredCategories.length === 0

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

  const groups: Groups = [
    {
      heading: 'Suggestions',
      actions: [
        {
          name: 'Keyboards',
          onSelect: () => forwardToRoute('/search/keyboards'),
        },
        {
          name: 'Razer Basilisk V3 Pro',
          onSelect: () => forwardToRoute('/product/razer-basilisk-v3-pro'),
        },
        {
          name: 'Logitech',
          onSelect: () => forwardToRoute('/search?query=logitech'),
        },
        {
          name: 'Edifier R1280T 2.0',
          onSelect: () => forwardToRoute('/product/edifier-r1280t-2-0'),
        },
        {
          name: 'Monitor 165 Hz',
          onSelect: () => forwardToRoute('/search?query=165 Hz'),
        },
      ],
    },
  ]

  return (
    <>
      <CommandTrigger />
      <CommandDialog open={showCommandMenu} onOpenChange={setShowCommandMenu}>
        <CommandInput
          placeholder="Search for products..."
          value={searchQuery}
          onValueChange={(value) => setSearchQuery(value)}
        />

        <CommandList className="command-list">
          {!searchQuery && (
            <>
              {groups.map((group) => (
                <CommandGroup key={group.heading} heading={group.heading}>
                  {group.actions.map((action) => (
                    <CommandItem key={action.name} onSelect={action.onSelect}>
                      <Search className="h-4 w-4" />
                      {action.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </>
          )}

          {searchQuery && (
            <CommandGroup heading="Search">
              <CommandItem
                onSelect={() => forwardToRoute(`/search?query=${searchQuery}`)}
              >
                <Search className="h-4 w-4" />
                {searchQuery}
              </CommandItem>
            </CommandGroup>
          )}

          {filteredCategories.length !== 0 && (
            <CommandGroup heading="Categories" className="border-t">
              {filteredCategories.map((category) => (
                <CommandItem
                  key={category.id}
                  onSelect={() => forwardToRoute(`/search/${category.slug}`)}
                >
                  {/* {getCategoryIcon(category.slug)} */}
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredProducts.length !== 0 && (
            <CommandGroup heading="Products" className="border-t">
              {filteredProducts.map((product) => (
                <CommandItem
                  key={product.id}
                  onSelect={() => forwardToRoute(`/product/${product.slug}`)}
                >
                  {/* {getCategoryIcon(product.category.slug)} */}
                  {product.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {isLoading && (
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

          {!isLoading && noResults && searchQuery && (
            <p className="py-6 text-center text-sm text-foreground">
              No results found.
            </p>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
