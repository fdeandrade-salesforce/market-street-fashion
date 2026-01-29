import React from 'react'
import Navigation from '../../components/Navigation'
import AnnouncementBar from '../../components/AnnouncementBar'
import ProductListingPage from '../../components/ProductListingPage'
import Footer from '../../components/Footer'
import { getProductsBySubcategory } from '../../lib/products'

import PromoBanner from '../../components/PromoBanner'
import EditorialCard from '../../components/EditorialCard'

export default function MenPage() {
  const products = getProductsBySubcategory('Men')

  const contentSlots = {
    withinGrid: [
      {
        position: 5,
        columns: 'full' as const,
        content: (
          <PromoBanner
            title="New Arrivals"
            subtitle="Latest Styles for Men"
            ctaText="Shop New In"
            ctaLink="/men/new-in"
            variant="gradient"
          />
        ),
      },
      {
        position: 9,
        columns: 2 as const,
        content: (
          <EditorialCard
            title="The Essentials"
            subtitle="Wardrobe Staples"
            description="Classic pieces that form the foundation of a versatile men's wardrobe."
            image="/resources/support images/Zara Commercial Frame.png"
            ctaText="Shop Essentials"
            ctaLink="/men?filter=essentials"
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
        category="Men" 
        description="Modern menswear designed for real life. From sharp tailoring to casual essentials, discover pieces that elevate your everyday style."
        contentSlots={contentSlots} 
      />
      <Footer />
    </div>
  )
}

