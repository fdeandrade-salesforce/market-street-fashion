import { Product } from '../components/ProductListingPage'
import { generateCompleteCatalog } from './generate-complete-catalog'

// Generate complete fashion catalog
// This replaces the old geometric product catalog with a comprehensive fashion catalog
const productCatalog: Product[] = generateCompleteCatalog()

export function getProductsBySubcategory(
  category: string,
  subcategory?: string
): Product[] {
  // Filter by category first
  let filtered = productCatalog.filter(p => p.category === category)

  // If subcategory is specified, filter by it
  if (subcategory) {
    filtered = filtered.filter(
      p => p.subcategory.toLowerCase() === subcategory.toLowerCase()
    )
  }

  return filtered
}

export function getAllProducts(): Product[] {
  return productCatalog
}

export function getProductById(id: string): Product | undefined {
  return productCatalog.find(p => p.id === id)
}

// Helper to get unique products by name (one per product, not color variants)
function getUniqueProductsByBaseName(products: Product[]): Product[] {
  const seen = new Set<string>()
  const unique: Product[] = []
  
  for (const product of products) {
    // Extract base name (remove color suffix from ID if present)
    const baseName = product.name
    if (!seen.has(baseName)) {
      seen.add(baseName)
      unique.push(product)
    }
  }
  
  return unique
}

// Helper to shuffle array deterministically
function shuffleArray<T>(array: T[], seed: number = 12345): T[] {
  const shuffled = [...array]
  let currentSeed = seed
  
  // Simple seeded random
  const random = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280
    return currentSeed / 233280
  }
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

// Cache for featured products to avoid recalculating
let cachedFeaturedProducts: Product[] | null = null

export function getFeaturedProducts(): Product[] {
  if (cachedFeaturedProducts) {
    return cachedFeaturedProducts
  }
  
  // Get products that are best sellers or new
  const eligible = productCatalog.filter(p => p.isBestSeller || p.isNew)
  
  // Get unique products (one per product name)
  const unique = getUniqueProductsByBaseName(eligible)
  
  // Mix products from different categories
  const byCategory = {
    Women: unique.filter(p => p.category === 'Women'),
    Men: unique.filter(p => p.category === 'Men'),
    Kids: unique.filter(p => p.category === 'Kids'),
  }
  
  // Shuffle each category
  const shuffledWomen = shuffleArray(byCategory.Women, 1000)
  const shuffledMen = shuffleArray(byCategory.Men, 2000)
  const shuffledKids = shuffleArray(byCategory.Kids, 3000)
  
  // Interleave products from different categories for variety
  const mixed: Product[] = []
  const maxLength = Math.max(shuffledWomen.length, shuffledMen.length, shuffledKids.length)
  
  for (let i = 0; i < maxLength && mixed.length < 8; i++) {
    if (i < shuffledWomen.length && mixed.length < 8) mixed.push(shuffledWomen[i])
    if (i < shuffledMen.length && mixed.length < 8) mixed.push(shuffledMen[i])
    if (i < shuffledKids.length && mixed.length < 8) mixed.push(shuffledKids[i])
  }
  
  // If we don't have enough, fill from remaining unique products
  if (mixed.length < 8) {
    const remaining = unique.filter(p => !mixed.some(m => m.name === p.name))
    mixed.push(...shuffleArray(remaining, 4000).slice(0, 8 - mixed.length))
  }
  
  cachedFeaturedProducts = mixed.slice(0, 8)
  return cachedFeaturedProducts
}

export function getNewArrivals(): Product[] {
  // Get featured products first to exclude them
  const featured = getFeaturedProducts()
  const featuredNames = new Set(featured.map(p => p.name))
  
  // Get products that are new, excluding those already in featured
  const eligible = productCatalog.filter(p => p.isNew && !featuredNames.has(p.name))
  
  // Get unique products (one per product name)
  const unique = getUniqueProductsByBaseName(eligible)
  
  // Mix products from different categories
  const byCategory = {
    Women: unique.filter(p => p.category === 'Women'),
    Men: unique.filter(p => p.category === 'Men'),
    Kids: unique.filter(p => p.category === 'Kids'),
  }
  
  // Shuffle each category
  const shuffledWomen = shuffleArray(byCategory.Women, 5000)
  const shuffledMen = shuffleArray(byCategory.Men, 6000)
  const shuffledKids = shuffleArray(byCategory.Kids, 7000)
  
  // Interleave products from different categories for variety
  const mixed: Product[] = []
  const maxLength = Math.max(shuffledWomen.length, shuffledMen.length, shuffledKids.length)
  
  for (let i = 0; i < maxLength && mixed.length < 4; i++) {
    if (i < shuffledWomen.length && mixed.length < 4) mixed.push(shuffledWomen[i])
    if (i < shuffledMen.length && mixed.length < 4) mixed.push(shuffledMen[i])
    if (i < shuffledKids.length && mixed.length < 4) mixed.push(shuffledKids[i])
  }
  
  // If we don't have enough, fill from remaining unique products
  if (mixed.length < 4) {
    const remaining = unique.filter(p => !mixed.some(m => m.name === p.name))
    mixed.push(...shuffleArray(remaining, 8000).slice(0, 4 - mixed.length))
  }
  
  return mixed.slice(0, 4)
}

export function getSaleProducts(): Product[] {
  return productCatalog.filter(p => p.originalPrice && p.originalPrice > p.price)
}

// TODO: Replace with real "new releases" sorting once product data supports createdAt/releaseDate fields
// Currently using deterministic fallback: products with isNew flag, then sorted by id for stability
export function getNewReleases(limit?: number): Product[] {
  const newProducts = productCatalog.filter(p => p.isNew)
  // Fallback: if no isNew products, use a stable subset sorted by id
  const fallback = newProducts.length === 0 
    ? productCatalog.slice().sort((a, b) => a.id.localeCompare(b.id)).slice(0, 12)
    : newProducts
  return limit ? fallback.slice(0, limit) : fallback
}

export function getNewReleasesByCategory(category: string, limit?: number): Product[] {
  // Filter by category
  const categoryProducts = productCatalog.filter(p => p.category === category)
  
  // Prefer isNew products, fallback to stable subset
  const newProducts = categoryProducts.filter(p => p.isNew)
  const fallback = newProducts.length === 0
    ? categoryProducts.slice().sort((a, b) => a.id.localeCompare(b.id)).slice(0, limit || 12)
    : newProducts
  
  return limit ? fallback.slice(0, limit) : fallback
}
