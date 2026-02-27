import type { Metadata } from 'next'
import { staticPageMeta } from '../../lib/metadata'

export const metadata: Metadata = staticPageMeta(
  'Terms & Conditions',
  'Read the Market Street terms and conditions governing your use of our website and services.'
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
