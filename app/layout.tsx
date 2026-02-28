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
    default: 'Market Street | Fashion & Retail',
    template: '%s | Market Street',
  },
  description:
    'Discover the latest trends in fashion and retail. Shop the new season collection at Market Street.',
  keywords: ['fashion', 'clothing', 'women', 'men', 'kids', 'retail'],
  authors: [{ name: 'Market Street' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Market Street',
    title: 'Market Street | Fashion & Retail',
    description:
      'Discover the latest trends in fashion and retail. Shop the new season collection at Market Street.',
    images: [
      {
        url: '/images/hero/hero-main.png',
        width: 1024,
        height: 1024,
        alt: 'Market Street — Fashion and retail for modern living',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Market Street | Fashion & Retail',
    description: 'Discover the latest trends in fashion and retail.',
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

