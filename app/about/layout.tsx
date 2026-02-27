import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'About Us',
  'Learn about Market Street — our story, values, and commitment to thoughtful design for everyday living.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
