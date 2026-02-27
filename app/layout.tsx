import type { Metadata } from 'next'
import Script from 'next/script'
import { Sen } from 'next/font/google'
import './globals.css'
import TrackingConsentBanner from '../components/TrackingConsentBanner'
import { AgentProvider } from '../context/AgentContext'
import AgentLayoutWrapper from '../components/AgentLayoutWrapper'
import CssDiagnostics from '../components/CssDiagnostics'

const sen = Sen({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sen',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : process.env.VERCEL_URL
      ? new URL(`https://${process.env.VERCEL_URL}`)
      : undefined,
  title: {
    default: 'Market Street | Modern Design for Everyday Living',
    template: '%s | Market Street',
  },
  description:
    'Shop curated collections of contemporary fashion, home decor, and accessories. Thoughtfully designed pieces for modern living at Market Street.',
  keywords: ['fashion', 'home decor', 'accessories', 'contemporary design', 'women', 'men', 'kids', 'modern living'],
  authors: [{ name: 'Market Street' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Market Street',
    title: 'Market Street | Modern Design for Everyday Living',
    description:
      'Shop curated collections of contemporary fashion, home decor, and accessories. Thoughtfully designed pieces for modern living at Market Street.',
    images: [
      {
        url: '/images/hero/hero-main.png',
        width: 1024,
        height: 1024,
        alt: 'Market Street — Modern design for everyday living',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Market Street | Modern Design for Everyday Living',
    description: 'Shop curated collections of contemporary fashion, home decor, and accessories at Market Street.',
    images: ['/images/hero/hero-main.png'],
  },
  robots: {
    index: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sen.variable}>
      <body>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
          strategy="lazyOnload"
        />
        <AgentProvider>
          <CssDiagnostics />
          <AgentLayoutWrapper>
            {children}
            <TrackingConsentBanner />
          </AgentLayoutWrapper>
        </AgentProvider>
      </body>
    </html>
  )
}

