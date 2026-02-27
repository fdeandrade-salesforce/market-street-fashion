import type { Metadata } from 'next'

interface Props {
  params: { orderNumber: string }
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Order #${params.orderNumber}`,
    description: `View details for order #${params.orderNumber} at Market Street.`,
  }
}

export default function Layout({ children }: Props) {
  return children
}
