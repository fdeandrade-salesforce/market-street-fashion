import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Size Guide',
  'Find your perfect fit with the Market Street size guide. Measurements for women, men, and kids.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
