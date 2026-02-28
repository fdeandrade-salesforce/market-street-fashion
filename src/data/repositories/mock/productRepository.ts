/**
 * Mock Product Repository Implementation
 */

import { IProductRepository } from '../types'
import {
  Product,
  ProductFilters,
  ProductSortOption,
  PaginatedResult,
  PriceRange,
  Inventory,
} from '../../../types'
import { mockProducts, categoryMappings } from '../../mock'
import { getProductVideoPath } from '../../mock/productImages'

function enrichWithVideos(products: Product[]): Product[] {
  return products.map((p) => {
    const videoPath = getProductVideoPath(p.id)
    if (videoPath) {
      return { ...p, videos: [videoPath] }
    }
    return p
  })
}

function getProducts(): Product[] {
  return enrichWithVideos(mockProducts)
}

export class MockProductRepository implements IProductRepository {
  async getAllProducts(): Promise<Product[]> {
    return getProducts()
  }
  
  // Get all products including color variants (for PDP variant selection)
  async getAllProductsWithVariants(): Promise<Product[]> {
    return getProducts()
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return getProducts().find((p) => p.id === id)
  }

  async listProducts(
    filters?: ProductFilters,
    sort: ProductSortOption = 'relevance',
    page: number = 1,
    pageSize: number = 24
  ): Promise<PaginatedResult<Product>> {
    let filtered = [...getProducts()]

    // Apply filters
    if (filters) {
      if (filters.category) {
        const allowedCategories = categoryMappings[filters.category] || []
        if (allowedCategories.length > 0) {
          filtered = filtered.filter((p) => allowedCategories.includes(p.category))
        }
      }

      if (filters.subcategory) {
        const normalize = (s: string) =>
          s
            .toLowerCase()
            .replace(/-/g, ' ')
            .replace(/&/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
        const normalizedSub = normalize(filters.subcategory)
        filtered = filtered.filter(
          (p) => normalize(p.subcategory) === normalizedSub
        )
      }

      if (filters.priceRange) {
        filtered = filtered.filter(
          (p) => p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
        )
      }

      if (filters.sizes && filters.sizes.length > 0) {
        filtered = filtered.filter((p) => p.size?.some((s) => filters.sizes!.includes(s)))
      }

      if (filters.colors && filters.colors.length > 0) {
        filtered = filtered.filter((p) => p.color && filters.colors!.includes(p.color))
      }

      if (filters.inStockOnly) {
        filtered = filtered.filter((p) => p.inStock)
      }

      if (filters.isNew) {
        filtered = filtered.filter((p) => p.isNew)
      }

      if (filters.onSale) {
        filtered = filtered.filter((p) => p.originalPrice && p.originalPrice > p.price)
      }

      if (filters.brand) {
        filtered = filtered.filter((p) => p.brand === filters.brand)
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'newest':
        case 'relevance':
        default:
          return 0
      }
    })

    // Apply pagination
    const total = filtered.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const items = filtered.slice(startIndex, endIndex)

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    }
  }

  async getProductsBySubcategory(category: string, subcategory?: string): Promise<Product[]> {
    const products = getProducts()
    if (!subcategory) {
      return products.filter((p) => p.category === category)
    }

    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(/-/g, ' ')
        .replace(/&/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    const normalizedSub = normalize(subcategory)
    return products.filter(
      (p) => normalize(p.subcategory) === normalizedSub
    )
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    return getProducts().filter((p) => p.isBestSeller || p.isNew).slice(0, limit)
  }

  async getNewArrivals(limit: number = 4): Promise<Product[]> {
    return getProducts().filter((p) => p.isNew).slice(0, limit)
  }

  async getNewReleases(limit?: number): Promise<Product[]> {
    const products = getProducts()
    const newProducts = products.filter((p) => p.isNew)
    const result =
      newProducts.length === 0
        ? [...products].sort((a, b) => a.id.localeCompare(b.id)).slice(0, 12)
        : newProducts
    return limit ? result.slice(0, limit) : result
  }

  async getNewReleasesByCategory(category: string, limit?: number): Promise<Product[]> {
    const products = getProducts()
    const allowedCategories = categoryMappings[category] || []
    const categoryProducts =
      allowedCategories.length > 0
        ? products.filter((p) => allowedCategories.includes(p.category))
        : products

    const newProducts = categoryProducts.filter((p) => p.isNew)
    const result =
      newProducts.length === 0
        ? [...categoryProducts].sort((a, b) => a.id.localeCompare(b.id)).slice(0, limit || 12)
        : newProducts
    return limit ? result.slice(0, limit) : result
  }

  async getSaleProducts(): Promise<Product[]> {
    return getProducts().filter((p) => p.originalPrice && p.originalPrice > p.price)
  }

  async getPriceRange(productIds?: string[]): Promise<PriceRange> {
    const allProducts = getProducts()
    const filtered = productIds
      ? allProducts.filter((p) => productIds.includes(p.id))
      : allProducts

    if (filtered.length === 0) {
      return { min: 0, max: 1000 }
    }

    const prices = filtered.map((p) => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  }

  async getInventory(productId: string, _variantId?: string): Promise<Inventory> {
    const product = mockProducts.find((p) => p.id === productId)
    if (!product) {
      return {
        productId,
        quantity: 0,
        inStock: false,
      }
    }

    return {
      productId,
      quantity: product.stockQuantity || 0,
      lowStockThreshold: 10,
      inStock: product.inStock,
    }
  }

  async searchProducts(query: string, limit: number = 20): Promise<Product[]> {
    const lowerQuery = query.toLowerCase()
    return getProducts()
      .filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery) ||
          p.subcategory.toLowerCase().includes(lowerQuery) ||
          p.shortDescription?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, limit)
  }

  async getProductVariants(baseProductId: string): Promise<Product[]> {
    const baseProduct = await this.getProductById(baseProductId)
    if (!baseProduct) return []

    // Find all products with the same name (variants)
    return getProducts().filter((p) => p.name === baseProduct.name)
  }

  async getBaseProductId(productId: string): Promise<string | undefined> {
    const product = await this.getProductById(productId)
    if (!product) return undefined

    // Find the first product with the same name (alphabetically by ID) as the base
    const variants = getProducts().filter((p) => p.name === product.name)
    if (variants.length === 0) return undefined

    // Sort by ID and return the first one (base product)
    return variants.sort((a, b) => a.id.localeCompare(b.id))[0].id
  }

}
