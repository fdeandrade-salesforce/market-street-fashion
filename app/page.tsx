'use client'

import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import AnnouncementBar from '../components/AnnouncementBar'
import Hero from '../components/Hero'
import ProductCarousel from '../components/ProductCarousel'
import ProductGrid from '../components/ProductGrid'
import PromoBannerGrid from '../components/PromoBannerGrid'
import ProductCategoriesGrid from '../components/ProductCategoriesGrid'
import Footer from '../components/Footer'
import QuickViewModal from '../components/QuickViewModal'
import NotifyMeModal from '../components/NotifyMeModal'
import { getFeaturedProducts, getNewArrivals, getAllProductsWithVariants } from '../lib/products'
import { Product } from '../components/ProductListingPage'
import { toggleWishlist, getWishlistIds } from '../lib/wishlist'
import { getRecentlyViewed, clearRecentlyViewed } from '../lib/recentlyViewed'
import { addToCart } from '../lib/cart'
import { getProductImageUrl } from '../src/data/mock/products'


export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [notifyMeProduct, setNotifyMeProduct] = useState<Product | null>(null)
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      const [featured, newArr, all] = await Promise.all([
        getFeaturedProducts(),
        getNewArrivals(20),
        getAllProductsWithVariants(),
      ])
      setFeaturedProducts(featured)
      setNewArrivals(newArr)
      setAllProducts(all)
    }
    loadProducts()
  }, [])

  // Load recently viewed on mount and when page becomes visible (e.g. returning from product page)
  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed())

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setRecentlyViewed(getRecentlyViewed())
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Load wishlist on mount and listen for updates
  useEffect(() => {
    setWishlistIds(getWishlistIds())
    
    const handleWishlistUpdate = (e: CustomEvent<Product[]>) => {
      setWishlistIds(e.detail.map((p) => p.id))
    }
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate as EventListener)
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate as EventListener)
  }, [])

  // Helper function to check if product has variants
  const hasVariants = (product: Product): boolean => {
    if (product.size && product.size.length > 1) return true
    if (product.colors && product.colors.length > 1) return true
    if (product.variants && product.variants > 0) return true
    return false
  }

  const handleAddToCart = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    addToCart(product, quantity, size, color)
  }

  const handleAddToCartSimple = (product: Product) => {
    addToCart(product, 1)
  }

  // Unified handler for Quick View/Quick Add
  const handleUnifiedAction = (product: Product) => {
    // Check if product is out of stock first
    if (!product.inStock) {
      setNotifyMeProduct(product)
      return
    }

    if (hasVariants(product)) {
      // Product has variants - open modal for variant selection
      setQuickViewProduct(product)
    } else {
      // No variants - add to cart directly
      handleAddToCartSimple(product)
    }
  }

  const handleNotifyMe = (email: string) => {
    console.log(`Notify ${email} when ${notifyMeProduct?.name} is available`)
  }

  const handleAddToWishlist = (product: Product, size?: string, color?: string) => {
    // Only pass size/color if they were explicitly selected (from QuickViewModal)
    const inWishlist = toggleWishlist(product, size, color, size || color ? 'pdp' : 'card')
    console.log(inWishlist ? 'Added to wishlist:' : 'Removed from wishlist:', product.id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navigation />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Featured Products */}
        <div className="layout-commerce">
          <ProductCarousel
            id="featured"
            title="Featured Collection"
            shopAllLink="/shop"
            products={featuredProducts}
            onUnifiedAction={handleUnifiedAction}
            onAddToWishlist={handleAddToWishlist}
            wishlistIds={wishlistIds}
            allProducts={allProducts}
          />
        </div>

        {/* Style for Real Life - Product Categories Carousel */}
        <ProductCategoriesGrid
          title="Style for Real Life"
          subtitle="At Market Street, we believe fashion should be effortless, authentic, and accessible. Our collections are designed for the modern individual who values quality, versatility, and timeless style."
          variant="category"
          cards={[
            {
              title: 'Women',
              image: getProductImageUrl('silk-midi-dress-navy', 1),
              link: '/women',
              description: 'Curated for her',
            },
            {
              title: 'Men',
              image: getProductImageUrl('tailored-suit-jacket', 1),
              link: '/men',
              description: 'Designed for him',
            },
            {
              title: 'Kids',
              image: getProductImageUrl('kids-floral-dress', 1),
              link: '/kids',
              description: 'Styles for little ones',
            },
            {
              title: 'New In',
              image: getProductImageUrl('oversized-blazer-beige', 1),
              link: '/new-releases',
              description: 'Latest arrivals',
            },
            {
              title: 'Outerwear',
              image: getProductImageUrl('wool-blend-coat-navy', 1),
              link: '/women/outerwear',
              description: 'Coats, jackets & more',
            },
            {
              title: 'Dresses',
              image: getProductImageUrl('satin-slip-dress', 1),
              link: '/women/dresses',
              description: 'From casual to evening',
            },
            {
              title: 'Shoes',
              image: getProductImageUrl('leather-ankle-boots', 1),
              link: '/women/shoes',
              description: 'Step into style',
            },
            {
              title: 'Bags',
              image: getProductImageUrl('structured-handbag', 1),
              link: '/women/bags',
              description: 'Carry in style',
            },
            {
              title: 'Sale',
              image: getProductImageUrl('cropped-cardigan', 2),
              link: '/sale',
              description: 'Up to 50% off',
            },
          ]}
          className="bg-brand-gray-50"
        />

        {/* Promo Banner Grid */}
        <PromoBannerGrid
          banners={[
            {
              title: 'The New Season',
              subtitle: 'Discover',
              image: getProductImageUrl('wool-blend-coat', 2),
              ctaText: 'Shop Now',
              ctaLink: '/women?filter=new',
              overlayVariant: 'dark',
            },
            {
              title: 'Limited Editions',
              subtitle: 'Exclusive',
              image: getProductImageUrl('tailored-suit-jacket', 4),
              ctaText: 'Explore',
              ctaLink: '/new-releases',
              overlayVariant: 'dark',
            },
          ]}
          className="bg-white"
        />

        {/* New Arrivals Section */}
        <div className="bg-brand-gray-50">
          <div className="layout-commerce">
            <ProductCarousel
              id="new-arrivals"
              title="New Arrivals"
              shopAllLink="/new-releases"
              products={newArrivals}
              onUnifiedAction={handleUnifiedAction}
              onAddToWishlist={handleAddToWishlist}
              wishlistIds={wishlistIds}
              allProducts={allProducts}
            />
          </div>
        </div>

        {/* Bestsellers Promo Banner Grid */}
        <PromoBannerGrid
          banners={[
            {
              title: 'Bestsellers',
              subtitle: 'Customer Favorites',
              image: getProductImageUrl('silk-blouse', 2),
              ctaText: 'Shop Best Sellers',
              ctaLink: '/women?filter=bestseller',
              overlayVariant: 'dark',
            },
            {
              title: 'Essentials',
              subtitle: 'Wardrobe Staples',
              image: getProductImageUrl('merino-wool-sweater', 2),
              ctaText: 'Shop Essentials',
              ctaLink: '/men?filter=essentials',
              overlayVariant: 'dark',
            },
          ]}
          className="bg-white"
        />

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="bg-brand-gray-50">
            <div className="layout-commerce">
              <div className="mb-8 md:mb-12 flex items-center justify-between pt-12 md:pt-16 lg:pt-20">
                <h2 className="text-3xl md:text-4xl font-normal text-brand-black tracking-tight">
                  Recently Viewed
                </h2>
                <button
                  onClick={() => {
                    clearRecentlyViewed()
                    setRecentlyViewed([])
                  }}
                  className="text-sm text-brand-gray-500 hover:text-brand-gray-700 underline"
                >
                  Clear
                </button>
              </div>
              <ProductGrid
                title=""
                products={recentlyViewed}
                columns={4}
                onUnifiedAction={handleUnifiedAction}
                onAddToWishlist={handleAddToWishlist}
                wishlistIds={wishlistIds}
                allProducts={allProducts}
              />
            </div>
          </div>
        )}

        {/* Brand Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto layout-gutter text-center">
            <h2 className="text-3xl md:text-4xl font-normal text-brand-black mb-6 tracking-tight">
              Style for Real Life
            </h2>
            <p className="text-lg text-brand-gray-700 leading-relaxed mb-8 font-normal">
              At Market Street, we believe fashion should be effortless, authentic, and accessible.
              Our collections are designed for the modern individual who values quality,
              versatility, and timeless style.
            </p>
            <p className="text-base text-brand-gray-600 leading-relaxed font-normal">
              Discover pieces that move with you, adapt to your life, and become the foundation
              of a wardrobe that works—every day, everywhere.
            </p>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="pt-16 md:pt-24 pb-0">
          <div className="bg-brand-blue-500 text-white py-12 md:py-16 px-8 rounded-none">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                Join Our Community
              </h2>
              <p className="text-white/80 mb-8 font-normal text-sm">
                Be the first to discover new arrivals, exclusive offers, and style inspiration.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto justify-center">
                <input
                  type="email"
                  placeholder="your.email@email.com"
                  className="flex-1 px-5 py-3 bg-white text-brand-black placeholder-brand-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue-300 text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-brand-blue-600 font-medium hover:bg-brand-gray-100 transition-colors text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          productVariants={[]}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          onNotify={(product) => setNotifyMeProduct(product)}
        />
      )}

      {/* Notify Me Modal */}
      {notifyMeProduct && (
        <NotifyMeModal
          product={notifyMeProduct}
          isOpen={!!notifyMeProduct}
          onClose={() => setNotifyMeProduct(null)}
          onNotify={handleNotifyMe}
        />
      )}
    </div>
  )
}
