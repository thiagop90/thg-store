import { Barlow } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { AuthProvider } from '@/app/provider-auth'
import { Footer } from '@/components/footer'
import { QueryWrapper } from './query-wrapper'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

const barlowFont = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: {
    default: 'THG Store',
    template: '%s |  THG Store',
  },
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={barlowFont.className}>
        <NextIntlClientProvider messages={messages}>
          <QueryWrapper>
            <AuthProvider>
              <Header />
              <main className="h-full min-h-[100dvh] px-4">{children}</main>
              <Footer />
            </AuthProvider>
          </QueryWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
