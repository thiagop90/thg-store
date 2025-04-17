'use client'

import { useState } from 'react'
import { SocialLoginButton } from './social-login-button'
import { handleLoginSocial, type AllowedProviders } from '@/actions/login'

export const providers: AllowedProviders[] = ['google', 'github']

export function SocialLoginContainer() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleLoginClick(provider: AllowedProviders) {
    setIsLoading(true)
    await handleLoginSocial(provider)
  }

  return (
    <div className="space-y-3">
      {providers.map((provider, idx) => (
        <SocialLoginButton
          key={idx}
          provider={provider}
          isLoading={isLoading}
          onLoginClick={handleLoginClick}
        />
      ))}
    </div>
  )
}
