import type { Metadata } from 'next'
import Script from 'next/script'
import { Sen } from 'next/font/google'
import './globals.css'
import TrackingConsentBanner from '../components/TrackingConsentBanner'

// Load Sen font
const sen = Sen({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sen',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Market Street | The React PWA Starter Store for Retail',
  description: 'Discover the latest trends in fashion and retail. Shop the new season collection at Market Street.',
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
        {children}
        <TrackingConsentBanner />
      </body>
    </html>
  )
}

