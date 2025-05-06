import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import { SocialLoginContainer } from './components/social-login-container'
import { getSession } from '@/actions/auth'

export default async function LoginPage() {
  const [session, t] = await Promise.all([
    getSession(),
    getTranslations('Profile'),
  ])

  const user = session?.user

  if (user) return redirect('/')

  return (
    <main className="mx-auto max-w-md pt-24">
      <div className="w-full space-y-5">
        <div className="space-y-0.5 text-center">
          <h2 className="text-xl font-medium">{t('hello')}!</h2>

          <p className="text-muted-foreground">
            {t('signinToContinueToPlatform')}
          </p>
        </div>

        <SocialLoginContainer />
      </div>
    </main>
  )
}
