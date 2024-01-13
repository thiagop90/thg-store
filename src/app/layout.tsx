import { Barlow } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { AuthProvider } from '@/app/provider-auth'
import { Footer } from '@/components/footer'
import { QueryWrapper } from './query-wrapper'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryWrapper>
        <AuthProvider>
          <body className={barlowFont.className}>
            <Header />
            <main className="h-full min-h-[100dvh] px-4">{children}</main>
            <Footer />
          </body>
        </AuthProvider>
      </QueryWrapper>
    </html>
  )
}
