/**
 * Organize product images from resources/50 products-02/ to public/images/products/{slug}/
 */

import * as fs from 'fs'
import * as path from 'path'

// Simple CSV parser
function parseCSV(content: string): any[] {
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''))
  const records: any[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    
    // Simple CSV parsing (handles quoted fields)
    const values: string[] = []
    let current = ''
    let inQuotes = false
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())
    
    const record: any = {}
    headers.forEach((header, idx) => {
      record[header] = values[idx]?.replace(/^"|"$/g, '') || ''
    })
    records.push(record)
  }
  
  return records
}

// Read the manifest CSV
const manifestPath = path.join(__dirname, 'midjourney_manifest_batch_2.csv')
const manifestContent = fs.readFileSync(manifestPath, 'utf-8')

const records = parseCSV(manifestContent)

const sourceDir = path.join(__dirname, 'resources', '50 products-02')
const targetBaseDir = path.join(__dirname, 'public', 'images', 'products')

// Get all source files
const sourceFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'))

console.log(`Found ${sourceFiles.length} source images`)
console.log(`Processing ${records.length} manifest entries`)

// Create a map of expected files: slug-imageNumber -> filename
const expectedFiles = new Map<string, string[]>()

records.forEach((record: any) => {
  const slug = record.slug
  const imageNumber = record.imageNumber
  const key = `${slug}-${imageNumber}`
  
  if (!expectedFiles.has(key)) {
    expectedFiles.set(key, [])
  }
  
  // Find matching source files (handle duplicates with _1, _2 suffixes and variations)
  const basePattern = `${slug}-${imageNumber}`
  const matchingFiles = sourceFiles.filter(f => {
    const baseName = f.replace(/\.png$/, '').replace(/\s+/g, '-')
    // Match exact pattern or with suffixes like _1, _2, or variations
    return baseName === basePattern || 
           baseName.startsWith(`${basePattern}_`) ||
           baseName === `${basePattern} 1` ||
           baseName === `${basePattern}-1`
  })
  
  if (matchingFiles.length > 0) {
    // Prefer exact match, then match without suffix
    const exactMatch = matchingFiles.find(f => {
      const baseName = f.replace(/\.png$/, '').replace(/\s+/g, '-')
      return baseName === basePattern
    })
    const fileToUse = exactMatch || matchingFiles[0]
    expectedFiles.set(key, [fileToUse, ...matchingFiles.filter(f => f !== fileToUse)])
  }
})

// Process each product
const processed = new Set<string>()
let successCount = 0
let missingCount = 0

records.forEach((record: any) => {
  const slug = record.slug
  const imageNumber = record.imageNumber
  const key = `${slug}-${imageNumber}`
  
  if (processed.has(key)) return
  processed.add(key)
  
  const targetDir = path.join(targetBaseDir, slug)
  const targetFile = path.join(targetDir, `${imageNumber}.jpg`)
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
  
  // Find source file
  const sourceFiles = expectedFiles.get(key) || []
  if (sourceFiles.length === 0) {
    console.log(`⚠️  Missing: ${slug} image ${imageNumber}`)
    missingCount++
    return
  }
  
  const sourceFile = sourceFiles[0]
  const sourcePath = path.join(sourceDir, sourceFile)
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️  Source file not found: ${sourcePath}`)
    missingCount++
    return
  }
  
  // Copy PNG file as JPG (browsers can handle PNG files with .jpg extension)
  // For proper conversion, you'd need imagemagick or similar tool
  try {
    fs.copyFileSync(sourcePath, targetFile)
    successCount++
  } catch (error) {
    console.error(`❌ Error copying ${sourceFile} to ${targetFile}:`, error)
    missingCount++
  }
})

console.log(`\n✅ Successfully organized ${successCount} images`)
console.log(`⚠️  Missing ${missingCount} images`)

// List products that were organized
const organizedProducts = new Set<string>()
records.forEach((record: any) => {
  organizedProducts.add(record.slug)
})

console.log(`\n📦 Organized ${organizedProducts.size} products:`)
organizedProducts.forEach(slug => {
  const productDir = path.join(targetBaseDir, slug)
  if (fs.existsSync(productDir)) {
    const files = fs.readdirSync(productDir).filter(f => f.endsWith('.jpg'))
    console.log(`  - ${slug}: ${files.length}/4 images`)
  }
})

// Clean up any PNG files that were created
console.log(`\n🧹 Cleaning up duplicate PNG files...`)
organizedProducts.forEach(slug => {
  const productDir = path.join(targetBaseDir, slug)
  if (fs.existsSync(productDir)) {
    const files = fs.readdirSync(productDir).filter(f => f.endsWith('.png'))
    files.forEach(file => {
      const pngPath = path.join(productDir, file)
      fs.unlinkSync(pngPath)
    })
  }
})
console.log(`✅ Cleanup complete`)
