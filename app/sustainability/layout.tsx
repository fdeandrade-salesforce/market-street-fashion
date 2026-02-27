import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Sustainability',
  'Discover Market Street\'s commitment to sustainable fashion and responsible design practices.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
