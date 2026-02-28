import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Shop',
    template: '%s | Market Street',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
