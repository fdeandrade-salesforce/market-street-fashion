import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Maintenance',
  'Market Street is currently undergoing scheduled maintenance. We\'ll be back shortly.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
