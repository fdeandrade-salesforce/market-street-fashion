import type { Metadata } from 'next'
import { getProductById } from '../../../lib/products'
import ProductPageClient from './ProductPageClient'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductById(params.id)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.name,
    description: product.description || `Shop ${product.name} at Market Street.`,
  }
}

export default function ProductPage() {
  return <ProductPageClient />
}
