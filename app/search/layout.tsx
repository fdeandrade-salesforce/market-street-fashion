import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Search',
  'Search the Market Street collection — fashion, home decor, and accessories.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
