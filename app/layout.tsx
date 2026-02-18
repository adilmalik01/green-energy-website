import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import AuthProvider from '@/components/providers/auth-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Green Energy Pakistan | Solar Solutions',
  description:
    'Leading solar energy and renewable solutions provider in Pakistan. Premium quality products and professional installation services.',
  keywords: 'solar energy, renewable energy, solar panels, Pakistan',
  authors: [{ name: 'Green Energy Pakistan' }],
  openGraph: {
    title: 'Green Energy Pakistan | Solar Solutions',
    description: 'Leading solar energy solutions provider',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#66a31f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Navbar />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  )
}
