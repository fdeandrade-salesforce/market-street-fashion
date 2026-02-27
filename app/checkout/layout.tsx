import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Checkout',
  'Complete your Market Street order. Secure checkout with multiple payment options.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
