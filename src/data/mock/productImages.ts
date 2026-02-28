/**
 * Product Image & Video Configuration
 *
 * Each product variant has an explicit entry mapping to the exact filenames in
 * public/images/products/{folder}/. No dynamic color lookups or overrides needed.
 *
 * Videos are assigned to a single variant only (not inherited across color variants).
 */

interface VariantImageConfig {
  folder: 'womens' | 'mens' | 'kids'
  filenameBase: string
  count: number
  video?: string
  files?: string[]
}

const V: Record<string, VariantImageConfig> = {
  // ====================== WOMEN ======================

  // Ribbed Tank Top (special naming: "Ribbed Tank {Color} Top")
  'ribbed-tank-top':       { folder: 'womens', filenameBase: 'Ribbed Tank Black Top', count: 4 },
  'ribbed-tank-top-white': { folder: 'womens', filenameBase: 'Ribbed Tank White Top', count: 4, video: 'video-223.mp4' },
  'ribbed-tank-top-beige': { folder: 'womens', filenameBase: 'Ribbed Tank Beige Top', count: 4 },

  // Oversized Blazer
  'oversized-blazer':       { folder: 'womens', filenameBase: 'Oversized Blazer Black', count: 4 },
  'oversized-blazer-navy':  { folder: 'womens', filenameBase: 'Oversized Blazer Navy', count: 4 },
  'oversized-blazer-beige': { folder: 'womens', filenameBase: 'Oversized Blazer Beige', count: 4, video: 'video-220.mp4' },

  // Wide Leg Trousers
  'wide-leg-trousers':       { folder: 'womens', filenameBase: 'Wide Leg Trousers Black', count: 4 },
  'wide-leg-trousers-cream': { folder: 'womens', filenameBase: 'Wide Leg Trousers Cream', count: 4 },
  'wide-leg-trousers-navy':  { folder: 'womens', filenameBase: 'Wide Leg Trousers Navy', count: 4 },

  // Silk Midi Dress
  'silk-midi-dress':      { folder: 'womens', filenameBase: 'Silk Midi Dress Black', count: 4 },
  'silk-midi-dress-navy': { folder: 'womens', filenameBase: 'Silk Midi Dress Navy', count: 4 },
  'silk-midi-dress-pink': { folder: 'womens', filenameBase: 'Silk Midi Dress Pink', count: 4, video: 'video-221.mp4' },

  // Leather Ankle Boots
  'leather-ankle-boots':       { folder: 'womens', filenameBase: 'Leather Ankle Boots Black', count: 6 },
  'leather-ankle-boots-brown': { folder: 'womens', filenameBase: 'Leather Ankle Boots Brown', count: 5 },
  'leather-ankle-boots-tan':   { folder: 'womens', filenameBase: 'Leather Ankle Boots Tan', count: 4 },

  // Oversized T-Shirt
  'oversized-t-shirt':       { folder: 'womens', filenameBase: 'Oversized T-Shirt White', count: 4 },
  'oversized-t-shirt-black': { folder: 'womens', filenameBase: 'Oversized T-Shirt Black', count: 4 },
  'oversized-t-shirt-gray':  { folder: 'womens', filenameBase: 'Oversized T-Shirt Gray', count: 4 },

  // High-Waisted Jeans
  'high-waisted-jeans':       { folder: 'womens', filenameBase: 'High-Waisted Jeans Blue', count: 5 },
  'high-waisted-jeans-black': { folder: 'womens', filenameBase: 'High-Waisted Jeans Black', count: 5 },
  'high-waisted-jeans-white': { folder: 'womens', filenameBase: 'High-Waisted Jeans White', count: 5 },

  // Structured Handbag
  'structured-handbag':       { folder: 'womens', filenameBase: 'Structured Handbag Black', count: 4, video: 'video-222.mp4' },
  'structured-handbag-brown': { folder: 'womens', filenameBase: 'Structured Handbag Brown', count: 4 },
  'structured-handbag-beige': { folder: 'womens', filenameBase: 'Structured Handbag Beige', count: 4 },

  // Wool Blend Coat
  'wool-blend-coat':       { folder: 'womens', filenameBase: 'Wool Blend Coat Black', count: 5 },
  'wool-blend-coat-navy':  { folder: 'womens', filenameBase: 'Wool Blend Coat Navy', count: 6 },
  'wool-blend-coat-beige': { folder: 'womens', filenameBase: 'Wool Blend Coat Beige', count: 4 },

  // Silk Blouse
  'silk-blouse':       { folder: 'womens', filenameBase: 'Silk Blouse White', count: 4 },
  'silk-blouse-black': { folder: 'womens', filenameBase: 'Silk Blouse Black', count: 4 },
  'silk-blouse-navy':  { folder: 'womens', filenameBase: 'Silk Blouse Navy', count: 5 },

  // Knit Midi Skirt
  'knit-midi-skirt':       { folder: 'womens', filenameBase: 'Knit Midi Skirt Black', count: 4 },
  'knit-midi-skirt-beige': { folder: 'womens', filenameBase: 'Knit Midi Skirt Beige', count: 4 },
  'knit-midi-skirt-navy':  { folder: 'womens', filenameBase: 'Knit Midi Skirt Navy', count: 4 },

  // Cropped Cardigan
  'cropped-cardigan':       { folder: 'womens', filenameBase: 'Cropped Cardigan Beige', count: 4 },
  'cropped-cardigan-black': { folder: 'womens', filenameBase: 'Cropped Cardigan Black', count: 4 },
  'cropped-cardigan-gray':  { folder: 'womens', filenameBase: 'Cropped Cardigan Gray', count: 4 },

  // Satin Slip Dress
  'satin-slip-dress':       { folder: 'womens', filenameBase: 'Satin Slip Dress Black', count: 4 },
  'satin-slip-dress-ivory': { folder: 'womens', filenameBase: 'Satin Slip Dress Ivory', count: 4 },

  // Pleated Midi Skirt
  'pleated-midi-skirt':      { folder: 'womens', filenameBase: 'Pleated Midi Skirt Black', count: 4 },
  'pleated-midi-skirt-navy': { folder: 'womens', filenameBase: 'Pleated Midi Skirt Navy', count: 4 },

  // Leather Crossbody Bag
  'leather-crossbody-bag':       { folder: 'womens', filenameBase: 'Leather Crossbody Bag Black', count: 4 },
  'leather-crossbody-bag-brown': { folder: 'womens', filenameBase: 'Leather Crossbody Bag Brown', count: 5, video: 'video-89.mp4' },
  'leather-crossbody-bag-camel': { folder: 'womens', filenameBase: 'Leather Crossbody Bag Camel', count: 4 },

  // Oversized Denim Shirt (Blue variant has no color suffix in filename)
  'oversized-denim-shirt':       { folder: 'womens', filenameBase: 'Oversized Denim Shirt', count: 5 },
  'oversized-denim-shirt-black': { folder: 'womens', filenameBase: 'Oversized Denim Shirt Black', count: 4, video: 'video-88.mp4' },

  // Wool Blend Scarf (files use "Grey" for Gray)
  'wool-blend-scarf':      { folder: 'womens', filenameBase: 'Wool Blend Scarf Beige', count: 4 },
  'wool-blend-scarf-gray': { folder: 'womens', filenameBase: 'Wool Blend Scarf Grey', count: 4 },
  'wool-blend-scarf-navy': { folder: 'womens', filenameBase: 'Wool Blend Scarf Navy', count: 4 },

  // Tailored Blazer
  'tailored-blazer':      { folder: 'womens', filenameBase: 'Tailored Blazer Black', count: 5 },
  'tailored-blazer-gray': { folder: 'womens', filenameBase: 'Tailored Blazer Gray', count: 4 },
  'tailored-blazer-navy': { folder: 'womens', filenameBase: 'Tailored Blazer Navy', count: 4 },

  // ====================== MEN ======================

  // Slim Fit Chinos
  'slim-fit-chinos':       { folder: 'mens', filenameBase: 'Slim Fit Chinos Black', count: 4 },
  'slim-fit-chinos-navy':  { folder: 'mens', filenameBase: 'Slim Fit Chinos Navy', count: 4 },
  'slim-fit-chinos-beige': { folder: 'mens', filenameBase: 'Slim Fit Chinos Beige', count: 4 },

  // Oxford Shirt
  'oxford-shirt':      { folder: 'mens', filenameBase: 'Oxford Shirt White', count: 6 },
  'oxford-shirt-blue': { folder: 'mens', filenameBase: 'Oxford Shirt Blue', count: 4 },
  'oxford-shirt-pink': { folder: 'mens', filenameBase: 'Oxford Shirt Pink', count: 4 },

  // Merino Wool Sweater
  'merino-wool-sweater':       { folder: 'mens', filenameBase: 'Merino Wool Sweater Navy', count: 4 },
  'merino-wool-sweater-black': { folder: 'mens', filenameBase: 'Merino Wool Sweater Black', count: 4 },
  'merino-wool-sweater-gray':  { folder: 'mens', filenameBase: 'Merino Wool Sweater Gray', count: 4 },

  // Leather Chelsea Boots
  'leather-chelsea-boots':       { folder: 'mens', filenameBase: 'Leather Chelsea Boots Black', count: 4 },
  'leather-chelsea-boots-brown': { folder: 'mens', filenameBase: 'Leather Chelsea Boots Brown', count: 4 },

  // Tailored Suit Jacket (Black has special-named images; Gray & Navy are standard)
  'tailored-suit-jacket': {
    folder: 'mens', filenameBase: '', count: 0,
    files: [
      'Studio Model Shot - Black Suit Jacket.png',
      'Catalog Packshot - Black Suit Jacket.png',
      'Detail Shot - Black Suit Jacket Fabric.png',
      'Lifestyle Context Shot - Black Suit Jacket.png',
    ],
  },
  'tailored-suit-jacket-navy': { folder: 'mens', filenameBase: 'Suit Jacket Navy', count: 4 },
  'tailored-suit-jacket-gray': { folder: 'mens', filenameBase: 'Suit Jacket Gray', count: 4 },

  // Tailored Suit Trousers
  'tailored-suit-trousers':      { folder: 'mens', filenameBase: 'Tailored Suit Trousers Black', count: 5 },
  'tailored-suit-trousers-gray': { folder: 'mens', filenameBase: 'Tailored Suit Trousers Gray', count: 4 },
  'tailored-suit-trousers-navy': { folder: 'mens', filenameBase: 'Tailored Suit Trousers Navy', count: 4 },

  // Classic Denim Jacket (files use "Denim Jacket")
  'classic-denim-jacket':       { folder: 'mens', filenameBase: 'Denim Jacket Blue', count: 5, video: 'video-77.mp4' },
  'classic-denim-jacket-black': { folder: 'mens', filenameBase: 'Denim Jacket Black', count: 4 },

  // Crew Neck T-Shirt
  'crew-neck-t-shirt':       { folder: 'mens', filenameBase: 'Crew Neck T-Shirt White', count: 4 },
  'crew-neck-t-shirt-black': { folder: 'mens', filenameBase: 'Crew Neck T-Shirt Black', count: 3 },
  'crew-neck-t-shirt-gray':  { folder: 'mens', filenameBase: 'Crew Neck T-Shirt Gray', count: 4 },
  'crew-neck-t-shirt-navy':  { folder: 'mens', filenameBase: 'Crew Neck T-Shirt Navy', count: 4 },

  // Slim Fit Jeans
  'slim-fit-jeans':       { folder: 'mens', filenameBase: 'Slim Fit Jeans Blue', count: 4 },
  'slim-fit-jeans-black': { folder: 'mens', filenameBase: 'Slim Fit Jeans Black', count: 6 },

  // Leather Belt (files have typo "Bown" for Brown)
  'leather-belt':       { folder: 'mens', filenameBase: 'Leather Belt Black', count: 4 },
  'leather-belt-brown': { folder: 'mens', filenameBase: 'Leather Belt Bown', count: 4 },

  // Bomber Jacket (files use "Green" for Olive)
  'bomber-jacket':       { folder: 'mens', filenameBase: 'Bomber Jacket Black', count: 5, video: 'video-120.mp4' },
  'bomber-jacket-green': { folder: 'mens', filenameBase: 'Bomber Jacket Green', count: 3 },
  'bomber-jacket-navy':  { folder: 'mens', filenameBase: 'Bomber Jacket Navy', count: 3 },

  // Cashmere Scarf
  'cashmere-scarf':       { folder: 'mens', filenameBase: 'Cashmere Scarf Gray', count: 4 },
  'cashmere-scarf-navy':  { folder: 'mens', filenameBase: 'Cashmere Scarf Navy', count: 4, video: 'video-135.mp4' },
  'cashmere-scarf-camel': { folder: 'mens', filenameBase: 'Cashmere Scarf Camel', count: 6 },

  // Leather Messenger Bag
  'leather-messenger-bag':       { folder: 'mens', filenameBase: 'Leather Messenger Bag Black', count: 4 },
  'leather-messenger-bag-brown': { folder: 'mens', filenameBase: 'Leather Messenger Bag Brown', count: 4 },

  // Wool Blend Overcoat
  'wool-blend-overcoat':       { folder: 'mens', filenameBase: 'Wool Blend Overcoat Black', count: 4 },
  'wool-blend-overcoat-camel': { folder: 'mens', filenameBase: 'Wool Blend Overcoat Camel', count: 5 },
  'wool-blend-overcoat-navy':  { folder: 'mens', filenameBase: 'Wool Blend Overcoat Navy', count: 5 },

  // ====================== KIDS ======================

  // Kids Hooded Jacket
  'kids-hooded-jacket':      { folder: 'kids', filenameBase: 'Kids Hooded Jacket Pink', count: 4 },
  'kids-hooded-jacket-navy': { folder: 'kids', filenameBase: 'Kids Hooded Jacket Navy', count: 5 },
  'kids-hooded-jacket-red':  { folder: 'kids', filenameBase: 'Kids Hooded Jacket Red', count: 4 },

  // Kids Denim Jeans
  'kids-denim-jeans':       { folder: 'kids', filenameBase: 'Kids Denim Jeans Blue', count: 4, video: 'video-94.mp4' },
  'kids-denim-jeans-black': { folder: 'kids', filenameBase: 'Kids Denim Jeans Black', count: 5 },

  // Kids Graphic T-Shirt
  'kids-graphic-t-shirt':      { folder: 'kids', filenameBase: 'Kids Graphic T-Shirt White', count: 6 },
  'kids-graphic-t-shirt-gray': { folder: 'kids', filenameBase: 'Kids Graphic T-Shirt Gray', count: 6 },
  'kids-graphic-t-shirt-navy': { folder: 'kids', filenameBase: 'Kids Graphic T-Shirt Navy', count: 4 },

  // Kids Floral Dress
  'kids-floral-dress':       { folder: 'kids', filenameBase: 'Kids Floral Dress Pink', count: 4 },
  'kids-floral-dress-blue':  { folder: 'kids', filenameBase: 'Kids Floral Dress Blue', count: 5 },
  'kids-floral-dress-white': { folder: 'kids', filenameBase: 'Kids Floral Dress White', count: 4 },

  // Kids Sneakers
  'kids-sneakers':       { folder: 'kids', filenameBase: 'Kids Sneakers White', count: 4, video: 'video-55.mp4' },
  'kids-sneakers-black': { folder: 'kids', filenameBase: 'Kids Sneakers Black', count: 5 },
  'kids-sneakers-blue':  { folder: 'kids', filenameBase: 'Kids Sneakers Blue', count: 4 },

  // Kids Knit Cardigan
  'kids-knit-cardigan':      { folder: 'kids', filenameBase: 'Kids Knit Cardigan Beige', count: 5 },
  'kids-knit-cardigan-pink': { folder: 'kids', filenameBase: 'Kids Knit Cardigan Pink', count: 5 },

  // Kids Cargo Shorts (product "Khaki" = files "Beige")
  'kids-cargo-shorts':      { folder: 'kids', filenameBase: 'Kids Cargo Shorts Beige', count: 4 },
  'kids-cargo-shorts-navy': { folder: 'kids', filenameBase: 'Kids Cargo Shorts Navy', count: 4, video: 'video-36.mp4' },
  'kids-cargo-shorts-gray': { folder: 'kids', filenameBase: 'Kids Cargo Shorts Gray', count: 5 },

  // Kids Rain Jacket
  'kids-rain-jacket':      { folder: 'kids', filenameBase: 'Kids Rain Jacket Yellow', count: 6, video: 'video-35.mp4' },
  'kids-rain-jacket-navy': { folder: 'kids', filenameBase: 'Kids Rain Jacket Navy', count: 6 },
  'kids-rain-jacket-pink': { folder: 'kids', filenameBase: 'Kids Rain Jacket Pink', count: 4 },
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

  if (cfg.files && cfg.files.length > 0) {
    const idx = Math.min(imageIndex - 1, cfg.files.length - 1)
    return `/images/products/${cfg.folder}/${encodeURIComponent(cfg.files[idx])}`
  }

  const idx = String(imageIndex).padStart(2, '0')
  return `/images/products/${cfg.folder}/${encodeURIComponent(`${cfg.filenameBase} ${idx}`)}.png`
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

  if (cfg.files && cfg.files.length > 0) {
    return cfg.files.map(f => `/images/products/${cfg.folder}/${encodeURIComponent(f)}`)
  }

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
  return `/images/products/${cfg.folder}/${encodeURIComponent(cfg.video)}`
}
