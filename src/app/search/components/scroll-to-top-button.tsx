'use client'

import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'

export function ScrollToTopButton() {
  const t = useTranslations('SearchPage')

  const ref = useRef(null)
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
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ y: -42 }}
            animate={{ y: 0 }}
            exit={{ y: -42, opacity: 0 }}
            className="sticky top-[4.5rem] z-40 flex"
          >
            <Button
              ref={ref}
              onClick={scrollToTop}
              className="mx-auto w-auto hover:bg-background md:hover:bg-accent"
              aria-label="Rolar para o topo"
              size="sm"
              variant="outline"
            >
              <ArrowUp className="h-4 w-4" />
              {t('scrollToTop')}
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
