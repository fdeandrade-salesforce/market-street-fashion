import type { Metadata } from 'next'

type Props = {
  params: { orderNumber: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Order #${params.orderNumber}`,
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
