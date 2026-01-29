/**
 * Generate Midjourney Prompts for Fashion Catalog
 * Creates midjourney_prompts.txt and midjourney_manifest.csv
 */

import * as fs from 'fs'
import * as path from 'path'

// Product data structure (simplified from catalog)
interface ProductData {
  name: string
  colors: string[]
  category: string
  subcategory: string
  materials?: string[]
  desc?: string
}

// Products from Women's New In (all 30)
const womenNewInProducts: ProductData[] = [
  {
    name: 'Ribbed Tank Top',
    colors: ['Black', 'White', 'Beige', 'Navy'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['95% Cotton', '5% Elastane'],
    desc: 'Essential ribbed tank top with a relaxed fit',
  },
  {
    name: 'Oversized Blazer',
    colors: ['Black', 'Navy', 'Beige'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['70% Wool', '25% Polyester', '5% Elastane'],
    desc: 'Modern oversized blazer with structured shoulders',
  },
  {
    name: 'Wide Leg Trousers',
    colors: ['Black', 'Navy', 'Cream', 'Gray'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['65% Polyester', '30% Viscose', '5% Elastane'],
    desc: 'Flowing wide-leg trousers in premium fabric',
  },
  {
    name: 'Silk Midi Dress',
    colors: ['Black', 'Navy', 'Pink', 'Ivory'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['100% Silk'],
    desc: 'Elegant silk midi dress with a relaxed silhouette',
  },
  {
    name: 'Cropped Cardigan',
    colors: ['Beige', 'Gray', 'Pink', 'Black'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['80% Acrylic', '15% Wool', '5% Nylon'],
    desc: 'Soft cropped cardigan in a classic knit',
  },
  {
    name: 'Leather Ankle Boots',
    colors: ['Black', 'Brown', 'Tan'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['Genuine Leather Upper', 'Leather Lining', 'Rubber Sole'],
    desc: 'Classic leather ankle boots with a modern twist',
  },
  {
    name: 'Oversized T-Shirt',
    colors: ['White', 'Black', 'Gray', 'Navy'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['100% Organic Cotton'],
    desc: 'Comfortable oversized t-shirt in premium cotton',
  },
  {
    name: 'High-Waisted Jeans',
    colors: ['Blue', 'Black', 'White'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['98% Cotton', '2% Elastane'],
    desc: 'Classic high-waisted jeans with a flattering fit',
  },
  {
    name: 'Knit Midi Skirt',
    colors: ['Black', 'Navy', 'Beige', 'Gray'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['75% Polyester', '20% Viscose', '5% Elastane'],
    desc: 'Elegant knit midi skirt with a comfortable fit',
  },
  {
    name: 'Structured Handbag',
    colors: ['Black', 'Brown', 'Beige'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['Genuine Leather', 'Metal Hardware', 'Cotton Lining'],
    desc: 'Classic structured handbag in premium leather',
  },
  {
    name: 'Satin Slip Dress',
    colors: ['Black', 'Navy', 'Pink', 'Ivory'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['100% Polyester Satin'],
    desc: 'Elegant satin slip dress with adjustable straps',
  },
  {
    name: 'Wool Blend Scarf',
    colors: ['Beige', 'Gray', 'Navy', 'Black'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['70% Wool', '30% Acrylic'],
    desc: 'Luxurious wool blend scarf in a classic pattern',
  },
  {
    name: 'Tailored Blazer',
    colors: ['Black', 'Navy', 'Gray'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['65% Polyester', '30% Wool', '5% Elastane'],
    desc: 'Classic tailored blazer with a modern fit',
  },
  {
    name: 'Ribbed Knit Sweater',
    colors: ['Beige', 'Gray', 'Navy', 'Pink'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['60% Acrylic', '30% Wool', '10% Nylon'],
    desc: 'Cozy ribbed knit sweater with a relaxed fit',
  },
  {
    name: 'Pleated Midi Skirt',
    colors: ['Black', 'Navy', 'Beige'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['100% Polyester'],
    desc: 'Elegant pleated midi skirt with a flattering silhouette',
  },
  {
    name: 'Leather Crossbody Bag',
    colors: ['Black', 'Brown', 'Tan'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['Genuine Leather', 'Metal Hardware'],
    desc: 'Compact leather crossbody bag with adjustable strap',
  },
  {
    name: 'Oversized Denim Shirt',
    colors: ['Blue', 'Black', 'White'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['100% Cotton Denim'],
    desc: 'Classic oversized denim shirt with a relaxed fit',
  },
  {
    name: 'Wool Blend Coat',
    colors: ['Black', 'Navy', 'Camel'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['70% Wool', '25% Polyester', '5% Other'],
    desc: 'Classic wool blend coat with a tailored fit',
  },
  {
    name: 'Silk Blouse',
    colors: ['White', 'Black', 'Navy', 'Ivory'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['100% Silk'],
    desc: 'Elegant silk blouse with a relaxed fit',
  },
  {
    name: 'Wide Leg Jeans',
    colors: ['Blue', 'Black', 'White'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['98% Cotton', '2% Elastane'],
    desc: 'Modern wide-leg jeans with a high waist',
  },
  {
    name: 'Knit Cardigan',
    colors: ['Beige', 'Gray', 'Navy', 'Pink'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['55% Acrylic', '30% Wool', '15% Nylon'],
    desc: 'Classic knit cardigan with button-front closure',
  },
  {
    name: 'Leather Loafers',
    colors: ['Black', 'Brown', 'Tan'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['Genuine Leather Upper', 'Leather Lining', 'Rubber Sole'],
    desc: 'Classic leather loafers with a modern twist',
  },
  {
    name: 'Trench Coat',
    colors: ['Beige', 'Black', 'Navy'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['65% Polyester', '35% Cotton'],
    desc: 'Iconic trench coat in water-resistant fabric',
  },
  {
    name: 'Ribbed Bodysuit',
    colors: ['Black', 'White', 'Beige'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['95% Cotton', '5% Elastane'],
    desc: 'Sleek ribbed bodysuit with snap closure',
  },
  {
    name: 'Midi Wrap Dress',
    colors: ['Black', 'Navy', 'Floral Print'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['100% Viscose'],
    desc: 'Flattering midi wrap dress with a tie waist',
  },
  {
    name: 'Structured Tote Bag',
    colors: ['Black', 'Brown', 'Beige'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['Genuine Leather', 'Metal Hardware', 'Cotton Lining'],
    desc: 'Spacious structured tote bag in premium leather',
  },
  {
    name: 'Oversized Shirt Dress',
    colors: ['White', 'Navy', 'Striped'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['100% Cotton'],
    desc: 'Versatile oversized shirt dress with a relaxed fit',
  },
  {
    name: 'Knit Pants',
    colors: ['Black', 'Navy', 'Gray'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['85% Polyester', '10% Viscose', '5% Elastane'],
    desc: 'Comfortable knit pants with an elastic waist',
  },
  {
    name: 'Leather Belt',
    colors: ['Black', 'Brown', 'Tan'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['Genuine Leather', 'Metal Buckle'],
    desc: 'Classic leather belt with a modern buckle',
  },
  {
    name: 'Cashmere Blend Scarf',
    colors: ['Beige', 'Gray', 'Navy'],
    category: 'Women',
    subcategory: 'New In',
    materials: ['30% Cashmere', '50% Wool', '20% Acrylic'],
    desc: 'Luxurious cashmere blend scarf with a soft texture',
  },
]

// Men's products (10)
const menProducts: ProductData[] = [
  {
    name: 'Classic Oxford Shirt',
    colors: ['White', 'Blue', 'Pink'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['100% Cotton'],
    desc: 'Classic Oxford shirt with a modern fit',
  },
  {
    name: 'Slim Fit Chinos',
    colors: ['Navy', 'Khaki', 'Gray'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['98% Cotton', '2% Elastane'],
    desc: 'Modern slim fit chinos in premium cotton',
  },
  {
    name: 'Leather Dress Shoes',
    colors: ['Black', 'Brown'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['Genuine Leather Upper', 'Leather Sole'],
    desc: 'Classic leather dress shoes with modern comfort',
  },
  {
    name: 'Wool Blend Suit Jacket',
    colors: ['Navy', 'Gray', 'Black'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['70% Wool', '30% Polyester'],
    desc: 'Tailored wool blend suit jacket',
  },
  {
    name: 'Cotton T-Shirt',
    colors: ['White', 'Black', 'Navy', 'Gray'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['100% Cotton'],
    desc: 'Premium cotton t-shirt with modern fit',
  },
  {
    name: 'Denim Jeans',
    colors: ['Blue', 'Black'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['98% Cotton', '2% Elastane'],
    desc: 'Classic denim jeans with comfortable fit',
  },
  {
    name: 'Leather Belt',
    colors: ['Black', 'Brown'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['Genuine Leather'],
    desc: 'Classic leather belt with modern buckle',
  },
  {
    name: 'Cashmere Sweater',
    colors: ['Navy', 'Gray', 'Beige'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['100% Cashmere'],
    desc: 'Luxurious cashmere sweater',
  },
  {
    name: 'Wool Coat',
    colors: ['Black', 'Navy', 'Camel'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['70% Wool', '30% Polyester'],
    desc: 'Classic wool coat with tailored fit',
  },
  {
    name: 'Leather Boots',
    colors: ['Black', 'Brown'],
    category: 'Men',
    subcategory: 'New In',
    materials: ['Genuine Leather'],
    desc: 'Classic leather boots with modern sole',
  },
]

// Kids products (10)
const kidsProducts: ProductData[] = [
  {
    name: 'Floral Print Dress',
    colors: ['Pink Floral', 'Blue Floral', 'Yellow Floral'],
    category: 'Kids',
    subcategory: 'Girls',
    materials: ['100% Cotton'],
    desc: 'Adorable floral print dress',
  },
  {
    name: 'Classic Polo Shirt',
    colors: ['Navy', 'Red', 'Gray'],
    category: 'Kids',
    subcategory: 'Boys',
    materials: ['60% Cotton', '40% Polyester'],
    desc: 'Classic polo shirt for active kids',
  },
  {
    name: 'Denim Jeans',
    colors: ['Blue', 'Black'],
    category: 'Kids',
    subcategory: 'Boys',
    materials: ['98% Cotton', '2% Elastane'],
    desc: 'Durable denim jeans for kids',
  },
  {
    name: 'Tutu Dress',
    colors: ['Pink', 'White', 'Lavender'],
    category: 'Kids',
    subcategory: 'Girls',
    materials: ['100% Polyester'],
    desc: 'Adorable tutu dress for special occasions',
  },
  {
    name: 'Hooded Sweatshirt',
    colors: ['Navy', 'Gray', 'Red'],
    category: 'Kids',
    subcategory: 'Boys',
    materials: ['80% Cotton', '20% Polyester'],
    desc: 'Comfortable hooded sweatshirt',
  },
  {
    name: 'Cardigan',
    colors: ['Pink', 'Beige', 'Lavender'],
    category: 'Kids',
    subcategory: 'Girls',
    materials: ['100% Cotton'],
    desc: 'Soft cardigan for girls',
  },
  {
    name: 'Sneakers',
    colors: ['White', 'Black', 'Blue'],
    category: 'Kids',
    subcategory: 'Boys',
    materials: ['Synthetic Upper', 'Rubber Sole'],
    desc: 'Comfortable sneakers for active kids',
  },
  {
    name: 'Party Dress',
    colors: ['Red', 'Blue', 'Pink'],
    category: 'Kids',
    subcategory: 'Girls',
    materials: ['100% Polyester'],
    desc: 'Beautiful party dress',
  },
  {
    name: 'Cargo Shorts',
    colors: ['Khaki', 'Navy', 'Olive'],
    category: 'Kids',
    subcategory: 'Boys',
    materials: ['100% Cotton'],
    desc: 'Durable cargo shorts',
  },
  {
    name: 'Leggings',
    colors: ['Black', 'Navy', 'Pink'],
    category: 'Kids',
    subcategory: 'Girls',
    materials: ['95% Cotton', '5% Elastane'],
    desc: 'Comfortable leggings for girls',
  },
]

// Helper to generate slug from product name and category
function generateSlug(name: string, category: string, index: number): string {
  const baseSlug = `${category.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
  return `${baseSlug}-${index + 1}`
}

// Helper to get primary color (first color)
function getPrimaryColor(colors: string[]): string {
  return colors[0]
}

// Helper to normalize color name for prompts
function normalizeColor(color: string): string {
  // Handle common color variations first
  const colorMap: Record<string, string> = {
    'pink floral': 'pink',
    'blue floral': 'blue',
    'yellow floral': 'yellow',
    'floral print': 'floral',
    'geometric print': 'geometric',
    'solid navy': 'navy',
  }
  
  const lowerColor = color.toLowerCase()
  if (colorMap[lowerColor]) {
    return colorMap[lowerColor]
  }
  
  // Remove common descriptors and normalize
  let normalized = lowerColor
    .replace(/\s+floral|\s+print|\s+striped/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+$/, '') // Remove trailing dashes
    .trim()
  
  return normalized || lowerColor.replace(/\s+/g, '-')
}

// Generate prompt for MODEL HERO
function generateModelHeroPrompt(product: ProductData, color: string): string {
  const colorNorm = normalizeColor(color)
  const category = product.category.toLowerCase()
  const productName = product.name.toLowerCase()
  const categoryPossessive = category === 'kids' ? 'kids\'' : `${category}'s`
  
  return `high fashion editorial photography, ${categoryPossessive} ${productName} in ${colorNorm} color, professional fashion model wearing the garment, studio lighting with dramatic shadows, minimalist neutral background, clean composition, luxury fashion aesthetic, editorial style, Vogue magazine style, no text, no logos, no watermarks, --ar 4:5 --style raw --s 75 --q 1`
}

// Generate prompt for PACKSHOT NO MODEL (ghost mannequin)
function generatePackshotPrompt(product: ProductData, color: string): string {
  const colorNorm = normalizeColor(color)
  const productName = product.name.toLowerCase()
  
  return `professional product photography, ${productName} in ${colorNorm} color, ghost mannequin style, invisible mannequin technique, floating garment effect, clean white background, professional e-commerce product shot, no model, no person, no human, flat lay style, studio lighting, high fashion product photography, no text, no logos, no watermarks, --ar 4:5 --style raw --s 75 --q 1`
}

// Generate prompt for MODEL LIFESTYLE
function generateLifestylePrompt(product: ProductData, color: string): string {
  const colorNorm = normalizeColor(color)
  const category = product.category.toLowerCase()
  const productName = product.name.toLowerCase()
  const categoryPossessive = category === 'kids' ? 'kids\'' : `${category}'s`
  
  return `lifestyle fashion photography, ${categoryPossessive} ${productName} in ${colorNorm} color, fashion model in natural urban setting, candid pose, authentic moment, soft natural lighting, editorial lifestyle aesthetic, high fashion, street style, no text, no logos, no watermarks, --ar 4:5 --style raw --s 75 --q 1`
}

// Generate prompt for DETAIL MACRO
function generateDetailMacroPrompt(product: ProductData, color: string): string {
  const colorNorm = normalizeColor(color)
  const productName = product.name.toLowerCase()
  const material = product.materials?.[0] || 'premium fabric'
  
  return `macro photography, extreme close-up detail shot of ${productName} in ${colorNorm} color, fabric texture detail, material weave, ${material}, professional product detail photography, studio lighting, sharp focus, luxury fashion detail, textile close-up, no text, no logos, no watermarks, --ar 4:5 --style raw --s 75 --q 1`
}

// Main function
function generatePrompts() {
  const allProducts: ProductData[] = [
    ...womenNewInProducts, // All 30 women's products
    ...menProducts.slice(0, 10), // 10 men's products
    ...kidsProducts.slice(0, 10), // 10 kids' products
  ]
  
  // Should be exactly 50 products
  const selectedProducts = allProducts.slice(0, 50)
  
  const prompts: string[] = []
  const manifestRows: string[] = []
  
  // CSV header
  manifestRows.push('slug,imageNumber,shotType,prompt,outputPath')
  
  selectedProducts.forEach((product, idx) => {
    const slug = generateSlug(product.name, product.category, idx)
    const primaryColor = getPrimaryColor(product.colors)
    
    // Generate 4 prompts per product
    const shotTypes = [
      { num: 1, type: 'MODEL HERO', generator: generateModelHeroPrompt },
      { num: 2, type: 'PACKSHOT NO MODEL', generator: generatePackshotPrompt },
      { num: 3, type: 'MODEL LIFESTYLE', generator: generateLifestylePrompt },
      { num: 4, type: 'DETAIL MACRO', generator: generateDetailMacroPrompt },
    ]
    
    shotTypes.forEach(({ num, type, generator }) => {
      const prompt = generator(product, primaryColor)
      const outputPath = `public/images/products/${slug}/${num}.jpg`
      
      // Add to prompts file
      prompts.push(`[${slug}] [${num}] ${prompt}`)
      
      // Add to manifest CSV
      manifestRows.push(`"${slug}","${num}","${type}","${prompt}","${outputPath}"`)
    })
  })
  
  // Write prompts file
  fs.writeFileSync(
    path.join(__dirname, 'midjourney_prompts.txt'),
    prompts.join('\n'),
    'utf-8'
  )
  
  // Write manifest CSV
  fs.writeFileSync(
    path.join(__dirname, 'midjourney_manifest.csv'),
    manifestRows.join('\n'),
    'utf-8'
  )
  
  console.log(`Generated ${selectedProducts.length} products`)
  console.log(`Total prompts: ${prompts.length}`)
  console.log('Files created:')
  console.log('  - midjourney_prompts.txt')
  console.log('  - midjourney_manifest.csv')
}

// Run
generatePrompts()
