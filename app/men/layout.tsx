import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Men',
    template: '%s | Market Street',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
