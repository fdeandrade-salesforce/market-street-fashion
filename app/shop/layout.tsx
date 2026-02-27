import type { Metadata } from 'next'
import { categoryMeta } from '../../lib/metadata'

export const metadata: Metadata = categoryMeta('Shop')

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
