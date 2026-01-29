'use client'

import React from 'react'
import Navigation from '../../components/Navigation'
import AnnouncementBar from '../../components/AnnouncementBar'
import ProductListingPage from '../../components/ProductListingPage'
import Footer from '../../components/Footer'
import PromoBanner from '../../components/PromoBanner'
import EditorialCard from '../../components/EditorialCard'
import { getProductsBySubcategory } from '../../lib/products'

export default function KidsPage() {
  const products = getProductsBySubcategory('Kids')

  const contentSlots = {
    withinGrid: [
      {
        position: 5,
        columns: 'full' as const,
        content: (
          <PromoBanner
            title="New Arrivals for Kids"
            subtitle="Fresh Styles for Little Ones"
            ctaText="Shop New In"
            ctaLink="/kids?filter=new"
            variant="gradient"
          />
        ),
      },
      {
        position: 9,
        columns: 2 as const,
        content: (
          <EditorialCard
            title="Girls Collection"
            subtitle="Style & Comfort"
            description="Beautiful pieces designed for active, growing girls."
            image="/resources/support images/Filmagem Fashion Praia 1.png"
            ctaText="Shop Girls"
            ctaLink="/kids/girls"
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
        category="Kids" 
        description="Playful, practical, and built to last. Our kids' collection combines comfort and style for growing children who love to explore."
        contentSlots={contentSlots} 
      />
      <Footer />
    </div>
  )
}
