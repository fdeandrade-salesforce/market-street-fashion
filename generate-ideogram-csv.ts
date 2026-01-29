/**
 * Generate Ideogram.ai CSV for batch image generation
 * Creates prompts for all product variants with 4 shots each:
 * 1. Packshot (clean background)
 * 2. Model wearing the garment
 * 3. Close-up on model
 * 4. Detail macro (textures)
 */

import { getAllProducts } from './lib/products'
import { Product } from './components/ProductListingPage'
import * as fs from 'fs'
import * as path from 'path'

// Helper to normalize color names for prompts
const normalizeColor = (color: string): string => {
  return color.toLowerCase().trim()
}

// Helper to generate slug from product info
const generateSlug = (product: Product): string => {
  const category = product.category.toLowerCase()
  const subcategory = product.subcategory.toLowerCase().replace(/\s+/g, '-')
  const name = product.name.toLowerCase().replace(/\s+/g, '-')
  const color = normalizeColor(product.color || '').replace(/\s+/g, '-')
  
  // Extract index from ID if possible (e.g., "women-new-in-1" -> "1")
  const idMatch = product.id.match(/-(\d+)$/)
  const index = idMatch ? idMatch[1] : '1'
  
  return `${category}-${name}-${index}${color ? `-${color}` : ''}`
}

// Check if product is wearable (clothing) vs accessory
const isWearable = (product: Product): boolean => {
  const name = product.name.toLowerCase()
  const nonWearableKeywords = ['bag', 'wallet', 'belt', 'hat', 'cap', 'scarf', 'gloves', 'sunglasses', 'watch', 'jewelry', 'necklace', 'bracelet', 'ring', 'earrings']
  return !nonWearableKeywords.some(keyword => name.includes(keyword))
}

// Generate prompt for shot type 1: Packshot (clean background)
const generatePackshotPrompt = (product: Product): string => {
  const color = normalizeColor(product.color || '')
  const category = product.category.toLowerCase()
  const name = product.name.toLowerCase()
  
  const categoryPrefix = category === 'kids' ? 'kids' : category === 'men' ? 'men\'s' : 'women\'s'
  
  return `realistic fashion e-commerce photography, ${categoryPrefix} ${name} in ${color} color, professional product photography, neutral bone ivory background, professional studio lighting, Zara-like product photography, clean composition, high fashion aesthetic, editorial style, no text, no logos, no watermarks, 5000K lighting temperature`
}

// Generate prompt for shot type 2: Model wearing/holding the product
const generateModelPrompt = (product: Product): string => {
  const color = normalizeColor(product.color || '')
  const category = product.category.toLowerCase()
  const name = product.name.toLowerCase()
  
  const categoryPrefix = category === 'kids' ? 'kids' : category === 'men' ? 'men\'s' : 'women\'s'
  const modelGender = category === 'men' ? 'male' : category === 'kids' ? 'child' : 'female'
  const wearable = isWearable(product)
  const action = wearable ? 'wearing' : 'holding'
  
  return `high fashion editorial photography, ${modelGender} professional fashion model ${action} ${categoryPrefix} ${name} in ${color} color, professional fashion photography, studio lighting with dramatic shadows, minimalist neutral background, clean composition, luxury fashion aesthetic, Vogue magazine style, editorial style, no text, no logos, no watermarks, 5000K lighting temperature`
}

// Generate prompt for shot type 3: Close-up on model/product
const generateCloseupPrompt = (product: Product): string => {
  const color = normalizeColor(product.color || '')
  const category = product.category.toLowerCase()
  const name = product.name.toLowerCase()
  
  const categoryPrefix = category === 'kids' ? 'kids' : category === 'men' ? 'men\'s' : 'women\'s'
  const modelGender = category === 'men' ? 'male' : category === 'kids' ? 'child' : 'female'
  const wearable = isWearable(product)
  const action = wearable ? 'wearing' : 'holding'
  
  return `high fashion editorial close-up photography, ${modelGender} professional fashion model ${action} ${categoryPrefix} ${name} in ${color} color, close-up shot focusing on the product details, professional fashion photography, studio lighting, minimalist neutral background, luxury fashion aesthetic, Vogue magazine style, editorial style, no text, no logos, no watermarks, 5000K lighting temperature`
}

