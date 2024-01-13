'use client'

import { ReactNode, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

export function Hydrate({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <>{children}</>
  ) : (
    <Button variant="outline" size="icon">
      <Loader className="h-5 w-5 animate-spin" />
    </Button>
  )
}
