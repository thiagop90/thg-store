'use client'

import type { Category } from '@prisma/client'
import { MobileCategoryFilter } from './filters/mobile-category-filter'
import { MobileSortingFilter } from './filters/mobile-sorting-filter'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type NavbarMobileProps = {
  categories: Category[]
}

export function NavbarMobile({ categories }: NavbarMobileProps) {
  const [showGradient, setShowGradient] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer')

      if (!footer) return

      const footerTop = footer.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (footerTop <= windowHeight + 100) {
        setShowGradient(false)
      } else {
        setShowGradient(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showGradient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-x-0 bottom-0 z-40 h-20 w-full bg-popover to-transparent backdrop-blur-lg animate-in fade-in-100 [-webkit-mask-image:linear-gradient(to_top,black,transparent)] lg:hidden"
          ></motion.div>
        )}
      </AnimatePresence>

      <div className="sticky bottom-2 z-50 mx-auto flex w-full  max-w-[440px] items-end gap-4 rounded-2xl border bg-background/90 p-4 backdrop-blur-lg duration-300 animate-in slide-in-from-bottom [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] lg:hidden">
        <MobileCategoryFilter categories={categories} />
        <MobileSortingFilter />
      </div>
    </>
  )
}
