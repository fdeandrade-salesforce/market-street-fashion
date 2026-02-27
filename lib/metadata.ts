import type { Metadata } from 'next'

const SITE_NAME = 'Market Street'
const DEFAULT_DESCRIPTION = 'Shop curated collections of contemporary fashion, home decor, and accessories at Market Street.'

const SLUG_OVERRIDES: Record<string, string> = {
  'new-in': 'New In',
  'jackets-blazers': 'Jackets & Blazers',
  't-shirts': 'T-Shirts',
  'co-ords': 'Co-ords',
  'mini-dresses': 'Mini Dresses',
  'midi-dresses': 'Midi Dresses',
  'maxi-dresses': 'Maxi Dresses',
}

export function slugToTitle(slug: string): string {
  if (SLUG_OVERRIDES[slug.toLowerCase()]) {
    return SLUG_OVERRIDES[slug.toLowerCase()]
  }
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export function categoryMeta(
  category: string,
  opts?: { description?: string }
): Metadata {
  const descriptions: Record<string, string> = {
    Women: "Shop women's fashion — dresses, tops, outerwear, and accessories designed for modern living.",
    Men: "Shop men's fashion — tailored essentials, casual wear, and accessories for every occasion.",
    Kids: "Shop kids' fashion — playful, durable, and comfortable clothing for every age.",
    Shop: 'Browse the full Market Street collection — fashion, home, and accessories all in one place.',
    Sale: 'Shop sale items at Market Street. Limited-time offers on fashion, home decor, and accessories.',
    'New Releases': 'Discover the latest arrivals at Market Street. Be the first to shop new collections.',
    Accessories: 'Complete your look with Market Street accessories — bags, jewellery, scarves, and more.',
    Premium: 'Explore the Market Street Premium collection — elevated materials, refined craftsmanship.',
    Modular: 'Build your space with the Market Street Modular collection — flexible, functional design pieces.',
  }

  return {
    title: `${category} Collection`,
    description: opts?.description || descriptions[category] || DEFAULT_DESCRIPTION,
  }
}

export function subcategoryMeta(
  category: string,
  subcategorySlug: string
): Metadata {
  const subcategory = slugToTitle(subcategorySlug)
  const possessive = category === 'Kids' ? "Kids'" : `${category}'s`

  return {
    title: `${possessive} ${subcategory}`,
    description: `Shop ${possessive} ${subcategory} at Market Street. Curated pieces designed for modern living.`,
  }
}

export function staticPageMeta(
  title: string,
  description: string
): Metadata {
  return { title, description }
}
