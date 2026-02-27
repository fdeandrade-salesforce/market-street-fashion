import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Accessibility',
  'Market Street is committed to making our website accessible to everyone. Learn about our accessibility efforts.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
