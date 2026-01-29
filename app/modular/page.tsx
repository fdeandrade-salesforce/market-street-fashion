import React from 'react'
import Navigation from '../../components/Navigation'
import ProductListingPage from '../../components/ProductListingPage'
import Footer from '../../components/Footer'
import { getAllProducts } from '../../lib/products'

export default function ModularPage() {
  const allProducts = getAllProducts()
  const products = allProducts.filter(p => p.category === 'Modular')

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <ProductListingPage 
        products={products} 
        category="Modular"
        headerImage="/resources/support images/Fashion Concept Minimalist Studio.png"
      />
      <Footer />
    </div>
  )
}

