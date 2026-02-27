'use client'

import React, { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation'
import ProductListingPage from '../../components/ProductListingPage'
import Footer from '../../components/Footer'
import { getAllProducts } from '../../lib/products'
import { Product } from '../../components/ProductListingPage'
import { getProductImageUrl } from '../../src/data/mock/products'

export default function PremiumPage() {
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
    const loadProducts = async () => {
      const allProds = await getAllProducts()
      const premiumProducts = allProds.filter(p => p.category === 'Premium')
      setProducts(premiumProducts)
    }
    loadProducts()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <ProductListingPage 
        products={products} 
        category="Premium"
        headerImage={getProductImageUrl('wool-blend-overcoat-camel', 2)}
      />
      <Footer />
    </div>
  )
}

