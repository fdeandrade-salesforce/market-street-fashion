/**
 * Generate Midjourney Prompts for Fashion Catalog - Batch 2
 * Creates midjourney_prompts_batch_2.txt and midjourney_manifest_batch_2.csv
 * Selects 50 products NOT in batch 1
 */

import * as fs from 'fs'
import * as path from 'path'
import { generateCompleteCatalog } from './lib/generate-complete-catalog'

// Products already in batch 1 (by slug pattern)
const BATCH_1_SLUGS = new Set([
  'women-ribbed-tank-top-1',
  'women-oversized-blazer-2',
  'women-wide-leg-trousers-3',
  'women-silk-midi-dress-4',
  'women-cropped-cardigan-5',
  'women-leather-ankle-boots-6',
  'women-oversized-t-shirt-7',
  'women-high-waisted-jeans-8',
  'women-knit-midi-skirt-9',
  'women-structured-handbag-10',
  'women-satin-slip-dress-11',
  'women-wool-blend-scarf-12',
  'women-tailored-blazer-13',
  'women-ribbed-knit-sweater-14',
  'women-pleated-midi-skirt-15',
  'women-leather-crossbody-bag-16',
  'women-oversized-denim-shirt-17',
  'women-wool-blend-coat-18',
  'women-silk-blouse-19',
  'women-wide-leg-jeans-20',
  'women-knit-cardigan-21',
  'women-leather-loafers-22',
  'women-trench-coat-23',
  'women-ribbed-bodysuit-24',
  'women-midi-wrap-dress-25',
  'women-structured-tote-bag-26',
  'women-oversized-shirt-dress-27',
  'women-knit-pants-28',
  'women-leather-belt-29',
  'women-cashmere-blend-scarf-30',
  'men-classic-oxford-shirt-31',
  'men-slim-fit-chinos-32',
  'men-leather-dress-shoes-33',
  'men-wool-blend-suit-jacket-34',
  'men-cotton-t-shirt-35',
  'men-denim-jeans-36',
  'men-leather-belt-37',
  'men-cashmere-sweater-38',
  'men-wool-coat-39',
  'men-leather-boots-40',
  'kids-floral-print-dress-41',
  'kids-classic-polo-shirt-42',
  'kids-denim-jeans-43',
  'kids-tutu-dress-44',
  'kids-hooded-sweatshirt-45',
  'kids-cardigan-46',
  'kids-sneakers-47',
  'kids-party-dress-48',
  'kids-cargo-shorts-49',
  'kids-leggings-50',
])

// Helper to generate slug from product
function generateSlug(product: any, index: number): string {
  const category = product.category.toLowerCase()
  const nameSlug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `${category}-${nameSlug}-${index}`
}

// Helper to get primary color
function getPrimaryColor(product: any): string {
  if (product.colors && product.colors.length > 0) {
    return product.colors[0].toLowerCase()
  }
  return 'black'
}

// Helper to normalize color name
function normalizeColor(color: string): string {
  const colorMap: Record<string, string> = {
    'navy': 'navy',
    'beige': 'beige',
    'gray': 'gray',
    'grey': 'gray',
    'cream': 'cream',
    'ivory': 'ivory',
    'tan': 'tan',
    'brown': 'brown',
    'pink': 'pink',
    'red': 'red',
    'khaki': 'khaki',
    'white': 'white',
    'black': 'black',
    'blue': 'blue',
  }
  return colorMap[color.toLowerCase()] || color.toLowerCase()
}

// Generate prompts for different shot types
function generateModelHeroPrompt(product: any, color: string): string {
  const normalizedColor = normalizeColor(color)
  const categoryLabel = product.category === 'Women' ? "women's" : product.category === 'Men' ? "men's" : "kids'"
  return `realistic fashion e-commerce photography, ${categoryLabel} ${product.name.toLowerCase()} in ${normalizedColor} color, professional fashion model wearing the garment, neutral bone ivory background, professional studio lighting, Zara-like product photography, clean composition, high fashion aesthetic, editorial style, no text, no logos, no watermarks, --ar 4:5 --style raw --s 75 --q 1`
}

function generatePackshotPrompt(product: any, color: string): string {
  const normalizedColor = normalizeColor(color)
  return `professional product photography, ${product.name.toLowerCase()} in ${normalizedColor} color, ghost mannequin style, invisible mannequin technique, floating garment effect, neutral bone ivory background, professional e-commerce product shot, no model, no person, no human, flat lay style, studio lighting, Zara-like product photography, high fashion product photography, no text, no logos, no watermarks, --ar 4:5 --style raw --s 75 --q 1`
}