// Generate prompt for shot type 4: Detail macro (textures)
const generateMacroPrompt = (product: Product): string => {
  const color = normalizeColor(product.color || '')
  const category = product.category.toLowerCase()
  const name = product.name.toLowerCase()
  
  const categoryPrefix = category === 'kids' ? 'kids' : category === 'men' ? 'men\'s' : 'women\'s'
  
  const materials = product.materials && product.materials.length > 0 
    ? product.materials.join(', ')
    : 'fabric'
  
  return `fashion detail macro photography, extreme close-up of ${categoryPrefix} ${name} in ${color} color, showing fabric texture, material details, ${materials}, professional macro photography, studio lighting, neutral background, high fashion aesthetic, editorial style, no text, no logos, no watermarks, 5000K lighting temperature`
}

// Group products by base (name, category, subcategory) to get all variants
const groupProductsByBase = (products: Product[]): Map<string, Product[]> => {
  const groups = new Map<string, Product[]>()
  
  for (const product of products) {
    const key = `${product.name}|${product.category}|${product.subcategory}`
    
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    
    groups.get(key)!.push(product)
  }
  
  // Sort variants by color within each group
  groups.forEach((variants) => {
    variants.sort((a, b) => {
      const colorA = (a.color || '').toLowerCase()
      const colorB = (b.color || '').toLowerCase()
      return colorA.localeCompare(colorB)
    })
  })
  
  return groups
}

// Generate CSV content
const generateCSV = (): { csv: string; totalRows: number } => {
  const allProducts = getAllProducts()
  const productGroups = groupProductsByBase(allProducts)
  
  const rows: string[] = []
  
  // CSV Header
  rows.push('prompt,visibility,aspect_ratio,magic_prompt')
  
  // Process each product group (base product with all color variants)
  const sortedGroups = Array.from(productGroups.keys()).map(key => [key, productGroups.get(key)!] as [string, Product[]]).sort((a, b) => {
    const [nameA, catA, subA] = a[0].split('|')
    const [nameB, catB, subB] = b[0].split('|')
    
    // Sort by category, then subcategory, then name
    if (catA !== catB) return catA.localeCompare(catB)
    if (subA !== subB) return subA.localeCompare(subB)
    return nameA.localeCompare(nameB)
  })
  
  const totalVariants = allProducts.length
  const targetRows = 500 // Excluding header (501 total with header)
  
  // Strategy: 
  // 1. First, add 1 image (packshot) for ALL products (we have 645, but can only fit 500 in 501 lines)
  // 2. Then, add 2 more images (model + closeup) for products that fit, until we reach 501 lines
  // Since we have 645 variants but only 500 rows available, we'll include all variants
  // but some will have only 1 image due to space constraints
  
  let variantsWith3Images = 0
  let variantsWith1Image = 0
  
  // Strategy: 
  // 1. Ensure ALL 199 product bases have at least 1 image (packshot)
  // 2. Then add model + closeup for as many as possible until we reach 501 lines
  // 
  // Calculation: 199 products × 1 image = 199 lines
  // Remaining: 500 - 199 = 301 lines
  // Can add 2 more images to: 301 / 2 = 150 products (with 1 line left)
  // So: 150 products with 3 images + 49 products with 1 image = 199 products
  // Total: 150 × 3 + 49 × 1 = 450 + 49 = 499 lines... need 1 more
  
  // Step 1: Add packshot for first variant of each product base (all 199 products)
  const baseProducts: Product[] = []
  for (const [baseKey, variants] of sortedGroups) {
    if (variants.length > 0) {
      baseProducts.push(variants[0]) // First variant (sorted by color)
    }
  }
  
  // Step 2: Add packshot for all base products
  for (const variant of baseProducts) {
    const prompt = generatePackshotPrompt(variant)
    const escapedPrompt = prompt.includes(',') || prompt.includes('"')
      ? `"${prompt.replace(/"/g, '""')}"`
      : prompt
    rows.push(`${escapedPrompt},private,4:5,off`)
    variantsWith1Image++
  }
  
  console.log(`\n📐 Step 1: Added packshot for all ${baseProducts.length} product bases`)
  console.log(`   - Current rows: ${rows.length}`)
  
  // Step 3: Add model + closeup for as many products as possible
  // We have 199 lines used, need 500 total, so 301 lines remaining
  // Can add 2 images to 150 products (300 lines) + 1 more image (1 line) = 301 lines
  const maxProductsWith3Images = Math.floor((500 - baseProducts.length) / 2)
  
  let variantIndex = 0
  while (rows.length < 501 && variantIndex < baseProducts.length && variantsWith3Images < maxProductsWith3Images) {
    const remainingRows = 501 - rows.length
    
    // If we can fit 2 more images (model + closeup), add them
    if (remainingRows >= 2) {
      const variant = baseProducts[variantIndex]
      const modelPrompt = generateModelPrompt(variant)
      const closeupPrompt = generateCloseupPrompt(variant)
      
      const escapedModelPrompt = modelPrompt.includes(',') || modelPrompt.includes('"')
        ? `"${modelPrompt.replace(/"/g, '""')}"`
        : modelPrompt
      const escapedCloseupPrompt = closeupPrompt.includes(',') || closeupPrompt.includes('"')
        ? `"${closeupPrompt.replace(/"/g, '""')}"`
        : closeupPrompt
      
      rows.push(`${escapedModelPrompt},private,4:5,off`)
      rows.push(`${escapedCloseupPrompt},private,4:5,off`)
      
      variantsWith3Images++
      variantsWith1Image-- // This variant now has 3 images, not 1
      variantIndex++
    } else if (remainingRows === 1) {
      // Can only fit 1 more image, add model for one variant
      const variant = baseProducts[variantIndex]
      const modelPrompt = generateModelPrompt(variant)
      const escapedModelPrompt = modelPrompt.includes(',') || modelPrompt.includes('"')
        ? `"${modelPrompt.replace(/"/g, '""')}"`
        : modelPrompt
      rows.push(`${escapedModelPrompt},private,4:5,off`)
      variantIndex++
      break
    } else {
      break
    }
  }
  
  console.log(`\n📐 Step 2: Added model + closeup for ${variantsWith3Images} variants`)
  console.log(`   - Variants with 3 images: ${variantsWith3Images}`)
  console.log(`   - Variants with 1 image: ${variantsWith1Image}`)
  console.log(`   - Total variants included: ${variantsWith3Images + variantsWith1Image}`)
  console.log(`   - Current rows count: ${rows.length}`)
  
  // Ensure exactly 501 lines (including header = 500 data rows)
  // If we have less than 501, add one more image
  if (rows.length < 501 && variantIndex < baseProducts.length) {
    const variant = baseProducts[variantIndex]
    const modelPrompt = generateModelPrompt(variant)
    const escapedModelPrompt = modelPrompt.includes(',') || modelPrompt.includes('"')
      ? `"${modelPrompt.replace(/"/g, '""')}"`
      : modelPrompt
    rows.push(`${escapedModelPrompt},private,4:5,off`)
  }
  
  const finalRows = rows.slice(0, 501)
  
  return {
    csv: finalRows.join('\n') + '\n', // Add newline at end for compatibility
    totalRows: finalRows.length - 1 // Exclude header
  }
}

