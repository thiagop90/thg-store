import { Barlow } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { QueryWrapper } from './query-wrapper'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import type { Metadata, Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'
import { getSession } from '@/actions/auth'

const barlowFont = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'THG Store',
    template: '%s |  THG Store',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [locale, messages, session] = await Promise.all([
    getLocale(),
    getMessages(),
    getSession(),
  ])

  return (
    <html lang={locale}>
      <body className={barlowFont.className}>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
            <QueryWrapper>
              <Header />
              <main className="-mb-px h-full min-h-[calc(100dvh-11.25rem)] px-4 md:px-6">
                {children}
              </main>
              <Footer />
            </QueryWrapper>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
