'use client'

import React from 'react'
import Navigation from '../../components/Navigation'
import AnnouncementBar from '../../components/AnnouncementBar'
import ProductListingPage from '../../components/ProductListingPage'
import Footer from '../../components/Footer'
import PromoBanner from '../../components/PromoBanner'
import EditorialCard from '../../components/EditorialCard'
import { getProductsBySubcategory } from '../../lib/products'

export default function AccessoriesPage() {
  const products = getProductsBySubcategory('Accessories')

  // Content blocks to insert in the product grid
  const contentSlots = {
    withinGrid: [
      {
        position: 5, // After 4 products (complete first row)
        columns: 2 as const,
        content: (
          <EditorialCard
            title="Complete Your Look"
            subtitle="Styling Tips"
            description="Mix and match our accessories to create unique combinations that reflect your personal style."
            image="/resources/support images/Fashion Concept Minimalist Studio.png"
            ctaText="View Guide"
            variant="image-top"
          />
        ),
      },
      {
        position: 9, // After 8 products (complete second row) - normalized to 9
        columns: 'full' as const,
        content: (
          <PromoBanner
            title="Save up to 30% on Accessories"
            subtitle="Sale Event"
            ctaText="Shop Sale"
            variant="gradient"
          />
        ),
      },
      {
        position: 13, // After 12 products (complete third row) - normalized to 13
        columns: 2 as const,
        content: (
          <EditorialCard
            title="Statement Accessories"
            subtitle="Elevate Your Style"
            description="Discover bold accessories that add personality and sophistication to any outfit."
            image="/resources/support images/Zara Prada Frame 1.png"
            ctaText="Shop Accessories"
            variant="image-background"
          />
        ),
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navigation />
      <ProductListingPage 
        products={products} 
        category="Accessories"
        contentSlots={contentSlots}
      />
      <Footer />
    </div>
  )
}