// Main execution
const main = () => {
  console.log('Generating Ideogram CSV for all products...')
  
  const { csv: csvContent, totalRows } = generateCSV()
  const outputPath = path.join(__dirname, 'ideogram-batch-generation.csv')
  
  fs.writeFileSync(outputPath, csvContent, 'utf-8')
  
  const allProducts = getAllProducts()
  const productGroups = groupProductsByBase(allProducts)
  const totalVariants = allProducts.length
  
  console.log(`\n✅ CSV generated successfully!`)
  console.log(`📊 Summary:`)
  console.log(`   - Total products (base): ${productGroups.size}`)
  console.log(`   - Total variants (with colors): ${totalVariants}`)
  console.log(`   - Total prompts: ${totalRows}`)
  console.log(`   - Total lines in CSV: ${totalRows + 1} (including header)`)
  console.log(`   - Output file: ${outputPath}`)
  
  // Show breakdown by category
  const byCategory = new Map<string, number>()
  for (const product of allProducts) {
    const count = byCategory.get(product.category) || 0
    byCategory.set(product.category, count + 1)
  }
  
  console.log(`\n📁 Variants by category:`)
  const sortedCategories = Array.from(byCategory.keys()).sort()
  for (const category of sortedCategories) {
    const count = byCategory.get(category)!
    console.log(`   - ${category}: ${count} variants`)
  }
}

main()
