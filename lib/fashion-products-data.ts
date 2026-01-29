import { Product } from '../components/ProductListingPage'

// Helper function to generate image paths
const productImages = (slug: string, count: number = 4): string[] => {
  return Array.from({ length: count }, (_, i) => `/images/products/${slug}/${i + 1}.jpg`)
}

// Helper function to generate reviews
const generateReviews = (productName: string, rating: number) => {
  const reviewTemplates = [
    {
      author: 'Sarah M.',
      rating: 5,
      date: '2 weeks ago',
      title: 'Perfect fit and quality',
      content: `Absolutely love this ${productName}! The quality is outstanding and it fits perfectly. Highly recommend.`,
      verified: true,
      helpful: 24,
    },
    {
      author: 'Jessica L.',
      rating: 5,
      date: '1 month ago',
      title: 'Beautiful piece',
      content: `This ${productName} exceeded my expectations. The material is soft and the design is timeless.`,
      verified: true,
      helpful: 18,
    },
    {
      author: 'Emma R.',
      rating: 4,
      date: '3 weeks ago',
      title: 'Great value',
      content: `Really happy with this purchase. The ${productName} is well-made and versatile.`,
      verified: true,
      helpful: 12,
    },
    {
      author: 'Olivia K.',
      rating: 5,
      date: '2 months ago',
      title: 'Must have',
      content: `This ${productName} is a wardrobe essential. I wear it all the time and always get compliments.`,
      verified: true,
      helpful: 31,
    },
    {
      author: 'Sophia T.',
      rating: 4,
      date: '1 week ago',
      title: 'Comfortable and stylish',
      content: `Love how comfortable this ${productName} is. Perfect for everyday wear.`,
      verified: false,
      helpful: 8,
    },
    {
      author: 'Isabella W.',
      rating: 5,
      date: '3 months ago',
      title: 'Excellent quality',
      content: `The quality of this ${productName} is impressive. Worth every penny.`,
      verified: true,
      helpful: 15,
    },
    {
      author: 'Mia D.',
      rating: 4,
      date: '1 month ago',
      title: 'Versatile piece',
      content: `This ${productName} goes with everything. Great addition to my wardrobe.`,
      verified: true,
      helpful: 6,
    },
    {
      author: 'Charlotte H.',
      rating: 5,
      date: '2 weeks ago',
      title: 'Love it!',
      content: `Perfect ${productName}! The fit is amazing and the fabric feels luxurious.`,
      verified: true,
      helpful: 20,
    },
  ]
  
  // Filter reviews to match rating distribution
  const filtered = reviewTemplates.filter(r => r.rating >= Math.floor(rating))
  return filtered.slice(0, Math.min(8, Math.floor(rating) + 2))
}

// Standard fashion colors
const standardColors = {
  neutral: ['Black', 'White', 'Navy', 'Beige', 'Gray', 'Ivory'],
  warm: ['Camel', 'Brown', 'Tan', 'Cream', 'Khaki'],
  cool: ['Navy', 'Slate', 'Charcoal', 'Steel Blue'],
  bright: ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'],
  pastel: ['Pink', 'Lavender', 'Mint', 'Peach', 'Sky Blue'],
}

// Standard sizes
const apparelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const shoeSizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11']
const kidsSizes = ['2T', '3T', '4T', '5', '6', '7', '8', '10', '12', '14']

// Generate stock quantity (mix of low, medium, high, out of stock)
const generateStock = (): { inStock: boolean; stockQuantity: number } => {
  const rand = Math.random()
  if (rand < 0.1) {
    return { inStock: false, stockQuantity: 0 } // 10% out of stock
  } else if (rand < 0.3) {
    return { inStock: true, stockQuantity: Math.floor(Math.random() * 5) + 1 } // 20% low stock
  } else if (rand < 0.7) {
    return { inStock: true, stockQuantity: Math.floor(Math.random() * 20) + 10 } // 40% medium stock
  } else {
    return { inStock: true, stockQuantity: Math.floor(Math.random() * 30) + 30 } // 30% high stock
  }
}

// Generate rating (4.0 - 5.0, weighted toward higher ratings)
const generateRating = (): number => {
  const base = 4.0
  const variation = Math.random() * 1.0
  return Math.round((base + variation) * 10) / 10
}

// Generate review count
const generateReviewCount = (): number => {
  return Math.floor(Math.random() * 200) + 10
}

// Helper to create product with common fields
const createProduct = (
  id: string,
  name: string,
  category: string,
  subcategory: string,
  price: number,
  originalPrice: number | null = null,
  colors: string[],
  sizes: string[],
  options: {
    brand?: string
    shortDescription?: string
    isNew?: boolean
    isBestSeller?: boolean
    isLimitedEdition?: boolean
    isOnlineOnly?: boolean
    promotionalMessage?: string
    storeAvailable?: boolean
  } = {}
): Product[] => {
  const products: Product[] = []
  const baseRating = generateRating()
  const baseReviewCount = generateReviewCount()
  const stock = generateStock()
  
  colors.forEach((color, colorIdx) => {
    const productId = colorIdx === 0 ? id : `${id}-${color.toLowerCase().replace(/\s+/g, '-')}`
    const slug = productId.replace(/\s+/g, '-').toLowerCase()
    
    products.push({
      id: productId,
      name,
      brand: options.brand || 'Market Street',
      price: originalPrice ? price : price,
      originalPrice: originalPrice || undefined,
      image: `/images/products/${slug}/1.jpg`,
      images: productImages(slug, 4),
      category,
      subcategory,
      color,
      colors,
      size: sizes,
      inStock: stock.inStock,
      stockQuantity: stock.stockQuantity,
      storeAvailable: options.storeAvailable ?? Math.random() > 0.3,
      rating: baseRating,
      reviewCount: baseReviewCount,
      sku: `${category.substring(0, 2).toUpperCase()}-${subcategory.substring(0, 3).toUpperCase()}-${colorIdx + 1}-${color.substring(0, 3).toUpperCase()}`,
      shortDescription: options.shortDescription || `${name} in ${color}. ${subcategory} from our ${category} collection.`,
      isNew: options.isNew || false,
      isBestSeller: options.isBestSeller || false,
      isLimitedEdition: options.isLimitedEdition || false,
      isOnlineOnly: options.isOnlineOnly || false,
      promotionalMessage: options.promotionalMessage,
      discountPercentage: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined,
    })
  })
  
  return products
}

