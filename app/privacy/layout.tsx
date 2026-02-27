import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Privacy Policy',
  'Learn how Market Street collects, uses, and protects your personal information.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
