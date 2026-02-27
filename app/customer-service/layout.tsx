import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Customer Service',
  'Need help? Market Street customer service is here to assist with orders, shipping, returns, and more.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
