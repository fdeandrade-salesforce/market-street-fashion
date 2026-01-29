/**
 * Complete Fashion Catalog Generator
 * Generates 30+ products per leaf subcategory
 * This script generates the complete catalog programmatically
 * 
 * IMPORTANT: All random values use deterministic seeded random to ensure
 * server and client generate identical catalogs (prevents hydration errors)
 */

import { Product, Review } from '../components/ProductListingPage'

// Deterministic seeded random number generator
// Ensures same sequence of random numbers for same seed
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  // Generate next random number between 0 and 1
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  // Generate random integer between min (inclusive) and max (exclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min)) + min
  }

  // Generate random float between min (inclusive) and max (exclusive)
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min
  }
}

// Global seed for catalog generation (fixed to ensure consistency)
const CATALOG_SEED = 12345

// Helper function to generate image paths
const productImages = (slug: string, count: number = 4): string[] => {
  return Array.from({ length: count }, (_, i) => `/images/products/${slug}/${i + 1}.jpg`)
}

// Standard sizes
const apparelSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const shoeSizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11']
const kidsSizes = ['2T', '3T', '4T', '5', '6', '7', '8', '10', '12', '14']
const oneSize = ['One Size']

// Generate stock quantity (mix of low, medium, high, out of stock)
// Uses seeded random based on product ID for deterministic results
const generateStock = (productId: string): { inStock: boolean; stockQuantity: number } => {
  const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 1000
  const rng = new SeededRandom(seed)
  const rand = rng.next()
  if (rand < 0.1) {
    return { inStock: false, stockQuantity: 0 } // 10% out of stock
  } else if (rand < 0.3) {
    return { inStock: true, stockQuantity: rng.nextInt(1, 6) } // 20% low stock
  } else if (rand < 0.7) {
    return { inStock: true, stockQuantity: rng.nextInt(10, 30) } // 40% medium stock
  } else {
    return { inStock: true, stockQuantity: rng.nextInt(30, 60) } // 30% high stock
  }
}

// Generate rating (4.0 - 5.0, weighted toward higher ratings)
// Uses seeded random based on product ID for deterministic results
const generateRating = (productId: string): number => {
  const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 2000
  const rng = new SeededRandom(seed)
  const base = 4.0
  const variation = rng.nextFloat(0, 1.0)
  return Math.round((base + variation) * 10) / 10
}

// Generate review count
// Uses seeded random based on product ID for deterministic results
const generateReviewCount = (productId: string): number => {
  const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 3000
  const rng = new SeededRandom(seed)
  return rng.nextInt(10, 210)
}

// Review content templates
const reviewTitles = [
  'Great quality!',
  'Perfect fit',
  'Love it!',
  'Exactly as described',
  'Highly recommend',
  'Beautiful design',
  'Worth every penny',
  'Fast shipping',
  'Great value',
  'Exceeded expectations',
  'Very comfortable',
  'Stylish and modern',
  'Good material',
  'Perfect for the price',
  'Will buy again',
]

const reviewBodies = [
  'This product exceeded my expectations. The quality is outstanding and it looks even better in person.',
  'Perfect fit and great quality. I\'m very happy with this purchase and would definitely recommend it.',
  'Love the design and the material feels premium. Shipping was fast and packaging was excellent.',
  'Exactly as described in the photos. The fit is perfect and the quality is great for the price.',
  'Highly recommend this product. It\'s well-made, stylish, and comfortable to wear.',
  'Beautiful design and excellent craftsmanship. This is definitely worth the investment.',
  'Great value for money. The quality is much better than I expected at this price point.',
  'Very satisfied with this purchase. The product arrived quickly and in perfect condition.',
  'Comfortable, stylish, and well-made. I\'ve already received several compliments on it.',
  'The material is high quality and the fit is perfect. I\'m very happy with this purchase.',
  'This is exactly what I was looking for. Great quality and fast shipping.',
  'Beautiful piece that adds a modern touch to my wardrobe. Highly recommend!',
  'Excellent product with great attention to detail. Worth every penny.',
  'Very happy with the quality and fit. This is a great addition to my collection.',
  'Perfect for everyday wear. Comfortable, stylish, and well-made.',
]

const reviewAuthors = [
  'Sarah M.', 'John D.', 'Emily R.', 'Michael T.', 'Lisa K.', 'David P.', 'Jessica L.',
  'Chris W.', 'Amanda B.', 'Ryan S.', 'Nicole H.', 'Kevin M.', 'Rachel T.', 'Brian F.',
  'Michelle C.', 'Daniel R.', 'Ashley N.', 'James K.', 'Lauren G.', 'Matthew D.',
]

// Generate reviews for a product (3-8 reviews)
// Uses deterministic seeded random to ensure consistent reviews
const generateReviews = (productId: string, productName: string, category: string): Review[] => {
  const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 4000
  const rng = new SeededRandom(seed)
  const reviewCount = rng.nextInt(3, 9) // 3-8 reviews
  const reviews: Review[] = []
  
  for (let i = 0; i < reviewCount; i++) {
    // Use different seed for each review to ensure variety
    const reviewRng = new SeededRandom(seed + i * 100)
    const rating = reviewRng.nextInt(4, 6) // 4-5 stars (weighted positive)
    const titleIndex = reviewRng.nextInt(0, reviewTitles.length)
    const bodyIndex = reviewRng.nextInt(0, reviewBodies.length)
    const authorIndex = reviewRng.nextInt(0, reviewAuthors.length)
    
    // Generate deterministic date (within last 6 months, based on product ID)
    // Use fixed date calculation to avoid timezone/locale issues
    const daysAgo = reviewRng.nextInt(0, 180)
    // Calculate date deterministically (using fixed reference date)
    // Use a fixed reference date (e.g., 2024-01-01) to avoid timezone issues
    const fixedReferenceDate = new Date('2024-01-01T00:00:00Z')
    const reviewDate = new Date(fixedReferenceDate)
    reviewDate.setUTCDate(reviewDate.getUTCDate() - daysAgo)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const dateString = `${monthNames[reviewDate.getUTCMonth()]} ${reviewDate.getUTCFullYear()}`
    
    reviews.push({
      id: `${productId}-review-${i + 1}`,
      author: reviewAuthors[authorIndex],
      rating,
      date: dateString,
      title: reviewTitles[titleIndex],
      content: reviewBodies[bodyIndex],
      verified: reviewRng.next() > 0.3, // 70% verified purchases
      helpful: reviewRng.nextInt(0, 50),
    })
  }
  
  return reviews
}

