import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Privacy Choices',
  'Manage your privacy preferences and data choices at Market Street.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
