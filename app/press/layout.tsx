import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Press',
  'Market Street press resources, media inquiries, and latest brand news.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
