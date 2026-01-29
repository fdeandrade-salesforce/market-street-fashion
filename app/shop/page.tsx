'use client'

import React from 'react'
import Navigation from '../../components/Navigation'
import ProductListingPage from '../../components/ProductListingPage'
import Footer from '../../components/Footer'
import PromoBanner from '../../components/PromoBanner'
import EditorialCard from '../../components/EditorialCard'
import { getAllProducts } from '../../lib/products'

export default function ShopPage() {
  const products = getAllProducts()

  // Example content blocks to insert in the product grid
  const contentSlots = {
    withinGrid: [
      {
        position: 5, // After 4 products
        columns: 'full' as const,
        content: (
          <PromoBanner
            title="Save up to 40% on Selected Premium Styles"
            subtitle="Limited Time Offer"
            ctaText="Shop Sale"
            variant="gradient"
          />
        ),
      },
      {
        position: 13, // After 12 products (complete third row)
        columns: 2 as const,
        content: (
          <EditorialCard
            title="Heritage Line"
            subtitle="Exclusive Collection"
            description="Timeless sophistication meets modern craftsmanship"
            image="/resources/support images/Zara Prada Frame 2.png"
            ctaText="Shop Now"
            variant="image-background"
          />
        ),
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <ProductListingPage 
        products={products} 
        category="Shop"
        headerImage="/resources/support images/Zara Prada Frame 3.png"
        contentSlots={contentSlots}
      />
      <Footer />
    </div>
  )
}