// Helper to create a single product variant
const createProductVariant = (
  id: string,
  name: string,
  category: string,
  subcategory: string,
  price: number,
  originalPrice: number | null,
  color: string,
  colors: string[],
  sizes: string[],
  options: {
    brand?: string
    shortDescription?: string
    longDescription?: string
    materials?: string[]
    careInstructions?: string[]
    fitNotes?: string
    isNew?: boolean
    isBestSeller?: boolean
    isLimitedEdition?: boolean
    isOnlineOnly?: boolean
    promotionalMessage?: string
    storeAvailable?: boolean
    tags?: string[]
    imageSlug?: string // Optional slug for image paths (for products with images)
  } = {}
): Product => {
  // Use provided imageSlug if available (for products with images), otherwise generate from ID
  const slug = options.imageSlug || id.replace(/\s+/g, '-').toLowerCase()
  const stock = generateStock(id) // Pass product ID for deterministic stock
  const rating = generateRating(id) // Pass product ID for deterministic rating
  const reviewCount = generateReviewCount(id) // Pass product ID for deterministic review count
  
  // Generate unique SKU per variant (includes color for uniqueness)
  const skuBase = `${category.substring(0, 2).toUpperCase()}-${subcategory.substring(0, 3).toUpperCase()}-${id.substring(Math.max(0, id.length - 6)).replace(/\s+/g, '').toUpperCase()}-${color.substring(0, 3).replace(/\s+/g, '').toUpperCase()}`
  
  // Generate reviews for this product variant
  const reviews = generateReviews(id, name, category)
  
  // Deterministic store availability based on product ID
  const storeAvailableSeed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 5000
  const storeAvailableRng = new SeededRandom(storeAvailableSeed)
  const isStoreAvailable = options.storeAvailable ?? storeAvailableRng.next() > 0.3
  
  return {
    id,
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
    storeAvailable: isStoreAvailable,
    rating,
    reviewCount,
    reviews, // Include generated reviews
    sku: skuBase,
    shortDescription: options.shortDescription || `${name} in ${color}. ${subcategory} from our ${category} collection.`,
    isNew: options.isNew || false,
    isBestSeller: options.isBestSeller || false,
    isLimitedEdition: options.isLimitedEdition || false,
    isOnlineOnly: options.isOnlineOnly || false,
    promotionalMessage: options.promotionalMessage,
    discountPercentage: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined,
    description: options.longDescription,
    materials: options.materials,
    careInstructions: options.careInstructions,
    fitNotes: options.fitNotes,
    tags: options.tags,
  } as Product
}

// Helper to create product with multiple color variants
const createProduct = (
  baseId: string,
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
    longDescription?: string
    materials?: string[]
    careInstructions?: string[]
    fitNotes?: string
    isNew?: boolean
    isBestSeller?: boolean
    isLimitedEdition?: boolean
    isOnlineOnly?: boolean
    promotionalMessage?: string
    storeAvailable?: boolean
    tags?: string[]
    imageSlug?: string // Optional slug for image paths (for products with images)
  } = {}
): Product[] => {
  return colors.map((color, idx) => {
    const productId = idx === 0 ? baseId : `${baseId}-${color.toLowerCase().replace(/\s+/g, '-')}`
    return createProductVariant(
      productId,
      name,
      category,
      subcategory,
      price,
      originalPrice,
      color,
      colors,
      sizes,
      options
    )
  })
}

