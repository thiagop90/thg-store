'use client'

import { useLinkStatus } from 'next/link'
import { Icons } from './icons'

export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return pending ? (
    <Icons.loadingDots role="status" aria-label="Loading" />
  ) : null
}
