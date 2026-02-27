import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'My Account',
  'Manage your Market Street account — orders, addresses, payment methods, and preferences.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
