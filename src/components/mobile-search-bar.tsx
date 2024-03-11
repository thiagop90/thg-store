'use client'

import { Search, X } from 'lucide-react'
import { Button } from './ui/button'
import { SearchBar } from './search-bar'
import { useSearchBar } from '@/store/search-bar'

export function MobileSearchBar() {
  const { isOpen, toggleSearchBar } = useSearchBar()

  return (
    <div className="md:hidden">
      <Button onClick={toggleSearchBar} size="icon" variant="outline">
        <Search className="h-5 w-5" />
      </Button>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex h-16 items-center gap-3 bg-background px-4">
          <Button
            onClick={toggleSearchBar}
            className="flex-none"
            size="icon"
            variant="outline"
          >
            <X className="h-5 w-5" />
          </Button>
          <SearchBar />
        </div>
      )}
    </div>
  )
}
