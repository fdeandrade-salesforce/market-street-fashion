/**
 * Product Image & Video Configuration
 *
 * Maps product variant IDs to their corresponding image files in
 * public/images/products/{womens|mens|kids}/. Files follow the pattern:
 * {category}-{product-name}-{color}-{NN}.png (e.g., womens-silk-midi-dress-pink-01.png)
 *
 * Videos are assigned to specific variants only.
 */

interface VariantImageConfig {
  folder: 'womens' | 'mens' | 'kids'
  prefix: string
  count: number
  video?: string
}

const V: Record<string, VariantImageConfig> = {
  // ====================== WOMEN ======================

  // Ribbed Tank Top (special naming: "womens-ribbed-tank-{color}-top")
  'ribbed-tank-top':       { folder: 'womens', prefix: 'womens-ribbed-tank-black-top', count: 4 },
  'ribbed-tank-top-white': { folder: 'womens', prefix: 'womens-ribbed-tank-white-top', count: 4, video: 'womens-ribbed-tank-white-top.mp4' },
  'ribbed-tank-top-beige': { folder: 'womens', prefix: 'womens-ribbed-tank-beige-top', count: 4 },

  // Oversized Blazer
  'oversized-blazer':       { folder: 'womens', prefix: 'womens-oversized-blazer-black', count: 4 },
  'oversized-blazer-navy':  { folder: 'womens', prefix: 'womens-oversized-blazer-navy', count: 4 },
  'oversized-blazer-beige': { folder: 'womens', prefix: 'womens-oversized-blazer-beige', count: 4, video: 'womens-oversized-blazer-beige.mp4' },

  // Wide Leg Trousers
  'wide-leg-trousers':       { folder: 'womens', prefix: 'womens-wide-leg-trousers-black', count: 4 },
  'wide-leg-trousers-cream': { folder: 'womens', prefix: 'womens-wide-leg-trousers-cream', count: 4 },
  'wide-leg-trousers-navy':  { folder: 'womens', prefix: 'womens-wide-leg-trousers-navy', count: 4 },

  // Silk Midi Dress
  'silk-midi-dress':      { folder: 'womens', prefix: 'womens-silk-midi-dress-black', count: 4 },
  'silk-midi-dress-navy': { folder: 'womens', prefix: 'womens-silk-midi-dress-navy', count: 4 },
  'silk-midi-dress-pink': { folder: 'womens', prefix: 'womens-silk-midi-dress-pink', count: 4, video: 'womens-silk-midi-dress-pink.mp4' },

  // Leather Ankle Boots
  'leather-ankle-boots':       { folder: 'womens', prefix: 'womens-leather-ankle-boots-black', count: 6 },
  'leather-ankle-boots-brown': { folder: 'womens', prefix: 'womens-leather-ankle-boots-brown', count: 5 },
  'leather-ankle-boots-tan':   { folder: 'womens', prefix: 'womens-leather-ankle-boots-tan', count: 4 },

  // Oversized T-Shirt
  'oversized-t-shirt':       { folder: 'womens', prefix: 'womens-oversized-t-shirt-white', count: 4 },
  'oversized-t-shirt-black': { folder: 'womens', prefix: 'womens-oversized-t-shirt-black', count: 4 },
  'oversized-t-shirt-gray':  { folder: 'womens', prefix: 'womens-oversized-t-shirt-gray', count: 4 },

  // High Waist Jeans (was "High-Waisted Jeans" in old naming)
  'high-waisted-jeans':       { folder: 'womens', prefix: 'womens-high-waist-jeans-blue', count: 5 },
  'high-waisted-jeans-black': { folder: 'womens', prefix: 'womens-high-waist-jeans-black', count: 5 },
  'high-waisted-jeans-white': { folder: 'womens', prefix: 'womens-high-waist-jeans-white', count: 5 },

  // Structured Handbag - note: we have "womens-structured-handbag-beige" and "womens-structured-handbag-brown"
  // but "black" variant uses "womens-shoulder-bag-black"
  'structured-handbag':       { folder: 'womens', prefix: 'womens-shoulder-bag-black', count: 4, video: 'womens-shoulder-bag-black.mp4' },
  'structured-handbag-brown': { folder: 'womens', prefix: 'womens-structured-handbag-brown', count: 4 },
  'structured-handbag-beige': { folder: 'womens', prefix: 'womens-structured-handbag-beige', count: 4 },

  // Wool Blend Coat
  'wool-blend-coat':       { folder: 'womens', prefix: 'womens-wool-blend-coat-black', count: 5 },
  'wool-blend-coat-navy':  { folder: 'womens', prefix: 'womens-wool-coat-navy', count: 6 },
  'wool-blend-coat-beige': { folder: 'womens', prefix: 'womens-wool-blend-coat-beige', count: 4 },

  // Silk Blouse
  'silk-blouse':       { folder: 'womens', prefix: 'womens-silk-blouse-white', count: 4 },
  'silk-blouse-black': { folder: 'womens', prefix: 'womens-silk-blouse-black', count: 4 },
  'silk-blouse-navy':  { folder: 'womens', prefix: 'womens-silk-blouse-navy', count: 5 },

  // Knit Midi Skirt
  'knit-midi-skirt':       { folder: 'womens', prefix: 'womens-knit-midi-skirt-black', count: 4 },
  'knit-midi-skirt-beige': { folder: 'womens', prefix: 'womens-knit-midi-skirt-beige', count: 4 },
  'knit-midi-skirt-navy':  { folder: 'womens', prefix: 'womens-knit-midi-skirt-navy', count: 4 },

  // Cropped Cardigan
  'cropped-cardigan':       { folder: 'womens', prefix: 'womens-cropped-cardigan-beige', count: 4 },
  'cropped-cardigan-black': { folder: 'womens', prefix: 'womens-cropped-cardigan-black', count: 4 },
  'cropped-cardigan-gray':  { folder: 'womens', prefix: 'womens-cropped-cardigan-gray', count: 4 },

  // Satin Slip Dress
  'satin-slip-dress':       { folder: 'womens', prefix: 'womens-slip-dress-black', count: 4 },
  'satin-slip-dress-ivory': { folder: 'womens', prefix: 'womens-satin-slip-dress-ivory', count: 4 },

  // Pleated Midi Skirt
  'pleated-midi-skirt':      { folder: 'womens', prefix: 'womens-pleated-skirt-black', count: 4 },
  'pleated-midi-skirt-navy': { folder: 'womens', prefix: 'womens-pleated-skirt-navy', count: 4 },

  // Leather Crossbody Bag
  'leather-crossbody-bag':       { folder: 'womens', prefix: 'womens-crossbody-bag-black', count: 4 },
  'leather-crossbody-bag-brown': { folder: 'womens', prefix: 'womens-crossbody-bag-brown', count: 5, video: 'womens-crossbody-bag-brown.mp4' },
  'leather-crossbody-bag-camel': { folder: 'womens', prefix: 'womens-leather-crossbody-bag-camel', count: 4 },

  // Oversized Denim Shirt
  'oversized-denim-shirt':       { folder: 'womens', prefix: 'womens-oversized-denim-shirt', count: 5 },
  'oversized-denim-shirt-black': { folder: 'womens', prefix: 'womens-oversized-denim-shirt-black', count: 4, video: 'womens-oversized-denim-shirt-black.mp4' },

  // Wool Blend Scarf
  'wool-blend-scarf':      { folder: 'womens', prefix: 'womens-wool-blend-scarf-beige', count: 4 },
  'wool-blend-scarf-gray': { folder: 'womens', prefix: 'womens-wool-blend-scarf-gray', count: 4 },
  'wool-blend-scarf-navy': { folder: 'womens', prefix: 'womens-silk-scarf-navy', count: 4 },

  // Tailored Blazer (women's)
  'tailored-blazer':      { folder: 'womens', prefix: 'womens-oversized-blazer-black', count: 4 },
  'tailored-blazer-gray': { folder: 'womens', prefix: 'womens-oversized-blazer-beige', count: 4 },
  'tailored-blazer-navy': { folder: 'womens', prefix: 'womens-oversized-blazer-navy', count: 4 },

  // ====================== MEN ======================

  // Slim Fit Chinos
  'slim-fit-chinos':       { folder: 'mens', prefix: 'mens-slim-fit-chinos-black', count: 4 },
  'slim-fit-chinos-navy':  { folder: 'mens', prefix: 'mens-slim-chinos-navy', count: 4 },
  'slim-fit-chinos-beige': { folder: 'mens', prefix: 'mens-slim-chinos-beige', count: 4 },

  // Oxford Shirt
  'oxford-shirt':      { folder: 'mens', prefix: 'mens-oxford-shirt-white', count: 6 },
  'oxford-shirt-blue': { folder: 'mens', prefix: 'mens-oxford-shirt-blue', count: 4 },
  'oxford-shirt-pink': { folder: 'mens', prefix: 'mens-oxford-shirt-pink', count: 4 },

  // Merino Wool Sweater
  'merino-wool-sweater':       { folder: 'mens', prefix: 'mens-merino-sweater-navy', count: 4 },
  'merino-wool-sweater-black': { folder: 'mens', prefix: 'mens-merino-sweater-black', count: 4 },
  'merino-wool-sweater-gray':  { folder: 'mens', prefix: 'mens-merino-sweater-gray', count: 4 },

  // Leather Chelsea Boots
  'leather-chelsea-boots':       { folder: 'mens', prefix: 'mens-chelsea-boots-black', count: 4 },
  'leather-chelsea-boots-brown': { folder: 'mens', prefix: 'mens-chelsea-boots-brown', count: 4 },

  // Tailored Suit Jacket (men's) - Black has special description images, Gray & Navy are standard
  'tailored-suit-jacket':      { folder: 'mens', prefix: 'mens-tailored-blazer-black', count: 5 },
  'tailored-suit-jacket-navy': { folder: 'mens', prefix: 'mens-tailored-blazer-navy', count: 4 },
  'tailored-suit-jacket-gray': { folder: 'mens', prefix: 'mens-tailored-blazer-gray', count: 4 },

  // Tailored Suit Trousers
  'tailored-suit-trousers':      { folder: 'mens', prefix: 'mens-tailored-trousers-black', count: 5 },
  'tailored-suit-trousers-gray': { folder: 'mens', prefix: 'mens-tailored-trousers-gray', count: 4 },
  'tailored-suit-trousers-navy': { folder: 'mens', prefix: 'mens-tailored-trousers-navy', count: 4 },

  // Classic Denim Jacket
  'classic-denim-jacket':       { folder: 'mens', prefix: 'mens-denim-jacket-blue', count: 5, video: 'mens-denim-jacket-blue.mp4' },
  'classic-denim-jacket-black': { folder: 'mens', prefix: 'mens-denim-jacket-black', count: 4 },

  // Crew Neck T-Shirt
  'crew-neck-t-shirt':       { folder: 'mens', prefix: 'mens-crew-neck-t-shirt-white', count: 4 },
  'crew-neck-t-shirt-black': { folder: 'mens', prefix: 'mens-crew-neck-t-shirt-black', count: 3 },
  'crew-neck-t-shirt-gray':  { folder: 'mens', prefix: 'mens-crew-neck-t-shirt-gray', count: 4 },
  'crew-neck-t-shirt-navy':  { folder: 'mens', prefix: 'mens-crew-neck-t-shirt-navy', count: 4 },

  // Slim Fit Jeans
  'slim-fit-jeans':       { folder: 'mens', prefix: 'mens-straight-jeans-blue', count: 4 },
  'slim-fit-jeans-black': { folder: 'mens', prefix: 'mens-straight-jeans-black', count: 6 },

  // Leather Belt
  'leather-belt':       { folder: 'mens', prefix: 'mens-leather-belt-black', count: 4 },
  'leather-belt-brown': { folder: 'mens', prefix: 'mens-leather-belt-brown', count: 4 },

  // Bomber Jacket
  'bomber-jacket':       { folder: 'mens', prefix: 'mens-bomber-jacket-black', count: 5, video: 'mens-bomber-jacket-black.mp4' },
  'bomber-jacket-green': { folder: 'mens', prefix: 'mens-bomber-jacket-green', count: 3 },
  'bomber-jacket-navy':  { folder: 'mens', prefix: 'mens-bomber-jacket-navy', count: 3 },

  // Cashmere Scarf
  'cashmere-scarf':       { folder: 'mens', prefix: 'mens-wool-scarf-gray', count: 4 },
  'cashmere-scarf-navy':  { folder: 'mens', prefix: 'mens-wool-scarf-navy', count: 4, video: 'mens-wool-scarf-navy.mp4' },
  'cashmere-scarf-camel': { folder: 'mens', prefix: 'mens-cashmere-scarf-camel', count: 6 },

  // Leather Messenger Bag
  'leather-messenger-bag':       { folder: 'mens', prefix: 'mens-messenger-bag-black', count: 4 },
  'leather-messenger-bag-brown': { folder: 'mens', prefix: 'mens-messenger-bag-brown', count: 4 },

  // Wool Blend Overcoat
  'wool-blend-overcoat':       { folder: 'mens', prefix: 'mens-wool-overcoat-black', count: 4 },
  'wool-blend-overcoat-camel': { folder: 'mens', prefix: 'mens-wool-overcoat-camel', count: 5 },
  'wool-blend-overcoat-navy':  { folder: 'mens', prefix: 'mens-wool-overcoat-navy', count: 5 },

  // ====================== KIDS ======================

  // Kids Hooded Jacket - note: we have "kids-puffer-jacket" variants
  'kids-hooded-jacket':      { folder: 'kids', prefix: 'kids-puffer-jacket-pink', count: 5 },
  'kids-hooded-jacket-navy': { folder: 'kids', prefix: 'kids-puffer-jacket-navy', count: 6 },
  'kids-hooded-jacket-red':  { folder: 'kids', prefix: 'kids-hooded-jacket-red', count: 4 },

  // Kids Denim Jeans
  'kids-denim-jeans':       { folder: 'kids', prefix: 'girls-denim-jeans-blue', count: 4, video: 'girls-denim-jeans-blue.mp4' },
  'kids-denim-jeans-black': { folder: 'kids', prefix: 'girls-denim-jeans-black', count: 5 },

  // Kids Graphic T-Shirt
  'kids-graphic-t-shirt':      { folder: 'kids', prefix: 'kids-graphic-tee-white', count: 6 },
  'kids-graphic-t-shirt-gray': { folder: 'kids', prefix: 'kids-graphic-tee-gray', count: 6 },
  'kids-graphic-t-shirt-navy': { folder: 'kids', prefix: 'kids-graphic-t-shirt-navy', count: 4 },

  // Kids Floral Dress
  'kids-floral-dress':       { folder: 'kids', prefix: 'girls-floral-dress-pink', count: 4 },
  'kids-floral-dress-blue':  { folder: 'kids', prefix: 'girls-floral-dress-blue', count: 5 },
  'kids-floral-dress-white': { folder: 'kids', prefix: 'kids-floral-dress-white', count: 4 },

  // Kids Sneakers
  'kids-sneakers':       { folder: 'kids', prefix: 'kids-sneakers-white', count: 4, video: 'kids-sneakers-white.mp4' },
  'kids-sneakers-black': { folder: 'kids', prefix: 'kids-sneakers-black', count: 5 },
  'kids-sneakers-blue':  { folder: 'kids', prefix: 'kids-sneakers-blue', count: 4 },

  // Kids Knit Cardigan
  'kids-knit-cardigan':      { folder: 'kids', prefix: 'kids-knit-cardigan-beige', count: 5 },
  'kids-knit-cardigan-pink': { folder: 'kids', prefix: 'girls-cardigan-pink', count: 5 },

  // Kids Cargo Shorts
  'kids-cargo-shorts':      { folder: 'kids', prefix: 'kids-cargo-shorts-beige', count: 4 },
  'kids-cargo-shorts-navy': { folder: 'kids', prefix: 'boys-shorts-navy', count: 5, video: 'boys-shorts-navy.mp4' },
  'kids-cargo-shorts-gray': { folder: 'kids', prefix: 'boys-shorts-gray', count: 5 },

  // Kids Rain Jacket
  'kids-rain-jacket':      { folder: 'kids', prefix: 'kids-rain-jacket-yellow', count: 6, video: 'kids-rain-jacket-yellow.mp4' },
  'kids-rain-jacket-navy': { folder: 'kids', prefix: 'kids-puffer-jacket-navy', count: 6 },
  'kids-rain-jacket-pink': { folder: 'kids', prefix: 'kids-puffer-jacket-pink', count: 5 },
}

