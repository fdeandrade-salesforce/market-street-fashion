import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Careers',
  'Join the Market Street team. Explore open positions and build your career in modern retail.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
