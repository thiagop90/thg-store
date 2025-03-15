'use client'

import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  function toggleVisibility() {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -42 }}
            animate={{ y: 0 }}
            exit={{ y: -42, opacity: 0 }}
            className="fixed inset-x-0 top-[4.5rem] z-40 flex"
          >
            <Button
              onClick={scrollToTop}
              className="mx-auto w-auto"
              aria-label="Rolar para o topo"
              size="sm"
              variant="outline"
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Rolar para o topo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
