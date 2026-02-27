import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Shopping Bag',
  'Review the items in your Market Street shopping bag before checkout.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
