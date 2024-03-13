'use client'

import { Input } from './ui/input'
import { Search, X } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearchBar } from '@/store/search-bar'
import { Button } from './ui/button'

export function SearchBar() {
  const { isOpen, toggleSearchBar } = useSearchBar()
  const search = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(search?.get('query') || null)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    } else {
      inputRef.current?.blur()
    }
  }, [isOpen])

  function onSearch(event: FormEvent) {
    event.preventDefault()

    const encodedSearchQuery = encodeURI(searchQuery || '')
    if (searchQuery) {
      router.push(`/search?query=${encodedSearchQuery}`)
    } else {
      router.push('/search')
    }
    inputRef.current?.blur()
    toggleSearchBar()
  }

  function clearSearchQuery() {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <form
      onSubmit={onSearch}
      className="flex h-10 w-full items-center overflow-hidden rounded-lg border bg-background transition-all duration-300 md:max-w-[550px]"
    >
      <div className="flex flex-1 items-center">
        <button
          type="submit"
          className="flex h-10 w-10 shrink-0 items-center justify-center"
        >
          <Search className="h-5 w-5" />
        </button>
        <Input
          type="text"
          autoCorrect="off"
          spellCheck={false}
          value={searchQuery || ''}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search for products..."
          className="border-0 bg-transparent pl-0"
          ref={inputRef}
        />
        {searchQuery && (
          <Button
            size="icon"
            variant="outline"
            className="mr-2 h-6 w-6  p-1"
            onClick={clearSearchQuery}
          >
            <X className="h-4 w-4 flex-none text-primary" strokeWidth="2.25" />
          </Button>
        )}
      </div>
    </form>
  )
}
