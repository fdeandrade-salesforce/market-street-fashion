import type { Metadata } from 'next'
import { subcategoryMeta } from '../../../lib/metadata'

interface Props {
  params: { subcategory: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return subcategoryMeta('Shop', params.subcategory)
}

export default function Layout({ children }: Props) {
  return children
}
