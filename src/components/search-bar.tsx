'use client'

import { Input } from './ui/input'
import { Search, X } from 'lucide-react'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearchBar } from '@/store/search-bar'

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

  const onSearch = (event: FormEvent) => {
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
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-5 w-5 text-primary" strokeWidth="2.25" />
          </button>
        )}
      </div>
    </form>
  )
}
