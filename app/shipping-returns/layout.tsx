import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Shipping & Returns',
  'Free shipping, easy returns. Learn about Market Street delivery options and return policies.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