function generateLifestylePrompt(product: any, color: string): string {
  const normalizedColor = normalizeColor(color)
  const categoryLabel = product.category === 'Women' ? "women's" : product.category === 'Men' ? "men's" : "kids'"
  return `lifestyle fashion photography, ${categoryLabel} ${product.name.toLowerCase()} in ${normalizedColor} color, fashion model in natural urban setting, candid pose, authentic moment, soft natural lighting, neutral bone ivory background, editorial lifestyle aesthetic, high fashion, street style, Zara-like photography, no text, no logos, no watermarks, --ar 4:5 --style raw --s 75 --q 1`
}

function generateDetailMacroPrompt(product: any, color: string): string {
  const normalizedColor = normalizeColor(color)
  const materials = product.materials && product.materials.length > 0 
    ? product.materials[0] 
    : 'premium materials'
  return `macro photography, extreme close-up detail shot of ${product.name.toLowerCase()} in ${normalizedColor} color, fabric texture detail, material weave, ${materials}, professional product detail photography, neutral bone ivory background, studio lighting, sharp focus, luxury fashion detail, textile close-up, Zara-like detail photography, no text, no logos, no watermarks, --ar 4:5 --style raw --s 75 --q 1`
}

// Main function
function generateBatch2Prompts() {
  const catalog = generateCompleteCatalog()
  
  // Get unique products by name (one per product, not color variants)
  const seen = new Map<string, any>()
  for (const product of catalog) {
    if (!seen.has(product.name)) {
      seen.set(product.name, product)
    }
  }
  
  const uniqueProducts = Array.from(seen.values())
  
  // Filter out products already in batch 1
  const availableProducts = uniqueProducts.filter(product => {
    // Check if this product's slug pattern matches batch 1
    // We'll check by generating a potential slug and seeing if it's in batch 1
    // But actually, we need to check by product name mapping
    // Let's use a simpler approach: check if product name is in the batch 1 product names
    const batch1ProductNames = new Set([
      'Ribbed Tank Top', 'Oversized Blazer', 'Wide Leg Trousers', 'Silk Midi Dress',
      'Cropped Cardigan', 'Leather Ankle Boots', 'Oversized T-Shirt', 'High-Waisted Jeans',
      'Knit Midi Skirt', 'Structured Handbag', 'Satin Slip Dress', 'Wool Blend Scarf',
      'Tailored Blazer', 'Ribbed Knit Sweater', 'Pleated Midi Skirt', 'Leather Crossbody Bag',
      'Oversized Denim Shirt', 'Wool Blend Coat', 'Silk Blouse', 'Wide Leg Jeans',
      'Knit Cardigan', 'Leather Loafers', 'Trench Coat', 'Ribbed Bodysuit',
      'Midi Wrap Dress', 'Structured Tote Bag', 'Oversized Shirt Dress', 'Knit Pants',
      'Leather Belt', 'Cashmere Blend Scarf', 'Classic Oxford Shirt', 'Slim Fit Chinos',
      'Leather Dress Shoes', 'Wool Blend Suit Jacket', 'Cotton T-Shirt', 'Denim Jeans',
      'Cashmere Sweater', 'Wool Coat', 'Leather Boots', 'Floral Print Dress',
      'Classic Polo Shirt', 'Tutu Dress', 'Hooded Sweatshirt', 'Cardigan',
      'Sneakers', 'Party Dress', 'Cargo Shorts', 'Leggings'
    ])
    
    return !batch1ProductNames.has(product.name)
  })
  
  // Filter out accessories-only products (prefer hero SKUs)
  const heroProducts = availableProducts.filter(product => {
    const subcategory = product.subcategory.toLowerCase()
    const name = product.name.toLowerCase()
    // Prefer clothing items, avoid accessories-only
    const isAccessory = subcategory.includes('accessories') || 
                       name.includes('scarf') || 
                       name.includes('belt') ||
                       (name.includes('bag') && !name.includes('dress'))
    return !isAccessory || Math.random() > 0.7 // Allow some accessories (30%)
  })
  
  // Mix categories: aim for ~40% Women, ~35% Men, ~25% Kids
  const womenProducts = heroProducts.filter(p => p.category === 'Women')
  const menProducts = heroProducts.filter(p => p.category === 'Men')
  const kidsProducts = heroProducts.filter(p => p.category === 'Kids')
  
  // Select products from each category to get exactly 50
  // Adjust based on availability
  let selectedWomen = womenProducts.slice(0, Math.min(20, womenProducts.length))
  let selectedMen = menProducts.slice(0, Math.min(18, menProducts.length))
  let selectedKids = kidsProducts.slice(0, Math.min(12, kidsProducts.length))
  
  let total = selectedWomen.length + selectedMen.length + selectedKids.length
  
  // Fill to 50 if needed
  if (total < 50) {
    const needed = 50 - total
    // Add more from categories that have available products
    if (needed > 0 && womenProducts.length > selectedWomen.length) {
      const add = Math.min(needed, womenProducts.length - selectedWomen.length)
      selectedWomen = womenProducts.slice(0, selectedWomen.length + add)
      total = selectedWomen.length + selectedMen.length + selectedKids.length
    }
    if (total < 50 && menProducts.length > selectedMen.length) {
      const add = Math.min(50 - total, menProducts.length - selectedMen.length)
      selectedMen = menProducts.slice(0, selectedMen.length + add)
      total = selectedWomen.length + selectedMen.length + selectedKids.length
    }
    if (total < 50 && kidsProducts.length > selectedKids.length) {
      const add = Math.min(50 - total, kidsProducts.length - selectedKids.length)
      selectedKids = kidsProducts.slice(0, selectedKids.length + add)
      total = selectedWomen.length + selectedMen.length + selectedKids.length
    }
  }
  
  const selectedProducts = [...selectedWomen, ...selectedMen, ...selectedKids].slice(0, 50)
  
  // Generate slugs and prompts
  const prompts: string[] = []
  const manifestRows: string[] = ['slug,imageNumber,shotType,prompt,outputPath']
  
  let slugIndex = 51 // Start from 51 (batch 1 ended at 50)
  
  for (const product of selectedProducts) {
    const color = getPrimaryColor(product)
    const slug = generateSlug(product, slugIndex)
    
    // Generate 4 prompts per product
    const shotTypes = ['MODEL HERO', 'PACKSHOT NO MODEL', 'MODEL LIFESTYLE', 'DETAIL MACRO']
    const promptGenerators = [
      generateModelHeroPrompt,
      generatePackshotPrompt,
      generateLifestylePrompt,
      generateDetailMacroPrompt
    ]
    
    for (let i = 0; i < 4; i++) {
      const imageNumber = i + 1
      const shotType = shotTypes[i]
      const prompt = promptGenerators[i](product, color)
      const outputPath = `public/images/products/${slug}/${imageNumber}.jpg`
      
      // Add to prompts file
      prompts.push(`[${slug}] [${imageNumber}] ${prompt}`)
      
      // Add to manifest CSV
      manifestRows.push(`"${slug}","${imageNumber}","${shotType}","${prompt}","${outputPath}"`)
    }
    
    slugIndex++
  }
  
  // Write files
  const promptsFile = path.join(process.cwd(), 'midjourney_prompts_batch_2.txt')
  const manifestFile = path.join(process.cwd(), 'midjourney_manifest_batch_2.csv')
  
  fs.writeFileSync(promptsFile, prompts.join('\n'))
  fs.writeFileSync(manifestFile, manifestRows.join('\n'))
  
  // Print summary
  const categoryCounts = {
    Women: selectedProducts.filter(p => p.category === 'Women').length,
    Men: selectedProducts.filter(p => p.category === 'Men').length,
    Kids: selectedProducts.filter(p => p.category === 'Kids').length,
  }
  
  console.log('\n✅ Batch 2 Midjourney Prompts Generated!')
  console.log(`\n📊 Summary:`)
  console.log(`   Total products: ${selectedProducts.length}`)
  console.log(`   Total prompts: ${prompts.length} (4 per product)`)
  console.log(`\n📁 Categories:`)
  console.log(`   Women: ${categoryCounts.Women} products`)
  console.log(`   Men: ${categoryCounts.Men} products`)
  console.log(`   Kids: ${categoryCounts.Kids} products`)
  console.log(`\n📄 Files created:`)
  console.log(`   - ${promptsFile}`)
  console.log(`   - ${manifestFile}`)
}

// Run
generateBatch2Prompts()
