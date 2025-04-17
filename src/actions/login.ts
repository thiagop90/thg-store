'use server'

import { signIn } from '@/auth'
import type { OAuthProviderType } from 'next-auth/providers'

export type AllowedProviders = Extract<OAuthProviderType, 'google' | 'github'>

export async function handleLoginSocial(provider: AllowedProviders) {
  await signIn(provider)
}
