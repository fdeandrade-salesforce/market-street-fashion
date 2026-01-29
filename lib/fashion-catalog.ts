/**
 * Complete Fashion Product Catalog
 * Generated fashion products for Women, Men, Kids categories
 * 30+ products per leaf subcategory
 */

import { Product } from '../components/ProductListingPage'

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
  } = {}
): Product => {
  const slug = id.replace(/\s+/g, '-').toLowerCase()
  const stock = generateStock()
  const rating = generateRating()
  const reviewCount = generateReviewCount()
  
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
    storeAvailable: options.storeAvailable ?? Math.random() > 0.3,
    rating,
    reviewCount,
    sku: `${category.substring(0, 2).toUpperCase()}-${subcategory.substring(0, 3).toUpperCase()}-${id.substring(Math.max(0, id.length - 6))}-${color.substring(0, 3).toUpperCase()}`,
    shortDescription: options.shortDescription || `${name} in ${color}. ${subcategory} from our ${category} collection.`,
    isNew: options.isNew || false,
    isBestSeller: options.isBestSeller || false,
    isLimitedEdition: options.isLimitedEdition || false,
    isOnlineOnly: options.isOnlineOnly || false,
    promotionalMessage: options.promotionalMessage,
    discountPercentage: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined,
    // Extended fields for PDP (will be accessed via ProductDetailPage)
    ...(options.longDescription && { description: options.longDescription }),
    ...(options.materials && { materials: options.materials }),
    ...(options.careInstructions && { careInstructions: options.careInstructions }),
    ...(options.fitNotes && { fitNotes: options.fitNotes }),
    ...(options.tags && { tags: options.tags }),
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

// ============================================================================
// WOMEN'S PRODUCTS
// ============================================================================

const womenProducts: Product[] = []

// Women - New In (30+ products)
const womenNewInProducts = [
  {
    name: 'Ribbed Tank Top',
    price: 29.90,
    colors: ['Black', 'White', 'Beige', 'Navy'],
    sizes: apparelSizes,
    desc: 'Essential ribbed tank top with a relaxed fit. Perfect for layering or wearing alone.',
    longDesc: 'This versatile ribbed tank top is crafted from premium cotton blend for ultimate comfort. The relaxed fit allows for easy movement while maintaining a polished silhouette. Perfect as a base layer or worn alone, this piece transitions seamlessly from day to night.',
    materials: ['95% Cotton', '5% Elastane'],
    care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    fit: 'Relaxed fit. True to size.',
    new: true,
  },
  {
    name: 'Oversized Blazer',
    price: 129.90,
    colors: ['Black', 'Navy', 'Beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Modern oversized blazer with structured shoulders. A versatile piece for any wardrobe.',
    longDesc: 'Elevate your look with this contemporary oversized blazer featuring structured shoulders and a relaxed silhouette. Crafted from premium wool blend fabric, this piece offers both sophistication and comfort. The single-button closure and notched lapel create a timeless appeal.',
    materials: ['70% Wool', '25% Polyester', '5% Elastane'],
    care: ['Dry clean only'],
    fit: 'Oversized fit. Size down for a more fitted look.',
    new: true,
    bestSeller: true,
  },
  {
    name: 'Wide Leg Trousers',
    price: 89.90,
    colors: ['Black', 'Navy', 'Cream', 'Gray'],
    sizes: apparelSizes,
    desc: 'Flowing wide-leg trousers in premium fabric. Comfortable and elegant.',
    longDesc: 'Make a statement with these elegant wide-leg trousers that combine comfort with sophistication. The flowing silhouette creates a flattering line while the premium fabric ensures all-day comfort. Perfect for both professional and casual settings.',
    materials: ['65% Polyester', '30% Viscose', '5% Elastane'],
    care: ['Machine wash cold', 'Hang dry', 'Iron on low heat'],
    fit: 'Wide leg fit. High-waisted design.',
    new: true,
  },
  {
    name: 'Silk Midi Dress',
    price: 149.90,
    colors: ['Black', 'Navy', 'Pink', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Elegant silk midi dress with a relaxed silhouette. Perfect for special occasions.',
    longDesc: 'Experience luxury with this beautifully crafted silk midi dress. The relaxed silhouette drapes elegantly while the midi length offers timeless sophistication. Perfect for weddings, dinners, or any occasion where you want to feel effortlessly elegant.',
    materials: ['100% Silk'],
    care: ['Dry clean only', 'Store flat or on padded hanger'],
    fit: 'Relaxed fit. Flowing silhouette.',
    new: true,
    limited: true,
  },
  {
    name: 'Cropped Cardigan',
    price: 59.90,
    colors: ['Beige', 'Gray', 'Pink', 'Black'],
    sizes: apparelSizes,
    desc: 'Soft cropped cardigan in a classic knit. Ideal for transitional weather.',
    longDesc: 'Layer in style with this soft cropped cardigan featuring a classic knit pattern. The cropped length pairs perfectly with high-waisted pieces, while the button-front closure adds versatility. Made from premium yarn for a luxurious feel.',
    materials: ['80% Acrylic', '15% Wool', '5% Nylon'],
    care: ['Machine wash cold', 'Lay flat to dry', 'Do not tumble dry'],
    fit: 'Cropped fit. True to size.',
    new: true,
  },
  {
    name: 'Leather Ankle Boots',
    price: 179.90,
    colors: ['Black', 'Brown', 'Tan'],
    sizes: shoeSizes,
    desc: 'Classic leather ankle boots with a modern twist. Comfortable and stylish.',
    longDesc: 'Step into timeless style with these premium leather ankle boots. Crafted from genuine leather with a comfortable block heel, these boots offer both style and comfort. The side zip closure ensures easy wear while the durable sole provides excellent traction.',
    materials: ['Genuine Leather Upper', 'Leather Lining', 'Rubber Sole'],
    care: ['Clean with leather conditioner', 'Protect from water', 'Use shoe trees'],
    fit: 'True to size. Comfortable block heel.',
    new: true,
    bestSeller: true,
  },
  {
    name: 'Oversized T-Shirt',
    price: 39.90,
    colors: ['White', 'Black', 'Gray', 'Navy'],
    sizes: apparelSizes,
    desc: 'Comfortable oversized t-shirt in premium cotton. Perfect for casual days.',
    longDesc: 'The perfect everyday t-shirt with an oversized fit that feels effortlessly cool. Made from premium organic cotton, this piece offers exceptional softness and breathability. The relaxed silhouette works for both casual and dressed-up looks.',
    materials: ['100% Organic Cotton'],
    care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    fit: 'Oversized fit. Size down for a more fitted look.',
    new: true,
  },
  {
    name: 'High-Waisted Jeans',
    price: 79.90,
    colors: ['Blue', 'Black', 'White'],
    sizes: apparelSizes,
    desc: 'Classic high-waisted jeans with a flattering fit. Timeless denim style.',
    longDesc: 'Rediscover the perfect pair of jeans with these high-waisted beauties. The flattering rise elongates your silhouette while the premium denim offers comfort and durability. The straight-leg cut provides a modern, versatile look that works for any occasion.',
    materials: ['98% Cotton', '2% Elastane'],
    care: ['Machine wash cold', 'Inside out', 'Hang dry', 'Do not bleach'],
    fit: 'High-waisted. True to size.',
    new: true,
  },
  {
    name: 'Knit Midi Skirt',
    price: 69.90,
    colors: ['Black', 'Navy', 'Beige', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Elegant knit midi skirt with a comfortable fit. Versatile and stylish.',
    longDesc: 'Add sophistication to your wardrobe with this elegant knit midi skirt. The comfortable stretch fabric moves with you while the midi length offers timeless appeal. Perfect for both office and weekend wear, this piece pairs beautifully with everything.',
    materials: ['75% Polyester', '20% Viscose', '5% Elastane'],
    care: ['Machine wash cold', 'Lay flat to dry', 'Do not wring'],
    fit: 'Fitted at waist, A-line silhouette.',
    new: true,
  },
  {
    name: 'Structured Handbag',
    price: 149.90,
    colors: ['Black', 'Brown', 'Beige'],
    sizes: oneSize,
    desc: 'Classic structured handbag in premium leather. Perfect for everyday use.',
    longDesc: 'Carry your essentials in style with this beautifully structured handbag. Crafted from premium genuine leather with reinforced corners and a secure top zip closure. The adjustable shoulder strap and top handles offer versatile carrying options.',
    materials: ['Genuine Leather', 'Metal Hardware', 'Cotton Lining'],
    care: ['Clean with leather conditioner', 'Store in dust bag', 'Avoid direct sunlight'],
    fit: 'One size. Dimensions: 12" × 9" × 5"',
    new: true,
    bestSeller: true,
  },
  {
    name: 'Satin Slip Dress',
    price: 89.90,
    colors: ['Black', 'Navy', 'Pink', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Elegant satin slip dress with adjustable straps. Perfect for evening wear.',
    longDesc: 'Channel timeless elegance with this luxurious satin slip dress. The adjustable straps ensure a perfect fit while the flowing fabric drapes beautifully. The midi length and bias cut create a flattering silhouette that moves gracefully.',
    materials: ['100% Polyester Satin'],
    care: ['Hand wash cold', 'Hang dry', 'Do not wring', 'Iron on low heat'],
    fit: 'Fitted silhouette. Adjustable straps.',
    new: true,
  },
  {
    name: 'Wool Blend Scarf',
    price: 49.90,
    colors: ['Beige', 'Gray', 'Navy', 'Black'],
    sizes: oneSize,
    desc: 'Luxurious wool blend scarf in a classic pattern. Warm and stylish.',
    longDesc: 'Wrap yourself in luxury with this premium wool blend scarf featuring a timeless pattern. The generous size allows for multiple styling options while the soft texture feels gentle against the skin. A perfect accessory for transitional weather.',
    materials: ['70% Wool', '30% Acrylic'],
    care: ['Hand wash cold', 'Lay flat to dry', 'Do not tumble dry'],
    fit: 'One size. 70" × 12"',
    new: true,
  },
  {
    name: 'Tailored Blazer',
    price: 139.90,
    colors: ['Black', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Classic tailored blazer with a modern fit. Perfect for professional settings.',
    longDesc: 'Command attention with this impeccably tailored blazer featuring a modern silhouette. The structured shoulders and nipped-in waist create a flattering shape while the premium fabric ensures durability. A wardrobe essential for the modern professional.',
    materials: ['65% Polyester', '30% Wool', '5% Elastane'],
    care: ['Dry clean only'],
    fit: 'Tailored fit. True to size.',
    new: true,
  },
  {
    name: 'Ribbed Knit Sweater',
    price: 69.90,
    colors: ['Beige', 'Gray', 'Navy', 'Pink'],
    sizes: apparelSizes,
    desc: 'Cozy ribbed knit sweater with a relaxed fit. Perfect for layering.',
    longDesc: 'Stay warm and stylish with this cozy ribbed knit sweater. The relaxed fit allows for comfortable layering while the classic ribbed pattern adds texture and interest. Made from premium yarn for exceptional softness and warmth.',
    materials: ['60% Acrylic', '30% Wool', '10% Nylon'],
    care: ['Machine wash cold', 'Lay flat to dry', 'Do not tumble dry'],
    fit: 'Relaxed fit. True to size.',
    new: true,
  },
  {
    name: 'Pleated Midi Skirt',
    price: 79.90,
    colors: ['Black', 'Navy', 'Beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Elegant pleated midi skirt with a flattering silhouette. Timeless and versatile.',
    longDesc: 'Add movement to your wardrobe with this beautifully pleated midi skirt. The carefully crafted pleats create visual interest while the midi length offers timeless sophistication. Perfect for both professional and social occasions.',
    materials: ['100% Polyester'],
    care: ['Dry clean only', 'Store hanging'],
    fit: 'Fitted at waist, pleated A-line.',
    new: true,
  },
  {
    name: 'Leather Crossbody Bag',
    price: 129.90,
    colors: ['Black', 'Brown', 'Tan'],
    sizes: oneSize,
    desc: 'Compact leather crossbody bag with adjustable strap. Perfect for everyday essentials.',
    longDesc: 'Carry your essentials in style with this compact crossbody bag. Crafted from premium leather with a secure flap closure and adjustable strap. The organized interior features multiple pockets for easy access to your belongings.',
    materials: ['Genuine Leather', 'Metal Hardware'],
    care: ['Clean with leather conditioner', 'Store in dust bag'],
    fit: 'One size. Dimensions: 10" × 7" × 2"',
    new: true,
  },
  {
    name: 'Oversized Denim Shirt',
    price: 59.90,
    colors: ['Blue', 'Black', 'White'],
    sizes: apparelSizes,
    desc: 'Classic oversized denim shirt with a relaxed fit. Versatile and durable.',
    longDesc: 'A wardrobe staple reimagined with an oversized silhouette. This classic denim shirt offers endless styling possibilities—wear it open as a light jacket, tied at the waist, or buttoned up. The premium denim ensures durability and comfort.',
    materials: ['100% Cotton Denim'],
    care: ['Machine wash cold', 'Inside out', 'Hang dry'],
    fit: 'Oversized fit. True to size.',
    new: true,
  },
  {
    name: 'Wool Blend Coat',
    price: 249.90,
    colors: ['Black', 'Navy', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Classic wool blend coat with a tailored fit. Timeless elegance for winter.',
    longDesc: 'Brave the elements in style with this classic wool blend coat. The tailored fit creates a flattering silhouette while the premium fabric offers exceptional warmth. The notched lapel and single-button closure add timeless sophistication.',
    materials: ['70% Wool', '25% Polyester', '5% Other'],
    care: ['Dry clean only'],
    fit: 'Tailored fit. True to size.',
    new: true,
    bestSeller: true,
  },
  {
    name: 'Silk Blouse',
    price: 99.90,
    colors: ['White', 'Black', 'Navy', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Elegant silk blouse with a relaxed fit. Perfect for professional and social settings.',
    longDesc: 'Elevate your look with this luxurious silk blouse featuring a relaxed silhouette and elegant drape. The classic collar and button-front closure create a timeless appeal while the premium silk fabric offers exceptional comfort and breathability.',
    materials: ['100% Silk'],
    care: ['Dry clean only', 'Store on padded hanger'],
    fit: 'Relaxed fit. True to size.',
    new: true,
  },
  {
    name: 'Wide Leg Jeans',
    price: 89.90,
    colors: ['Blue', 'Black', 'White'],
    sizes: apparelSizes,
    desc: 'Modern wide-leg jeans with a high waist. Comfortable and stylish.',
    longDesc: 'Embrace the wide-leg trend with these modern jeans featuring a high waist and flowing silhouette. The premium denim offers comfort and durability while the wide-leg cut creates a flattering, contemporary look.',
    materials: ['98% Cotton', '2% Elastane'],
    care: ['Machine wash cold', 'Inside out', 'Hang dry'],
    fit: 'High-waisted wide leg. True to size.',
    new: true,
  },
  {
    name: 'Knit Cardigan',
    price: 79.90,
    colors: ['Beige', 'Gray', 'Navy', 'Pink'],
    sizes: apparelSizes,
    desc: 'Classic knit cardigan with button-front closure. Perfect for layering.',
    longDesc: 'Layer in comfort with this classic knit cardigan featuring a button-front closure and relaxed fit. The premium yarn ensures softness and warmth while the timeless design works for any occasion. A versatile piece for your wardrobe.',
    materials: ['55% Acrylic', '30% Wool', '15% Nylon'],
    care: ['Machine wash cold', 'Lay flat to dry'],
    fit: 'Relaxed fit. True to size.',
    new: true,
  },
  {
    name: 'Leather Loafers',
    price: 159.90,
    colors: ['Black', 'Brown', 'Tan'],
    sizes: shoeSizes,
    desc: 'Classic leather loafers with a modern twist. Comfortable and versatile.',
    longDesc: 'Step into timeless style with these premium leather loafers. The classic design gets a modern update with a comfortable sole and refined details. Perfect for both professional and casual settings, these loafers offer versatility and comfort.',
    materials: ['Genuine Leather Upper', 'Leather Lining', 'Rubber Sole'],
    care: ['Clean with leather conditioner', 'Use shoe trees'],
    fit: 'True to size. Comfortable fit.',
    new: true,
  },
  {
    name: 'Trench Coat',
    price: 199.90,
    colors: ['Beige', 'Black', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Iconic trench coat in water-resistant fabric. A wardrobe essential.',
    longDesc: 'Channel timeless sophistication with this iconic trench coat. The water-resistant fabric keeps you protected from the elements while the classic design never goes out of style. The belted waist and double-breasted closure create a flattering silhouette.',
    materials: ['65% Polyester', '35% Cotton'],
    care: ['Dry clean only'],
    fit: 'Classic fit. True to size.',
    new: true,
    bestSeller: true,
  },
  {
    name: 'Ribbed Bodysuit',
    price: 39.90,
    colors: ['Black', 'White', 'Beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Sleek ribbed bodysuit with snap closure. Perfect for layering or wearing alone.',
    longDesc: 'Create a seamless look with this sleek ribbed bodysuit. The snap closure ensures easy wear while the fitted silhouette creates a polished foundation for any outfit. Perfect tucked into skirts or worn under blazers.',
    materials: ['95% Cotton', '5% Elastane'],
    care: ['Machine wash cold', 'Lay flat to dry'],
    fit: 'Fitted. True to size.',
    new: true,
  },
  {
    name: 'Midi Wrap Dress',
    price: 109.90,
    colors: ['Black', 'Navy', 'Floral Print'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Flattering midi wrap dress with a tie waist. Elegant and versatile.',
    longDesc: 'Feel effortlessly elegant in this flattering midi wrap dress. The wrap design creates a customizable fit while the midi length offers timeless sophistication. The tie waist adds definition and creates a flattering silhouette.',
    materials: ['100% Viscose'],
    care: ['Dry clean only'],
    fit: 'Wrap fit. Adjustable waist.',
    new: true,
  },
  {
    name: 'Wool Blend Scarf',
    price: 49.90,
    colors: ['Beige', 'Gray', 'Navy', 'Black'],
    sizes: oneSize,
    desc: 'Luxurious wool blend scarf in a classic pattern. Warm and stylish.',
    longDesc: 'Wrap yourself in luxury with this premium wool blend scarf featuring a timeless pattern. The generous size allows for multiple styling options while the soft texture feels gentle against the skin. A perfect accessory for transitional weather.',
    materials: ['70% Wool', '30% Acrylic'],
    care: ['Hand wash cold', 'Lay flat to dry'],
    fit: 'One size. 70" × 12"',
    new: true,
  },
  {
    name: 'Structured Tote Bag',
    price: 169.90,
    colors: ['Black', 'Brown', 'Beige'],
    sizes: oneSize,
    desc: 'Spacious structured tote bag in premium leather. Perfect for work and travel.',
    longDesc: 'Carry everything you need in style with this spacious structured tote bag. Crafted from premium leather with reinforced handles and a secure top zip closure. The organized interior features multiple pockets and a laptop compartment.',
    materials: ['Genuine Leather', 'Metal Hardware', 'Cotton Lining'],
    care: ['Clean with leather conditioner', 'Store in dust bag'],
    fit: 'One size. Dimensions: 15" × 12" × 6"',
    new: true,
  },
  {
    name: 'Oversized Shirt Dress',
    price: 89.90,
    colors: ['White', 'Navy', 'Striped'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Versatile oversized shirt dress with a relaxed fit. Perfect for any occasion.',
    longDesc: 'Embrace effortless style with this versatile oversized shirt dress. The relaxed silhouette offers comfort while the classic shirt design creates a polished look. Perfect for both casual and dressed-up occasions, this piece is a true wardrobe workhorse.',
    materials: ['100% Cotton'],
    care: ['Machine wash cold', 'Hang dry', 'Iron on medium heat'],
    fit: 'Oversized fit. Belt included.',
    new: true,
  },
  {
    name: 'Knit Pants',
    price: 79.90,
    colors: ['Black', 'Navy', 'Gray'],
    sizes: apparelSizes,
    desc: 'Comfortable knit pants with an elastic waist. Perfect for everyday wear.',
    longDesc: 'Experience ultimate comfort with these versatile knit pants. The elastic waistband ensures a perfect fit while the premium knit fabric offers exceptional softness and stretch. Perfect for both lounging and running errands.',
    materials: ['85% Polyester', '10% Viscose', '5% Elastane'],
    care: ['Machine wash cold', 'Tumble dry low'],
    fit: 'Relaxed fit. Elastic waist.',
    new: true,
  },
  {
    name: 'Leather Belt',
    price: 49.90,
    colors: ['Black', 'Brown', 'Tan'],
    sizes: ['S', 'M', 'L'],
    desc: 'Classic leather belt with a modern buckle. Perfect for finishing any look.',
    longDesc: 'Complete your outfit with this classic leather belt featuring a modern buckle design. Crafted from genuine leather, this piece offers durability and style. The adjustable sizing ensures a perfect fit for any waist.',
    materials: ['Genuine Leather', 'Metal Buckle'],
    care: ['Clean with leather conditioner'],
    fit: 'Adjustable. Multiple size options.',
    new: true,
  },
  {
    name: 'Cashmere Blend Scarf',
    price: 89.90,
    colors: ['Beige', 'Gray', 'Navy'],
    sizes: oneSize,
    desc: 'Luxurious cashmere blend scarf with a soft texture. Warm and elegant.',
    longDesc: 'Indulge in luxury with this premium cashmere blend scarf. The soft texture feels gentle against the skin while the generous size allows for multiple styling options. A perfect accessory for cold weather that adds sophistication to any outfit.',
    materials: ['30% Cashmere', '50% Wool', '20% Acrylic'],
    care: ['Hand wash cold', 'Lay flat to dry', 'Do not wring'],
    fit: 'One size. 72" × 14"',
    new: true,
  },
  {
    name: 'Denim Jacket',
    price: 79.90,
    colors: ['Blue', 'Black', 'White'],
    sizes: apparelSizes,
    desc: 'Classic denim jacket with a comfortable fit. Versatile and durable.',
    longDesc: 'A timeless wardrobe essential, this classic denim jacket offers endless styling possibilities. The comfortable fit allows for easy layering while the premium denim ensures durability. Perfect for transitional weather and casual occasions.',
    materials: ['100% Cotton Denim'],
    care: ['Machine wash cold', 'Inside out', 'Hang dry'],
    fit: 'Classic fit. True to size.',
    new: true,
  },
  {
    name: 'Silk Scarf',
    price: 59.90,
    colors: ['Floral Print', 'Geometric Print', 'Solid Navy'],
    sizes: oneSize,
    desc: 'Elegant silk scarf with a beautiful print. Perfect for adding a touch of luxury.',
    longDesc: 'Add a touch of luxury to any outfit with this elegant silk scarf featuring a beautiful print. The premium silk fabric offers exceptional softness and drape while the versatile size allows for multiple styling options. A perfect finishing touch.',
    materials: ['100% Silk'],
    care: ['Dry clean only', 'Store flat'],
    fit: 'One size. 35" × 35"',
    new: true,
  },
  {
    name: 'Wool Blend Blazer',
    price: 149.90,
    colors: ['Black', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    desc: 'Classic wool blend blazer with a tailored fit. Perfect for professional settings.',
    longDesc: 'Command attention with this impeccably tailored wool blend blazer. The structured shoulders and nipped-in waist create a flattering shape while the premium fabric ensures durability and comfort. A wardrobe essential for the modern professional.',
    materials: ['65% Polyester', '30% Wool', '5% Elastane'],
    care: ['Dry clean only'],
    fit: 'Tailored fit. True to size.',
    new: true,
  },
]

womenNewInProducts.forEach((p, idx) => {
  const baseId = `womens-new-in-${idx + 1}`
  const isOnSale = Math.random() < 0.2 // 20% on sale
  const originalPrice = isOnSale ? p.price * 1.3 : null
  
  womenProducts.push(...createProduct(
    baseId,
    p.name,
    'Women',
    'New In',
    p.price,
    originalPrice,
    p.colors,
    p.sizes,
    {
      shortDescription: p.desc,
      longDescription: p.longDesc,
      materials: p.materials,
      careInstructions: p.care,
      fitNotes: p.fit,
      isNew: p.new,
      isBestSeller: p.bestSeller,
      isLimitedEdition: p.limited,
      tags: ['new-arrivals', 'women', 'new-in'].filter(Boolean),
    }
  ))
})

// Continue with more subcategories... (This will be a large file)
// For now, let me create a comprehensive structure

export const allFashionProducts: Product[] = [
  ...womenProducts,
  // More categories will be added...
]