// WOMEN'S PRODUCTS

// Women - New In
const womenNewIn: Product[] = [
  ...createProduct('womens-ribbed-tank-top', 'Ribbed Tank Top', 'Women', 'New In', 29.90, null, ['Black', 'White', 'Beige'], apparelSizes, {
    shortDescription: 'Essential ribbed tank top with a relaxed fit. Perfect for layering or wearing alone.',
    isNew: true,
  }),
  ...createProduct('womens-oversized-blazer', 'Oversized Blazer', 'Women', 'New In', 129.90, null, ['Black', 'Navy', 'Beige'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Modern oversized blazer with structured shoulders. A versatile piece for any wardrobe.',
    isNew: true,
    isBestSeller: true,
  }),
  ...createProduct('womens-wide-leg-trousers', 'Wide Leg Trousers', 'Women', 'New In', 89.90, null, ['Black', 'Navy', 'Cream'], apparelSizes, {
    shortDescription: 'Flowing wide-leg trousers in premium fabric. Comfortable and elegant.',
    isNew: true,
  }),
  ...createProduct('womens-silk-midi-dress', 'Silk Midi Dress', 'Women', 'New In', 149.90, null, ['Black', 'Navy', 'Pink'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Elegant silk midi dress with a relaxed silhouette. Perfect for special occasions.',
    isNew: true,
    isLimitedEdition: true,
  }),
  ...createProduct('womens-cropped-cardigan', 'Cropped Cardigan', 'Women', 'New In', 59.90, null, ['Beige', 'Gray', 'Pink'], apparelSizes, {
    shortDescription: 'Soft cropped cardigan in a classic knit. Ideal for transitional weather.',
    isNew: true,
  }),
  ...createProduct('womens-leather-ankle-boots', 'Leather Ankle Boots', 'Women', 'New In', 179.90, null, ['Black', 'Brown', 'Tan'], shoeSizes, {
    shortDescription: 'Classic leather ankle boots with a modern twist. Comfortable and stylish.',
    isNew: true,
    isBestSeller: true,
  }),
]

// Women - Outerwear (30+ products)
const womenOuterwear: Product[] = [
  ...createProduct('womens-wool-coat', 'Wool Coat', 'Women', 'Outerwear', 249.90, null, ['Black', 'Navy', 'Camel'], ['XS', 'S', 'M', 'L', 'XL', 'XXL'], {
    shortDescription: 'Classic wool coat with a tailored fit. Timeless elegance for winter.',
    isBestSeller: true,
  }),
  ...createProduct('womens-trench-coat', 'Trench Coat', 'Women', 'Outerwear', 199.90, null, ['Beige', 'Black', 'Navy'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Iconic trench coat in water-resistant fabric. A wardrobe essential.',
  }),
  ...createProduct('womens-puffer-jacket', 'Puffer Jacket', 'Women', 'Outerwear', 149.90, null, ['Black', 'Navy', 'Olive'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Lightweight puffer jacket with a modern silhouette. Perfect for cold weather.',
  }),
  ...createProduct('womens-leather-jacket', 'Leather Jacket', 'Women', 'Outerwear', 299.90, null, ['Black', 'Brown'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Classic leather jacket with a relaxed fit. A timeless statement piece.',
    isBestSeller: true,
  }),
  ...createProduct('womens-denim-jacket', 'Denim Jacket', 'Women', 'Outerwear', 79.90, null, ['Blue', 'Black', 'White'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Classic denim jacket with a comfortable fit. Versatile and durable.',
  }),
  ...createProduct('womens-wool-blend-coat', 'Wool Blend Coat', 'Women', 'Outerwear', 179.90, null, ['Gray', 'Camel', 'Black'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Warm wool blend coat with a modern design. Perfect for everyday wear.',
  }),
  ...createProduct('womens-windbreaker', 'Windbreaker', 'Women', 'Outerwear', 89.90, null, ['Black', 'Navy', 'Pink'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Lightweight windbreaker with a sporty design. Ideal for active days.',
  }),
  ...createProduct('womens-peacoat', 'Peacoat', 'Women', 'Outerwear', 219.90, null, ['Navy', 'Black', 'Gray'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Classic peacoat with double-breasted closure. Timeless maritime style.',
  }),
  ...createProduct('womens-faux-fur-coat', 'Faux Fur Coat', 'Women', 'Outerwear', 189.90, null, ['Beige', 'Black', 'Gray'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Luxurious faux fur coat with a relaxed fit. Elegant and warm.',
  }),
  ...createProduct('womens-bomber-jacket', 'Bomber Jacket', 'Women', 'Outerwear', 129.90, null, ['Black', 'Olive', 'Navy'], ['XS', 'S', 'M', 'L', 'XL'], {
    shortDescription: 'Modern bomber jacket with ribbed cuffs. Casual and comfortable.',
  }),
]

// Continue with more categories... (This is a large file, so I'll create it in sections)

export const fashionProducts: Product[] = [
  ...womenNewIn,
  ...womenOuterwear,
  // More categories will be added...
]