// Product name generators by category - 30+ products per subcategory
const productNameGenerators: Record<string, Record<string, string[] | Record<string, string[]>>> = {
  Women: {
    'New In': [
      'Ribbed Tank Top', 'Oversized Blazer', 'Wide Leg Trousers', 'Silk Midi Dress', 'Cropped Cardigan',
      'Leather Ankle Boots', 'Oversized T-Shirt', 'High-Waisted Jeans', 'Knit Midi Skirt', 'Structured Handbag',
      'Satin Slip Dress', 'Wool Blend Scarf', 'Tailored Blazer', 'Ribbed Knit Sweater', 'Pleated Midi Skirt',
      'Leather Crossbody Bag', 'Oversized Denim Shirt', 'Wool Blend Coat', 'Silk Blouse', 'Wide Leg Jeans',
      'Knit Cardigan', 'Leather Loafers', 'Trench Coat', 'Ribbed Bodysuit', 'Midi Wrap Dress',
      'Structured Tote Bag', 'Oversized Shirt Dress', 'Knit Pants', 'Leather Belt', 'Cashmere Blend Scarf',
      'Denim Jacket', 'Silk Scarf', 'Wool Blend Blazer', 'Cropped Sweater', 'A-Line Skirt',
    ],
    'Outerwear': [
      'Wool Coat', 'Trench Coat', 'Puffer Jacket', 'Leather Jacket', 'Denim Jacket',
      'Wool Blend Coat', 'Quilted Jacket', 'Faux Fur Coat', 'Parka', 'Bomber Jacket',
      'Pea Coat', 'Duffle Coat', 'Windbreaker', 'Fleece Jacket', 'Cropped Puffer',
      'Long Wool Coat', 'Cropped Leather Jacket', 'Hooded Parka', 'Wool Blazer Coat', 'Puffer Vest',
      'Trench Coat', 'Wool Blend Trench', 'Quilted Vest', 'Faux Leather Jacket', 'Cropped Denim Jacket',
      'Long Puffer Coat', 'Wool Pea Coat', 'Bomber Jacket', 'Hooded Windbreaker', 'Fleece-Lined Jacket',
      'Cropped Wool Coat', 'Quilted Parka', 'Faux Fur Vest', 'Leather Moto Jacket', 'Denim Trucker Jacket',
    ],
    'Dresses': [
      'Midi Wrap Dress', 'Silk Slip Dress', 'A-Line Dress', 'Shirt Dress', 'Maxi Dress',
      'Bodycon Dress', 'Shift Dress', 'Floral Print Dress', 'Pleated Dress', 'Linen Dress',
      'Knit Dress', 'Satin Dress', 'Denim Dress', 'Tunic Dress', 'Sundress',
      'Cocktail Dress', 'Casual Dress', 'Formal Dress', 'Wrap Dress', 'Fit and Flare Dress',
      'Sheath Dress', 'Empire Waist Dress', 'Belted Dress', 'Off-Shoulder Dress', 'V-Neck Dress',
      'Long Sleeve Dress', 'Sleeveless Dress', 'Short Sleeve Dress', 'Asymmetric Dress', 'Tiered Dress',
      'Ruffled Dress', 'Lace Dress', 'Chiffon Dress', 'Cotton Dress', 'Jersey Dress',
    ],
    'Tops': [
      'Ribbed Tank Top', 'Oversized T-Shirt', 'Crop Top', 'Blouse', 'Tunic Top',
      'Peplum Top', 'Off-Shoulder Top', 'Bardot Top', 'Halter Top', 'Tie-Front Top',
      'Wrap Top', 'Button-Down Shirt', 'Oversized Shirt', 'T-Shirt', 'Long Sleeve Top',
      'Short Sleeve Top', 'Sleeveless Top', 'V-Neck Top', 'Round Neck Top', 'Square Neck Top',
      'Ribbed Top', 'Knit Top', 'Silk Top', 'Cotton Top', 'Linen Top',
      'Blouse', 'Shirt', 'Tank', 'Camisole', 'Bodysuit',
      'Turtleneck', 'Mock Neck', 'Cowl Neck', 'Boat Neck', 'Sweetheart Neck',
    ],
    'Knitwear': [
      'Ribbed Knit Sweater', 'Cropped Cardigan', 'Knit Cardigan', 'Cable Knit Sweater', 'Turtleneck Sweater',
      'V-Neck Sweater', 'Crew Neck Sweater', 'Oversized Sweater', 'Cropped Sweater', 'Knit Dress',
      'Knit Vest', 'Knit Pants', 'Knit Skirt', 'Knit Top', 'Knit Blazer',
      'Chunky Knit Sweater', 'Fine Gauge Sweater', 'Striped Sweater', 'Solid Sweater', 'Textured Sweater',
      'Merino Wool Sweater', 'Cashmere Sweater', 'Cotton Sweater', 'Acrylic Sweater', 'Wool Blend Sweater',
      'Hooded Sweater', 'Zip-Up Sweater', 'Button-Up Cardigan', 'Open Cardigan', 'Long Cardigan',
      'Short Cardigan', 'Cropped Cardigan', 'Oversized Cardigan', 'Fitted Cardigan', 'Chunky Cardigan',
    ],
    'Shirts': [
      'Classic Shirt', 'Oversized Shirt', 'Denim Shirt', 'Flannel Shirt', 'Chambray Shirt',
      'Oxford Shirt', 'Poplin Shirt', 'Linen Shirt', 'Silk Shirt', 'Cotton Shirt',
      'Button-Down Shirt', 'Button-Up Shirt', 'Long Sleeve Shirt', 'Short Sleeve Shirt', 'Sleeveless Shirt',
      'Tie-Front Shirt', 'Wrap Shirt', 'Peplum Shirt', 'Tunic Shirt', 'Oversized Shirt',
      'Fitted Shirt', 'Relaxed Shirt', 'Tailored Shirt', 'Casual Shirt', 'Formal Shirt',
      'Striped Shirt', 'Solid Shirt', 'Patterned Shirt', 'Checked Shirt', 'Plaid Shirt',
      'White Shirt', 'Blue Shirt', 'Black Shirt', 'Navy Shirt', 'Striped Shirt',
    ],
    'Jeans': [
      'High-Waisted Jeans', 'Wide Leg Jeans', 'Straight Leg Jeans', 'Skinny Jeans', 'Bootcut Jeans',
      'Flare Jeans', 'Boyfriend Jeans', 'Mom Jeans', 'Cropped Jeans', 'Ankle Jeans',
      'Distressed Jeans', 'Ripped Jeans', 'Raw Denim Jeans', 'Stretch Jeans', 'Non-Stretch Jeans',
      'Dark Wash Jeans', 'Light Wash Jeans', 'Medium Wash Jeans', 'Black Jeans', 'White Jeans',
      'Colored Jeans', 'High-Rise Jeans', 'Mid-Rise Jeans', 'Low-Rise Jeans', 'Super High-Rise Jeans',
      'Relaxed Fit Jeans', 'Slim Fit Jeans', 'Regular Fit Jeans', 'Loose Fit Jeans', 'Tapered Jeans',
      'Cropped Wide Leg Jeans', 'Cropped Straight Jeans', 'Cropped Skinny Jeans', 'Long Wide Leg Jeans', 'Long Straight Jeans',
    ],
    'Trousers': [
      'Wide Leg Trousers', 'Tailored Pants', 'Knit Pants', 'Cargo Pants', 'Chino Pants',
      'Pleated Pants', 'Flat Front Pants', 'High-Waisted Pants', 'Mid-Rise Pants', 'Low-Rise Pants',
      'Cropped Pants', 'Full Length Pants', 'Ankle Pants', 'Flare Pants', 'Straight Leg Pants',
      'Tapered Pants', 'Relaxed Fit Pants', 'Slim Fit Pants', 'Regular Fit Pants', 'Loose Fit Pants',
      'Linen Pants', 'Cotton Pants', 'Wool Pants', 'Polyester Pants', 'Viscose Pants',
      'Formal Pants', 'Casual Pants', 'Work Pants', 'Dress Pants', 'Smart Pants',
      'Culottes', 'Palazzo Pants', 'Gaucho Pants', 'Harem Pants', 'Jogger Pants',
    ],
    'Skirts': [
      'Knit Midi Skirt', 'Pleated Midi Skirt', 'A-Line Skirt', 'Pencil Skirt', 'Wrap Skirt',
      'Maxi Skirt', 'Mini Skirt', 'Midi Skirt', 'A-Line Skirt', 'Pleated Skirt',
      'Flared Skirt', 'Straight Skirt', 'Tiered Skirt', 'Ruffled Skirt', 'Asymmetric Skirt',
      'High-Waisted Skirt', 'Mid-Rise Skirt', 'Low-Rise Skirt', 'Elastic Waist Skirt', 'Zipper Skirt',
      'Button Skirt', 'Tie Skirt', 'Wrap Skirt', 'Pull-On Skirt', 'Side Slit Skirt',
      'Front Slit Skirt', 'Back Slit Skirt', 'No Slit Skirt', 'Linen Skirt', 'Cotton Skirt',
      'Denim Skirt', 'Leather Skirt', 'Suede Skirt', 'Silk Skirt', 'Wool Skirt',
    ],
    'Blazers': [
      'Oversized Blazer', 'Tailored Blazer', 'Wool Blend Blazer', 'Cropped Blazer', 'Long Blazer',
      'Single-Breasted Blazer', 'Double-Breasted Blazer', 'Unstructured Blazer', 'Structured Blazer', 'Relaxed Blazer',
      'Fitted Blazer', 'Oversized Blazer', 'Classic Blazer', 'Modern Blazer', 'Vintage Blazer',
      'Black Blazer', 'Navy Blazer', 'Gray Blazer', 'Beige Blazer', 'White Blazer',
      'Striped Blazer', 'Solid Blazer', 'Patterned Blazer', 'Checked Blazer', 'Plaid Blazer',
      'Linen Blazer', 'Cotton Blazer', 'Wool Blazer', 'Polyester Blazer', 'Blend Blazer',
      'Casual Blazer', 'Formal Blazer', 'Work Blazer', 'Dress Blazer', 'Smart Blazer',
    ],
    'Activewear': [
      'Yoga Pants', 'Leggings', 'Sports Bra', 'Athletic Top', 'Running Shorts',
      'Workout Tank', 'Athletic Dress', 'Sports Jacket', 'Athletic Skirt', 'Gym Shorts',
      'Compression Leggings', 'High-Waisted Leggings', 'Cropped Leggings', 'Full Length Leggings', 'Capri Leggings',
      'Athletic T-Shirt', 'Athletic Tank', 'Athletic Long Sleeve', 'Athletic Hoodie', 'Athletic Jacket',
      'Yoga Top', 'Pilates Top', 'Running Top', 'Training Top', 'Fitness Top',
      'Athletic Pants', 'Jogger Pants', 'Track Pants', 'Sweatpants', 'Athletic Shorts',
      'Sports Bra', 'High-Support Bra', 'Medium-Support Bra', 'Low-Support Bra', 'Racerback Bra',
    ],
    'Shoes': [
      'Leather Ankle Boots', 'Leather Loafers', 'Sneakers', 'Heeled Boots', 'Flat Boots',
      'Ankle Boots', 'Knee-High Boots', 'Over-The-Knee Boots', 'Chelsea Boots', 'Combat Boots',
      'Heeled Sandals', 'Flat Sandals', 'Platform Sandals', 'Wedge Sandals', 'Slide Sandals',
      'Pumps', 'Heels', 'Flats', 'Loafers', 'Mules',
      'Oxfords', 'Derby Shoes', 'Brogues', 'Monk Straps', 'Espadrilles',
      'Sneakers', 'Running Shoes', 'Training Shoes', 'Casual Sneakers', 'Fashion Sneakers',
      'Ballet Flats', 'Mary Janes', 'T-Strap Shoes', 'Slingback Shoes', 'Pointed Toe Shoes',
    ],
    'Bags': [
      'Structured Handbag', 'Leather Crossbody Bag', 'Structured Tote Bag', 'Shoulder Bag', 'Clutch Bag',
      'Backpack', 'Messenger Bag', 'Satchel Bag', 'Hobo Bag', 'Bucket Bag',
      'Tote Bag', 'Shopping Bag', 'Beach Bag', 'Gym Bag', 'Travel Bag',
      'Crossbody Bag', 'Shoulder Bag', 'Handbag', 'Clutch', 'Evening Bag',
      'Leather Bag', 'Canvas Bag', 'Nylon Bag', 'Straw Bag', 'Fabric Bag',
      'Small Bag', 'Medium Bag', 'Large Bag', 'Mini Bag', 'Oversized Bag',
      'Chain Bag', 'Strap Bag', 'Handle Bag', 'Top Handle Bag', 'Double Handle Bag',
    ],
    'Accessories': [
      'Wool Blend Scarf', 'Cashmere Blend Scarf', 'Silk Scarf', 'Leather Belt', 'Chain Belt',
      'Wide Belt', 'Narrow Belt', 'Chain Belt', 'Leather Belt', 'Fabric Belt',
      'Hat', 'Cap', 'Beanie', 'Beret', 'Fedora',
      'Sunglasses', 'Eyeglasses', 'Reading Glasses', 'Sunglasses', 'Prescription Glasses',
      'Jewelry', 'Necklace', 'Earrings', 'Bracelet', 'Ring',
      'Watch', 'Smartwatch', 'Fitness Tracker', 'Watch', 'Timepiece',
      'Gloves', 'Mittens', 'Fingerless Gloves', 'Leather Gloves', 'Wool Gloves',
    ],
  },
  Men: {
    'New In': [
      'Classic Oxford Shirt', 'Slim Fit Jeans', 'Cotton T-Shirt', 'Chino Pants', 'Hooded Sweatshirt',
      'Leather Sneakers', 'Denim Jacket', 'Knit Sweater', 'Cargo Pants', 'Leather Boots',
      'Button-Down Shirt', 'Jogger Pants', 'Polo Shirt', 'Wool Coat', 'Canvas Sneakers',
      'Bomber Jacket', 'Corduroy Pants', 'Henley Shirt', 'Leather Jacket', 'Track Pants',
      'Oxford Shoes', 'Quilted Jacket', 'Cargo Shorts', 'Turtleneck Sweater', 'Parka',
      'Sneakers', 'Chore Jacket', 'Cargo Pants', 'Flannel Shirt', 'Wool Blazer',
      'Leather Loafers', 'Puffer Vest', 'Cargo Shorts', 'Hoodie', 'Trench Coat',
    ],
    'Outerwear': [
      'Wool Coat', 'Trench Coat', 'Puffer Jacket', 'Leather Jacket', 'Denim Jacket',
      'Bomber Jacket', 'Parka', 'Quilted Jacket', 'Windbreaker', 'Fleece Jacket',
      'Pea Coat', 'Duffle Coat', 'Hooded Jacket', 'Varsity Jacket', 'Track Jacket',
      'Long Wool Coat', 'Cropped Leather Jacket', 'Hooded Parka', 'Wool Blazer Coat', 'Puffer Vest',
      'Trench Coat', 'Wool Blend Trench', 'Quilted Vest', 'Faux Leather Jacket', 'Cropped Denim Jacket',
      'Long Puffer Coat', 'Wool Pea Coat', 'Bomber Jacket', 'Hooded Windbreaker', 'Fleece-Lined Jacket',
      'Cropped Wool Coat', 'Quilted Parka', 'Faux Fur Vest', 'Leather Moto Jacket', 'Denim Trucker Jacket',
    ],
    'Jackets & Blazers': [
      'Suit Jacket', 'Blazer', 'Sports Jacket', 'Tuxedo Jacket', 'Dinner Jacket',
      'Single-Breasted Blazer', 'Double-Breasted Blazer', 'Unstructured Blazer', 'Structured Blazer', 'Relaxed Blazer',
      'Fitted Blazer', 'Oversized Blazer', 'Classic Blazer', 'Modern Blazer', 'Vintage Blazer',
      'Black Blazer', 'Navy Blazer', 'Gray Blazer', 'Beige Blazer', 'Brown Blazer',
      'Striped Blazer', 'Solid Blazer', 'Patterned Blazer', 'Checked Blazer', 'Plaid Blazer',
      'Linen Blazer', 'Cotton Blazer', 'Wool Blazer', 'Polyester Blazer', 'Blend Blazer',
      'Casual Blazer', 'Formal Blazer', 'Work Blazer', 'Dress Blazer', 'Smart Blazer',
    ],
    'Shirts': [
      'Classic Shirt', 'Oversized Shirt', 'Denim Shirt', 'Flannel Shirt', 'Chambray Shirt',
      'Oxford Shirt', 'Poplin Shirt', 'Linen Shirt', 'Cotton Shirt', 'Button-Down Shirt',
      'Button-Up Shirt', 'Long Sleeve Shirt', 'Short Sleeve Shirt', 'Sleeveless Shirt', 'Dress Shirt',
      'Casual Shirt', 'Formal Shirt', 'Work Shirt', 'Dress Shirt', 'Smart Shirt',
      'Striped Shirt', 'Solid Shirt', 'Patterned Shirt', 'Checked Shirt', 'Plaid Shirt',
      'White Shirt', 'Blue Shirt', 'Black Shirt', 'Navy Shirt', 'Gray Shirt',
      'Fitted Shirt', 'Relaxed Shirt', 'Tailored Shirt', 'Oversized Shirt', 'Classic Fit Shirt',
    ],
    'T-Shirts': [
      'Cotton T-Shirt', 'V-Neck T-Shirt', 'Crew Neck T-Shirt', 'Henley Shirt', 'Pocket T-Shirt',
      'Long Sleeve T-Shirt', 'Short Sleeve T-Shirt', 'Sleeveless T-Shirt', 'Tank Top', 'A-Shirt',
      'Oversized T-Shirt', 'Fitted T-Shirt', 'Relaxed T-Shirt', 'Classic Fit T-Shirt', 'Slim Fit T-Shirt',
      'Basic T-Shirt', 'Graphic T-Shirt', 'Plain T-Shirt', 'Striped T-Shirt', 'Solid T-Shirt',
      'White T-Shirt', 'Black T-Shirt', 'Gray T-Shirt', 'Navy T-Shirt', 'White T-Shirt',
      'Cotton T-Shirt', 'Polyester T-Shirt', 'Blend T-Shirt', 'Organic Cotton T-Shirt', 'Premium T-Shirt',
      'Casual T-Shirt', 'Athletic T-Shirt', 'Workout T-Shirt', 'Everyday T-Shirt', 'Essential T-Shirt',
    ],
    'Knitwear': [
      'Knit Sweater', 'Turtleneck Sweater', 'V-Neck Sweater', 'Crew Neck Sweater', 'Cardigan',
      'Hoodie', 'Sweatshirt', 'Pullover', 'Zip-Up Sweater', 'Cable Knit Sweater',
      'Chunky Knit Sweater', 'Fine Gauge Sweater', 'Striped Sweater', 'Solid Sweater', 'Textured Sweater',
      'Merino Wool Sweater', 'Cashmere Sweater', 'Cotton Sweater', 'Acrylic Sweater', 'Wool Blend Sweater',
      'Oversized Sweater', 'Fitted Sweater', 'Relaxed Sweater', 'Classic Fit Sweater', 'Slim Fit Sweater',
      'Long Sleeve Sweater', 'Short Sleeve Sweater', 'Sleeveless Sweater', 'Cropped Sweater', 'Full Length Sweater',
      'Casual Sweater', 'Formal Sweater', 'Work Sweater', 'Dress Sweater', 'Smart Sweater',
    ],
    'Jeans': [
      'Slim Fit Jeans', 'Straight Leg Jeans', 'Skinny Jeans', 'Relaxed Fit Jeans', 'Bootcut Jeans',
      'Tapered Jeans', 'Wide Leg Jeans', 'Cropped Jeans', 'Ankle Jeans', 'Full Length Jeans',
      'Distressed Jeans', 'Ripped Jeans', 'Raw Denim Jeans', 'Stretch Jeans', 'Non-Stretch Jeans',
      'Dark Wash Jeans', 'Light Wash Jeans', 'Medium Wash Jeans', 'Black Jeans', 'Indigo Jeans',
      'High-Rise Jeans', 'Mid-Rise Jeans', 'Low-Rise Jeans', 'Regular Rise Jeans', 'Super High-Rise Jeans',
      'Regular Fit Jeans', 'Slim Fit Jeans', 'Loose Fit Jeans', 'Tight Fit Jeans', 'Comfortable Fit Jeans',
      'Classic Jeans', 'Modern Jeans', 'Vintage Jeans', 'Contemporary Jeans', 'Timeless Jeans',
    ],
    'Trousers': [
      'Chino Pants', 'Cargo Pants', 'Jogger Pants', 'Track Pants', 'Dress Pants',
      'Pleated Pants', 'Flat Front Pants', 'High-Waisted Pants', 'Mid-Rise Pants', 'Low-Rise Pants',
      'Cropped Pants', 'Full Length Pants', 'Ankle Pants', 'Flare Pants', 'Straight Leg Pants',
      'Tapered Pants', 'Relaxed Fit Pants', 'Slim Fit Pants', 'Regular Fit Pants', 'Loose Fit Pants',
      'Linen Pants', 'Cotton Pants', 'Wool Pants', 'Polyester Pants', 'Viscose Pants',
      'Formal Pants', 'Casual Pants', 'Work Pants', 'Dress Pants', 'Smart Pants',
      'Cargo Pants', 'Jogger Pants', 'Track Pants', 'Sweatpants', 'Athletic Pants',
    ],
    'Suits': [
      'Suit', 'Two-Piece Suit', 'Three-Piece Suit', 'Suit Jacket', 'Suit Pants',
      'Single-Breasted Suit', 'Double-Breasted Suit', 'Unstructured Suit', 'Structured Suit', 'Relaxed Suit',
      'Fitted Suit', 'Classic Suit', 'Modern Suit', 'Vintage Suit', 'Contemporary Suit',
      'Black Suit', 'Navy Suit', 'Gray Suit', 'Charcoal Suit', 'Blue Suit',
      'Striped Suit', 'Solid Suit', 'Patterned Suit', 'Checked Suit', 'Pinstripe Suit',
      'Wool Suit', 'Cotton Suit', 'Linen Suit', 'Polyester Suit', 'Blend Suit',
      'Formal Suit', 'Business Suit', 'Wedding Suit', 'Dress Suit', 'Smart Suit',
    ],
    'Shoes': [
      'Leather Sneakers', 'Canvas Sneakers', 'Oxford Shoes', 'Leather Loafers', 'Leather Boots',
      'Dress Shoes', 'Casual Shoes', 'Athletic Shoes', 'Running Shoes', 'Training Shoes',
      'Chelsea Boots', 'Combat Boots', 'Ankle Boots', 'Knee-High Boots', 'Work Boots',
      'Sneakers', 'Running Shoes', 'Training Shoes', 'Casual Sneakers', 'Fashion Sneakers',
      'Oxfords', 'Derby Shoes', 'Brogues', 'Monk Straps', 'Loafers',
      'Mules', 'Espadrilles', 'Boat Shoes', 'Driving Shoes', 'Slippers',
      'Formal Shoes', 'Business Shoes', 'Dress Shoes', 'Casual Shoes', 'Smart Shoes',
    ],
    'Bags': [
      'Backpack', 'Messenger Bag', 'Satchel Bag', 'Briefcase', 'Duffel Bag',
      'Tote Bag', 'Shopping Bag', 'Gym Bag', 'Travel Bag', 'Weekend Bag',
      'Crossbody Bag', 'Shoulder Bag', 'Handbag', 'Clutch', 'Wallet',
      'Leather Bag', 'Canvas Bag', 'Nylon Bag', 'Synthetic Bag', 'Fabric Bag',
      'Small Bag', 'Medium Bag', 'Large Bag', 'Mini Bag', 'Oversized Bag',
      'Work Bag', 'Gym Bag', 'Travel Bag', 'Everyday Bag', 'Weekend Bag',
      'Formal Bag', 'Casual Bag', 'Business Bag', 'Dress Bag', 'Smart Bag',
    ],
    'Accessories': [
      'Leather Belt', 'Chain Belt', 'Wide Belt', 'Narrow Belt', 'Fabric Belt',
      'Hat', 'Cap', 'Beanie', 'Fedora', 'Baseball Cap',
      'Sunglasses', 'Eyeglasses', 'Reading Glasses', 'Prescription Glasses', 'Safety Glasses',
      'Watch', 'Smartwatch', 'Fitness Tracker', 'Timepiece', 'Chronograph',
      'Tie', 'Bow Tie', 'Pocket Square', 'Cufflinks', 'Suspenders',
      'Gloves', 'Mittens', 'Leather Gloves', 'Wool Gloves', 'Fingerless Gloves',
      'Scarf', 'Neck Scarf', 'Pocket Square', 'Bandana', 'Hanky',
    ],
  },
  Kids: {
    'Girls': {
      'New In': [
        'Floral Print Dress', 'Ruffled Top', 'Denim Skirt', 'Knit Cardigan', 'Leather Mary Janes',
        'Plaid Shirt', 'Corduroy Pants', 'Knit Sweater', 'Tulle Skirt', 'Sparkly Sneakers',
        'Polo Dress', 'Leggings', 'Hoodie', 'Jeans', 'T-Shirt',
        'Sundress', 'Shorts', 'Tank Top', 'Sweater', 'Boots',
        'Party Dress', 'Play Dress', 'School Dress', 'Casual Dress', 'Formal Dress',
        'Play Clothes', 'Everyday Clothes', 'School Clothes', 'Party Clothes', 'Holiday Clothes',
      ],
      'Outerwear': [
        'Winter Coat', 'Rain Jacket', 'Puffer Jacket', 'Denim Jacket', 'Hooded Jacket',
        'Wool Coat', 'Trench Coat', 'Bomber Jacket', 'Fleece Jacket', 'Windbreaker',
        'Parka', 'Quilted Jacket', 'Puffer Vest', 'Fleece Vest', 'Denim Vest',
        'Long Coat', 'Short Coat', 'Cropped Coat', 'Full Length Coat', 'Mid-Length Coat',
        'Warm Coat', 'Light Jacket', 'Heavy Jacket', 'All-Weather Jacket', 'Seasonal Jacket',
        'Play Jacket', 'School Jacket', 'Party Jacket', 'Casual Jacket', 'Formal Jacket',
      ],
      'Dresses': [
        'Floral Print Dress', 'Party Dress', 'Play Dress', 'School Dress', 'Sundress',
        'A-Line Dress', 'Fit and Flare Dress', 'Shift Dress', 'Tunic Dress', 'Maxi Dress',
        'Midi Dress', 'Mini Dress', 'Long Dress', 'Short Dress', 'Knee-Length Dress',
        'Ruffled Dress', 'Lace Dress', 'Tulle Dress', 'Cotton Dress', 'Polyester Dress',
        'Casual Dress', 'Formal Dress', 'Party Dress', 'Everyday Dress', 'Special Occasion Dress',
        'Print Dress', 'Solid Dress', 'Striped Dress', 'Polka Dot Dress', 'Floral Dress',
      ],
      'Tops': [
        'Ruffled Top', 'T-Shirt', 'Tank Top', 'Blouse', 'Shirt',
        'Long Sleeve Top', 'Short Sleeve Top', 'Sleeveless Top', 'Crop Top', 'Tunic Top',
        'Polo Shirt', 'Button-Down Shirt', 'Oversized Shirt', 'Fitted Shirt', 'Relaxed Shirt',
        'Cotton Top', 'Polyester Top', 'Blend Top', 'Knit Top', 'Woven Top',
        'Casual Top', 'Formal Top', 'School Top', 'Party Top', 'Play Top',
        'Print Top', 'Solid Top', 'Striped Top', 'Polka Dot Top', 'Floral Top',
      ],
      'Bottoms': [
        'Denim Skirt', 'Corduroy Pants', 'Leggings', 'Jeans', 'Shorts',
        'Skirt', 'Pants', 'Trousers', 'Capris', 'Bermuda Shorts',
        'High-Waisted Pants', 'Mid-Rise Pants', 'Low-Rise Pants', 'Elastic Waist Pants', 'Button Pants',
        'Cotton Pants', 'Polyester Pants', 'Denim Pants', 'Knit Pants', 'Woven Pants',
        'Casual Pants', 'Formal Pants', 'School Pants', 'Party Pants', 'Play Pants',
        'Print Pants', 'Solid Pants', 'Striped Pants', 'Polka Dot Pants', 'Floral Pants',
      ],
      'Shoes': [
        'Leather Mary Janes', 'Sparkly Sneakers', 'Boots', 'Sandals', 'Sneakers',
        'Dress Shoes', 'Casual Shoes', 'Athletic Shoes', 'Play Shoes', 'School Shoes',
        'Heeled Shoes', 'Flat Shoes', 'Platform Shoes', 'Wedge Shoes', 'Slide Shoes',
        'Leather Shoes', 'Canvas Shoes', 'Synthetic Shoes', 'Rubber Shoes', 'Fabric Shoes',
        'Closed-Toe Shoes', 'Open-Toe Shoes', 'Strap Shoes', 'Lace-Up Shoes', 'Slip-On Shoes',
        'Formal Shoes', 'Casual Shoes', 'Party Shoes', 'Everyday Shoes', 'Special Occasion Shoes',
      ],
      'Accessories': [
        'Hair Accessories', 'Hair Bows', 'Hair Clips', 'Headbands', 'Hair Ties',
        'Jewelry', 'Necklace', 'Earrings', 'Bracelet', 'Ring',
        'Hat', 'Cap', 'Beanie', 'Beret', 'Sun Hat',
        'Bag', 'Backpack', 'Tote Bag', 'Crossbody Bag', 'Shoulder Bag',
        'Belt', 'Scarf', 'Gloves', 'Mittens', 'Sunglasses',
        'Watch', 'Hair Accessories', 'Jewelry Set', 'Accessory Set', 'Complete Set',
      ],
    },
    'Boys': {
      'New In': [
        'Classic Polo Shirt', 'Cargo Pants', 'Denim Jeans', 'Hoodie', 'Sneakers',
        'T-Shirt', 'Shorts', 'Pants', 'Shirt', 'Sweater',
        'Jeans', 'Cargo Shorts', 'Athletic Shorts', 'Swim Trunks', 'Board Shorts',
        'Polo Shirt', 'Button-Down Shirt', 'Henley Shirt', 'Tank Top', 'Long Sleeve Shirt',
        'Play Clothes', 'School Clothes', 'Party Clothes', 'Everyday Clothes', 'Holiday Clothes',
        'Casual Clothes', 'Formal Clothes', 'Athletic Clothes', 'Outdoor Clothes', 'Indoor Clothes',
      ],
      'Outerwear': [
        'Winter Coat', 'Rain Jacket', 'Puffer Jacket', 'Denim Jacket', 'Hooded Jacket',
        'Wool Coat', 'Trench Coat', 'Bomber Jacket', 'Fleece Jacket', 'Windbreaker',
        'Parka', 'Quilted Jacket', 'Puffer Vest', 'Fleece Vest', 'Denim Vest',
        'Long Coat', 'Short Coat', 'Cropped Coat', 'Full Length Coat', 'Mid-Length Coat',
        'Warm Coat', 'Light Jacket', 'Heavy Jacket', 'All-Weather Jacket', 'Seasonal Jacket',
        'Play Jacket', 'School Jacket', 'Party Jacket', 'Casual Jacket', 'Formal Jacket',
      ],
      'Tops': [
        'Classic Polo Shirt', 'T-Shirt', 'Tank Top', 'Shirt', 'Hoodie',
        'Long Sleeve Shirt', 'Short Sleeve Shirt', 'Sleeveless Shirt', 'Henley Shirt', 'Polo Shirt',
        'Button-Down Shirt', 'Oversized Shirt', 'Fitted Shirt', 'Relaxed Shirt', 'Classic Fit Shirt',
        'Cotton Shirt', 'Polyester Shirt', 'Blend Shirt', 'Knit Shirt', 'Woven Shirt',
        'Casual Shirt', 'Formal Shirt', 'School Shirt', 'Party Shirt', 'Play Shirt',
        'Print Shirt', 'Solid Shirt', 'Striped Shirt', 'Polka Dot Shirt', 'Graphic Shirt',
      ],
      'Bottoms': [
        'Cargo Pants', 'Denim Jeans', 'Shorts', 'Pants', 'Trousers',
        'Jeans', 'Cargo Shorts', 'Athletic Shorts', 'Swim Trunks', 'Board Shorts',
        'High-Waisted Pants', 'Mid-Rise Pants', 'Low-Rise Pants', 'Elastic Waist Pants', 'Button Pants',
        'Cotton Pants', 'Polyester Pants', 'Denim Pants', 'Knit Pants', 'Woven Pants',
        'Casual Pants', 'Formal Pants', 'School Pants', 'Party Pants', 'Play Pants',
        'Print Pants', 'Solid Pants', 'Striped Pants', 'Polka Dot Pants', 'Graphic Pants',
      ],
      'Shoes': [
        'Sneakers', 'Boots', 'Sandals', 'Dress Shoes', 'Athletic Shoes',
        'Running Shoes', 'Training Shoes', 'Casual Sneakers', 'Fashion Sneakers', 'Play Shoes',
        'School Shoes', 'Party Shoes', 'Everyday Shoes', 'Special Occasion Shoes', 'Formal Shoes',
        'Leather Shoes', 'Canvas Shoes', 'Synthetic Shoes', 'Rubber Shoes', 'Fabric Shoes',
        'Closed-Toe Shoes', 'Open-Toe Shoes', 'Strap Shoes', 'Lace-Up Shoes', 'Slip-On Shoes',
        'High-Top Shoes', 'Low-Top Shoes', 'Mid-Top Shoes', 'Ankle Shoes', 'Full Height Shoes',
      ],
      'Accessories': [
        'Hat', 'Cap', 'Beanie', 'Baseball Cap', 'Sun Hat',
        'Belt', 'Scarf', 'Gloves', 'Mittens', 'Sunglasses',
        'Watch', 'Backpack', 'Tote Bag', 'Crossbody Bag', 'Shoulder Bag',
        'Wallet', 'Keychain', 'Lanyard', 'ID Holder', 'Badge Holder',
        'Tie', 'Bow Tie', 'Suspenders', 'Cufflinks', 'Pocket Square',
        'Jewelry', 'Necklace', 'Bracelet', 'Ring', 'Earrings',
      ],
    },
  },
}