/**
 * Get a single image path for a product variant.
 * @param productId  Variant-specific ID (e.g. 'silk-midi-dress-pink')
 * @param imageIndex 1-based image number
 * @param _color     Ignored — kept for backward compat
 */
export function getLocalProductImagePath(productId: string, imageIndex: number, _color?: string): string {
  const cfg = V[productId]
  if (!cfg) return '/images/placeholder.png'

  const idx = String(imageIndex).padStart(2, '0')
  return `/images/products/${cfg.folder}/${cfg.prefix}-${idx}.png`
}

/**
 * Get all image paths for a product variant.
 * @param productId  Variant-specific ID
 * @param _color     Ignored — kept for backward compat
 * @param _count     Ignored — count comes from the config
 */
export function getLocalProductImages(productId: string, _color?: string, _count?: number): string[] {
  const cfg = V[productId]
  if (!cfg) return []

  return Array.from({ length: cfg.count }, (_, i) =>
    getLocalProductImagePath(productId, i + 1)
  )
}

/**
 * Get video path for a product variant (only returns a path if this specific variant has a video).
 */
export function getProductVideoPath(productId: string): string | null {
  const cfg = V[productId]
  if (!cfg?.video) return null
  return `/images/products/${cfg.folder}/${cfg.video}`
}
