'use client'

import { ArrowLeft, ArrowUp, Search, X } from 'lucide-react'
import { Button } from './ui/button'
import { SearchBar } from './search-bar'
import { useSearchBar } from '@/store/search-bar'
import { AnimatePresence, motion } from 'framer-motion'

export function MobileSearchBar() {
  const { isOpen, toggleSearchBar } = useSearchBar()

  return (
    <div className="md:hidden">
      <Button onClick={toggleSearchBar} size="icon" variant="outline">
        <Search className="h-5 w-5" />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0, transition: { duration: 0.2 } }}
            exit={{ y: '-100%' }}
            className="fixed inset-0 z-50 flex items-center gap-3 bg-background px-4"
          >
            <Button
              onClick={toggleSearchBar}
              className="flex-none"
              size="icon"
              variant="outline"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
