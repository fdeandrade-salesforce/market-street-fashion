import React from 'react'
import Navigation from '../../components/Navigation'
import ProductListingPage from '../../components/ProductListingPage'
import Footer from '../../components/Footer'
import { getSaleProducts } from '../../lib/products'

import AnnouncementBar from '../../components/AnnouncementBar'
import PromoBanner from '../../components/PromoBanner'

export default function SalePage() {
  const products = getSaleProducts()

  const contentSlots = {
    aboveGrid: (
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-brand-black mb-4 tracking-tight">
          Sale
        </h2>
        <p className="text-base text-brand-gray-700 leading-relaxed">
          Discover incredible savings on selected styles. Limited quantities available.
        </p>
      </div>
    ),
    withinGrid: [
      {
        position: 5,
        columns: 'full' as const,
        content: (
          <PromoBanner
            title="Up to 50% Off Selected Styles"
            subtitle="Limited Time Only"
            ctaText="Shop Sale"
            variant="gradient"
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
        category="Sale"
        headerImage="/resources/support images/Banner After Hours Sem Texto.png"
        contentSlots={contentSlots}
      />
      <Footer />
    </div>
  )
}
