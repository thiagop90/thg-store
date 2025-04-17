'use client'

import { type AllowedProviders } from '@/actions/login'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

interface SocialLoginButtonProps {
  provider: AllowedProviders
  isLoading: boolean
  onLoginClick: (provider: AllowedProviders) => Promise<void>
}

export function SocialLoginButton({
  provider,
  isLoading,
  onLoginClick,
}: SocialLoginButtonProps) {
  const t = useTranslations('Profile')

  async function handleClick() {
    await onLoginClick(provider)
  }

  const Icon = Icons[provider as keyof typeof Icons]

  return (
    <Button
      variant="secondary"
      className="h-14 w-full border border-neutral-700 p-4 transition duration-200"
      onClick={handleClick}
      disabled={isLoading}
    >
      {Icon && <Icon />}
      <div>
        {t('continueWith')} <span className="capitalize">{provider}</span>
      </div>
    </Button>
  )
}
