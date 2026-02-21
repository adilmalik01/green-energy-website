import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, Inter } from 'next/font/google'

import './globals.css'
import AuthProvider from '@/components/providers/auth-provider'
import LayoutWrapper from '@/components/LayoutWrapper'

const inter = Inter({ subsets: ['latin'], variable: '--font-mono' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});
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
        className={`${inter.variable} ${cormorant.variable} ${dmSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}