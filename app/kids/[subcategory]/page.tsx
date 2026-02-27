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

export default function KidsSubcategoryPage({ params }: PageProps) {
  const subcategory = params.subcategory
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      const subcategoryProducts = await getProductsBySubcategory('Kids', subcategory)
      setProducts(subcategoryProducts)
    }
    loadProducts()
  }, [subcategory])

  // Convert URL slug to display name (e.g. girls -> Girls, boys -> Boys)
  const formattedSubcategory =
    subcategory.charAt(0).toUpperCase() + subcategory.slice(1).toLowerCase()

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navigation />
      <ProductListingPage
        products={products}
        category="Kids"
        subcategory={formattedSubcategory}
      />
      <Footer />
    </div>
  )
}
