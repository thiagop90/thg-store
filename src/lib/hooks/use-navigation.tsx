'use client'

import { useState, useOptimistic, startTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type NavigationState = {
  pathname: string
  sort: string
}

export function useNavigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || ''
  const router = useRouter()
  const [pendingPath, setPendingPath] = useState<string | null>(null)

  const [optimisticState, setOptimisticState] = useOptimistic(
    { pathname, sort: currentSort },
    (_, newState: NavigationState) => newState,
  )

  function handleNavigate(path: string, redirect = true) {
    if (pendingPath) return
    setPendingPath(path)

    const [pathnameOnly, queryString] = path.split('?')
    const sort = queryString?.includes('sort=')
      ? queryString.split('sort=')[1]?.split('&')[0] || ''
      : ''

    if (redirect) {
      startTransition(() =>
        setOptimisticState({ pathname: pathnameOnly, sort }),
      )
      router.push(path)
    }
  }

  return {
    pendingPath,
    setPendingPath,
    optimisticState,
    handleNavigate,
    pathname,
  }
}
