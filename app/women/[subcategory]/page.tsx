'use client'

import React, { useEffect, useState } from 'react'
import Navigation from '../../../components/Navigation'
import AnnouncementBar from '../../../components/AnnouncementBar'
import ProductListingPage from '../../../components/ProductListingPage'
import Footer from '../../../components/Footer'
import { getProductsBySubcategory } from '../../../lib/products'
import { Product } from '../../../components/ProductListingPage'

interface PageProps {
  params: {
    subcategory: string
  }
}

export default function WomenSubcategoryPage({ params }: PageProps) {
  const subcategory = params.subcategory
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
    const loadProducts = async () => {
      const subcategoryProducts = await getProductsBySubcategory('Women', subcategory)
      setProducts(subcategoryProducts)
    }
    loadProducts()
  }, [subcategory])

  // Convert URL slug to display name (e.g. new-in -> New In, jackets-blazers -> Jackets & Blazers)
  const slugToDisplay: Record<string, string> = {
    'new-in': 'New In',
    'jackets-blazers': 'Jackets & Blazers',
    't-shirts': 'T-Shirts',
  }
  const formattedSubcategory =
    slugToDisplay[subcategory.toLowerCase()] ??
    subcategory
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ')

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navigation />
      <ProductListingPage
        products={products}
        category="Women"
        subcategory={formattedSubcategory}
      />
      <Footer />
    </div>
  )
}