// Generate products for a subcategory
const generateProductsForSubcategory = (
  category: string,
  subcategory: string,
  productNames: string[],
  basePriceRange: [number, number] = [29.90, 249.90]
): Product[] => {
  const products: Product[] = []
  const colors = ['Black', 'White', 'Navy', 'Beige', 'Gray']
  const sizes = category === 'Kids' ? kidsSizes : apparelSizes
  
  productNames.forEach((name, idx) => {
    // Get the correct slug for image paths (use product name format if product has images)
    const productSlug = getProductSlug(name, category, subcategory, idx + 1)
    // Base ID for product variants (use standard format for ID, but slug for images)
    const baseId = `${category.toLowerCase()}-${subcategory.toLowerCase().replace(/\s+/g, '-')}-${idx + 1}`
    
    // Use deterministic seeded random based on product ID
    const productSeed = baseId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 6000 + idx
    const rng = new SeededRandom(productSeed)
    
    const price = basePriceRange[0] + rng.nextFloat(0, basePriceRange[1] - basePriceRange[0])
    const roundedPrice = Math.round(price * 100) / 100
    const isOnSale = rng.next() < 0.2 // 20% on sale
    const originalPrice = isOnSale ? roundedPrice * 1.3 : null
    
    // Generate product details deterministically
    const colorCount = rng.nextInt(2, 5) // 2-4 colors
    const productColors = colors.slice(0, colorCount)
    const productSizes = name.toLowerCase().includes('shoe') || name.toLowerCase().includes('boot') 
      ? shoeSizes 
      : sizes
    
    products.push(...createProduct(
      baseId,
      name,
      category,
      subcategory,
      roundedPrice,
      originalPrice,
      productColors,
      productSizes,
      {
        shortDescription: `${name} from our ${subcategory} collection. Premium quality and timeless design.`,
        longDescription: `Discover the perfect ${name.toLowerCase()} for your wardrobe. This carefully crafted piece combines quality materials with thoughtful design, ensuring both style and comfort. Perfect for everyday wear or special occasions.`,
        materials: ['Premium Materials'],
        careInstructions: ['Follow care label instructions'],
        fitNotes: 'True to size',
        isNew: rng.next() < 0.3, // 30% new
        isBestSeller: rng.next() < 0.15, // 15% best sellers
        tags: [category.toLowerCase(), subcategory.toLowerCase().replace(/\s+/g, '-')],
        imageSlug: productSlug, // Use the correct slug for image paths
      }
    ))
  })
  
  return products
}

