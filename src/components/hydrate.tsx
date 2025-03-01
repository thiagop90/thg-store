'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Icons } from './icons'

export function Hydrate({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <>{children}</>
  ) : (
    <Button variant="outline" size="icon">
      <Icons.spinner />
    </Button>
  )
}
