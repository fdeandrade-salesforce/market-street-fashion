import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Payment Methods',
  'View accepted payment methods at Market Street — credit cards, PayPal, Apple Pay, and more.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
