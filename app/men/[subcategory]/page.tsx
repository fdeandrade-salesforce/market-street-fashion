import React from 'react'
import Navigation from '../../../components/Navigation'
import AnnouncementBar from '../../../components/AnnouncementBar'
import ProductListingPage from '../../../components/ProductListingPage'
import Footer from '../../../components/Footer'
import { getProductsBySubcategory } from '../../../lib/products'

interface PageProps {
  params: {
    subcategory: string
  }
}

export default function MenSubcategoryPage({ params }: PageProps) {
  const subcategory = params.subcategory
  const products = getProductsBySubcategory('Men', subcategory)

  // Capitalize first letter of subcategory and handle special cases
  const formattedSubcategory = subcategory
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navigation />
      <ProductListingPage
        products={products}
        category="Men"
        subcategory={formattedSubcategory}
      />
      <Footer />
    </div>
  )
}
