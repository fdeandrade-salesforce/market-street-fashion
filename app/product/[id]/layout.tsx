import type { Metadata } from 'next'
import { getProductById } from '../../../lib/products'

interface Props {
  params: { id: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  const title = product.color
    ? `${product.name} — ${product.color}`
    : product.name

  const description =
    product.description?.slice(0, 160) ||
    `Shop ${product.name} at Market Street. ${product.category} collection.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Market Street`,
      description,
      images: product.images?.[0]
        ? [{ url: product.images[0], alt: product.name }]
        : undefined,
    },
  }
}

export default function ProductLayout({ children }: Props) {
  return children
}
