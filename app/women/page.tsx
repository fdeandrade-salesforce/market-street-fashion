'use client'

import React from 'react'
import Navigation from '../../components/Navigation'
import AnnouncementBar from '../../components/AnnouncementBar'
import ProductListingPage from '../../components/ProductListingPage'
import Footer from '../../components/Footer'
import PromoBanner from '../../components/PromoBanner'
import EditorialCard from '../../components/EditorialCard'
import { getProductsBySubcategory } from '../../lib/products'

export default function WomenPage() {
  const products = getProductsBySubcategory('Women')

  // Content blocks to insert in the product grid
  const contentSlots = {
    withinGrid: [
      {
        position: 5, // After 4 products (complete first row)
        columns: 'full' as const,
        content: (
          <PromoBanner
            title="New Season Arrivals"
            subtitle="Shop the Latest Trends"
            ctaText="Shop New In"
            ctaLink="/women/new-in"
            variant="gradient"
          />
        ),
      },
      {
        position: 9, // After 8 products (complete second row) - normalized to 9
        columns: 2 as const,
        content: (
          <EditorialCard
            title="The Essentials"
            subtitle="Wardrobe Foundations"
            description="Building blocks for a versatile wardrobe. Classic pieces that work for every occasion."
            image="/resources/support images/Banner Armario Moderno Sem Texto.png"
            ctaText="Shop Essentials"
            ctaLink="/women?filter=essentials"
            variant="image-background"
          />
        ),
      },
      {
        position: 17, // After 16 products (complete fourth row) - normalized to 17
        columns: 'full' as const,
        content: (
          <PromoBanner
            title="Free Shipping on Orders Over $50"
            subtitle="Shop Now"
            ctaText="Explore Collection"
            variant="primary"
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
        category="Women"
        description="Discover timeless pieces designed for the modern woman. From everyday essentials to statement pieces, our collection celebrates versatility, quality, and effortless style."
        contentSlots={contentSlots}
      />
      <Footer />
    </div>
  )
}