// Products that have images generated (must be preserved)
// Map: product name -> slug (for image path matching)
const PRODUCT_NAME_TO_SLUG_MAP = new Map<string, string>([
  ['Ribbed Tank Top', 'women-ribbed-tank-top-1'],
  ['Oversized Blazer', 'women-oversized-blazer-2'],
  ['Wide Leg Trousers', 'women-wide-leg-trousers-3'],
  ['Silk Midi Dress', 'women-silk-midi-dress-4'],
  ['Cropped Cardigan', 'women-cropped-cardigan-5'],
  ['Leather Ankle Boots', 'women-leather-ankle-boots-6'],
  ['Oversized T-Shirt', 'women-oversized-t-shirt-7'],
  ['High-Waisted Jeans', 'women-high-waisted-jeans-8'],
  ['Knit Midi Skirt', 'women-knit-midi-skirt-9'],
  ['Structured Handbag', 'women-structured-handbag-10'],
  ['Satin Slip Dress', 'women-satin-slip-dress-11'],
  ['Wool Blend Scarf', 'women-wool-blend-scarf-12'],
  ['Tailored Blazer', 'women-tailored-blazer-13'],
  ['Ribbed Knit Sweater', 'women-ribbed-knit-sweater-14'],
  ['Pleated Midi Skirt', 'women-pleated-midi-skirt-15'],
  ['Leather Crossbody Bag', 'women-leather-crossbody-bag-16'],
  ['Oversized Denim Shirt', 'women-oversized-denim-shirt-17'],
  ['Wool Blend Coat', 'women-wool-blend-coat-18'],
  ['Silk Blouse', 'women-silk-blouse-19'],
  ['Wide Leg Jeans', 'women-wide-leg-jeans-20'],
  ['Knit Cardigan', 'women-knit-cardigan-21'],
  ['Leather Loafers', 'women-leather-loafers-22'],
  ['Trench Coat', 'women-trench-coat-23'],
  ['Ribbed Bodysuit', 'women-ribbed-bodysuit-24'],
  ['Midi Wrap Dress', 'women-midi-wrap-dress-25'],
  ['Structured Tote Bag', 'women-structured-tote-bag-26'],
  ['Oversized Shirt Dress', 'women-oversized-shirt-dress-27'],
  ['Knit Pants', 'women-knit-pants-28'],
  ['Leather Belt', 'women-leather-belt-29'],
  ['Cashmere Blend Scarf', 'women-cashmere-blend-scarf-30'],
  ['Classic Oxford Shirt', 'men-classic-oxford-shirt-31'],
  ['Slim Fit Chinos', 'men-slim-fit-chinos-32'],
  ['Leather Dress Shoes', 'men-leather-dress-shoes-33'],
  ['Wool Blend Suit Jacket', 'men-wool-blend-suit-jacket-34'],
  ['Cotton T-Shirt', 'men-cotton-t-shirt-35'],
  ['Denim Jeans', 'men-denim-jeans-36'],
  ['Leather Belt', 'men-leather-belt-37'],
  ['Cashmere Sweater', 'men-cashmere-sweater-38'],
  ['Wool Coat', 'men-wool-coat-39'],
  ['Leather Boots', 'men-leather-boots-40'],
  ['Floral Print Dress', 'kids-floral-print-dress-41'],
  ['Classic Polo Shirt', 'kids-classic-polo-shirt-42'],
  ['Denim Jeans', 'kids-denim-jeans-43'],
  ['Tutu Dress', 'kids-tutu-dress-44'],
  ['Hooded Sweatshirt', 'kids-hooded-sweatshirt-45'],
  ['Cardigan', 'kids-cardigan-46'],
  ['Sneakers', 'kids-sneakers-47'],
  ['Party Dress', 'kids-party-dress-48'],
  ['Cargo Shorts', 'kids-cargo-shorts-49'],
  ['Leggings', 'kids-leggings-50'],
  // Batch 2 products
  ['Midi Skirt', 'women-midi-skirt-51'],
  ['Flared Skirt', 'women-flared-skirt-52'],
  ['Long Wide Leg Jeans', 'women-long-wide-leg-jeans-53'],
  ['Pea Coat', 'women-pea-coat-54'],
  ['Hooded Sweater', 'women-hooded-sweater-55'],
  ['Leather Skirt', 'women-leather-skirt-56'],
  ['Cotton Blazer', 'women-cotton-blazer-57'],
  ['Cropped Blazer', 'women-cropped-blazer-58'],
  ['Chiffon Dress', 'women-chiffon-dress-59'],
  ['Wool Blend Trench', 'women-wool-blend-trench-60'],
  ['Linen Shirt', 'women-linen-shirt-61'],
  ['Mom Jeans', 'women-mom-jeans-62'],
  ['Merino Wool Sweater', 'women-merino-wool-sweater-63'],
  ['Slim Fit Jeans', 'women-slim-fit-jeans-64'],
  ['Oversized Sweater', 'women-oversized-sweater-65'],
  ['Sundress', 'women-sundress-66'],
  ['Pencil Skirt', 'women-pencil-skirt-67'],
  ['Chain Bag', 'women-chain-bag-68'],
  ['Sweetheart Neck', 'women-sweetheart-neck-69'],
  ['Tunic Dress', 'women-tunic-dress-70'],
  ['Black Suit', 'men-black-suit-71'],
  ['Checked Blazer', 'men-checked-blazer-72'],
  ['Classic Fit Sweater', 'men-classic-fit-sweater-73'],
  ['Oversized Shirt', 'men-oversized-shirt-74'],
  ['Straight Leg Pants', 'men-straight-leg-pants-75'],
  ['Leather Jacket', 'men-leather-jacket-76'],
  ['Casual Shoes', 'men-casual-shoes-77'],
  ['Button-Up Shirt', 'men-button-up-shirt-78'],
  ['Formal Shirt', 'men-formal-shirt-79'],
  ['Gray T-Shirt', 'men-gray-t-shirt-80'],
  ['Chino Pants', 'men-chino-pants-81'],
  ['Solid Sweater', 'men-solid-sweater-82'],
  ['Derby Shoes', 'men-derby-shoes-83'],
  ['Flannel Shirt', 'men-flannel-shirt-84'],
  ['Mules', 'men-mules-85'],
  ['Two-Piece Suit', 'men-two-piece-suit-86'],
  ['Modern Suit', 'men-modern-suit-87'],
  ['Smart Pants', 'men-smart-pants-88'],
  ['Closed-Toe Shoes', 'kids-closed-toe-shoes-89'],
  ['Cotton Shirt', 'kids-cotton-shirt-90'],
  ['Casual Shirt', 'kids-casual-shirt-91'],
  ['Party Shirt', 'kids-party-shirt-92'],
  ['Wallet', 'kids-wallet-93'],
  ['Low-Top Shoes', 'kids-low-top-shoes-94'],
  ['Relaxed Shirt', 'kids-relaxed-shirt-95'],
  ['Tulle Dress', 'kids-tulle-dress-96'],
  ['Shoulder Bag', 'kids-shoulder-bag-97'],
  ['Flat Shoes', 'kids-flat-shoes-98'],
  ['Athletic Clothes', 'kids-athletic-clothes-99'],
  ['High-Waisted Pants', 'kids-high-waisted-pants-100'],
])

