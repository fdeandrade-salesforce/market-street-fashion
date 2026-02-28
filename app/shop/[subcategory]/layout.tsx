import type { Metadata } from 'next'

type Props = {
  params: { subcategory: string }
}

function formatSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: formatSlug(params.subcategory),
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
