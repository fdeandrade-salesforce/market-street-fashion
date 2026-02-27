import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Contact Us',
  'Get in touch with Market Street. We\'re here to help with orders, returns, and any questions.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