// Create a set of product names that have images (for matching)
const PRODUCT_NAMES_WITH_IMAGES = new Set(Array.from(PRODUCT_NAME_TO_SLUG_MAP.keys()))

// Helper to check if a product has images by matching its name
const hasImage = (product: Product): boolean => {
  return PRODUCT_NAMES_WITH_IMAGES.has(product.name)
}

// Helper to get the correct slug for a product (for image paths)
const getProductSlug = (name: string, category: string, subcategory: string, index: number): string => {
  // If product has images, use the mapped slug
  if (PRODUCT_NAME_TO_SLUG_MAP.has(name)) {
    return PRODUCT_NAME_TO_SLUG_MAP.get(name)!
  }
  // Otherwise, use the default format
  return `${category.toLowerCase()}-${subcategory.toLowerCase().replace(/\s+/g, '-')}-${index + 1}`
}

// Generate complete catalog
export const generateCompleteCatalog = (): Product[] => {
  const allProducts: Product[] = []
  
  // Women's products
  const womenSubcategories = [
    'New In', 'Outerwear', 'Dresses', 'Tops', 'Knitwear', 'Shirts', 'Jeans', 
    'Trousers', 'Skirts', 'Blazers', 'Activewear', 'Shoes', 'Bags', 'Accessories'
  ]
  
  womenSubcategories.forEach(subcategory => {
    const productNamesRaw = productNameGenerators.Women[subcategory] || []
    const productNames = Array.isArray(productNamesRaw) ? productNamesRaw : []
    if (productNames.length > 0) {
      const priceRange: [number, number] = 
        subcategory === 'Shoes' || subcategory === 'Bags' ? [79.90, 249.90] :
        subcategory === 'Outerwear' ? [99.90, 299.90] :
        subcategory === 'Accessories' ? [29.90, 149.90] :
        [29.90, 199.90]
      allProducts.push(...generateProductsForSubcategory('Women', subcategory, productNames, priceRange))
    }
  })
  
  // Men's products
  const menSubcategories = [
    'New In', 'Outerwear', 'Jackets & Blazers', 'Shirts', 'T-Shirts', 'Knitwear',
    'Jeans', 'Trousers', 'Suits', 'Shoes', 'Bags', 'Accessories'
  ]
  
  menSubcategories.forEach(subcategory => {
    const productNamesRaw = productNameGenerators.Men[subcategory] || []
    const productNames = Array.isArray(productNamesRaw) ? productNamesRaw : []
    if (productNames.length > 0) {
      const priceRange: [number, number] = 
        subcategory === 'Shoes' || subcategory === 'Bags' ? [79.90, 249.90] :
        subcategory === 'Outerwear' || subcategory === 'Suits' ? [99.90, 399.90] :
        subcategory === 'Accessories' ? [29.90, 149.90] :
        [29.90, 199.90]
      allProducts.push(...generateProductsForSubcategory('Men', subcategory, productNames, priceRange))
    }
  })
  
  // Kids products (Girls and Boys)
  const kidsGender = ['Girls', 'Boys']
  const kidsSubcategories = ['New In', 'Outerwear', 'Dresses', 'Tops', 'Bottoms', 'Shoes', 'Accessories']
  
  kidsGender.forEach(gender => {
    kidsSubcategories.forEach(subcategory => {
      // Skip Dresses for Boys
      if (gender === 'Boys' && subcategory === 'Dresses') return
      
      const productNamesRaw = (productNameGenerators.Kids as any)[gender]?.[subcategory] || []
      const productNames = Array.isArray(productNamesRaw) ? productNamesRaw : []
      if (productNames.length > 0) {
        const priceRange: [number, number] = 
          subcategory === 'Shoes' ? [39.90, 99.90] :
          subcategory === 'Accessories' ? [9.90, 49.90] :
          [19.90, 79.90]
        allProducts.push(...generateProductsForSubcategory('Kids', `${gender} ${subcategory}`, productNames, priceRange))
      }
    })
  })
  
  // Separate products with images from those without
  // Match by product name (all color variants of a product with images should be kept)
  const productsWithImages: Product[] = []
  const productsWithoutImages: Product[] = []
  
  allProducts.forEach(product => {
    if (hasImage(product)) {
      productsWithImages.push(product)
    } else {
      productsWithoutImages.push(product)
    }
  })
  
  // Target: 400 products total
  const TARGET_COUNT = 400
  const neededCount = Math.max(0, TARGET_COUNT - productsWithImages.length)
  
  // Randomly select products without images to reach target
  // Use deterministic seeded random for consistency
  const selectionRng = new SeededRandom(99999) // Fixed seed for selection
  const selectedWithoutImages: Product[] = []
  const shuffled = [...productsWithoutImages]
  
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = selectionRng.nextInt(0, i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  selectedWithoutImages.push(...shuffled.slice(0, neededCount))
  
  const finalProducts = [...productsWithImages, ...selectedWithoutImages]
  
  // Normalize product.colors arrays to only include colors that actually exist as variants
  // This ensures that when a user clicks a color, the variant actually exists
  const normalizedProducts = finalProducts.map(product => {
    if (!product.colors || product.colors.length <= 1) {
      return product
    }
    
    // Find all variants of this product (same name, category, subcategory)
    const variants = finalProducts.filter(p => 
      p.name === product.name && 
      p.category === product.category &&
      p.subcategory === product.subcategory &&
      p.color
    )
    
    // Get set of colors that actually exist as variants
    const existingColors = new Set(variants.map(v => v.color).filter(Boolean))
    
    // Start with existing variant colors (ensures all variants are listed)
    const allValidColors = Array.from(existingColors)
    
    // Filter product.colors to only include colors that exist, and add any missing ones
    const validColorsFromList = product.colors.filter(color => existingColors.has(color))
    
    // Combine: use valid colors from list, then add any missing variant colors
    const finalColors = Array.from(new Set([...validColorsFromList, ...allValidColors])).sort()
    
    // Only update if colors array changed
    if (finalColors.length !== product.colors.length || 
        !finalColors.every((c, i) => product.colors[i] === c)) {
      return {
        ...product,
        colors: finalColors.length > 0 ? finalColors : [product.color].filter(Boolean),
      }
    }
    
    return product
  })
  
  // Log in development only (remove console.log in production if needed)
  if (typeof window === 'undefined') {
    console.log(`Catalog reduced: ${allProducts.length} -> ${normalizedProducts.length} products`)
    console.log(`  - Products with images: ${productsWithImages.length}`)
    console.log(`  - Products without images selected: ${selectedWithoutImages.length}`)
  }
  
  return normalizedProducts
}
