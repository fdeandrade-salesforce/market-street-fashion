import sharp from 'sharp'
import * as fs from 'fs'
import * as path from 'path'

const QUALITY_PRIMARY = 90      // First image of each product - keep high quality
const QUALITY_STANDARD = 85      // Middle images
const QUALITY_AGGRESSIVE = 55    // Last 2 images - aggressive compression
const MAX_WIDTH_AGGRESSIVE = 1200 // Resize last 2 images to max 1200px width

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const PRODUCT_FOLDERS = ['womens', 'mens', 'kids']

interface CompressionResult {
  file: string
  originalSize: number
  compressedSize: number
  savings: number
  savingsPercent: string
  tier: 'primary' | 'standard' | 'aggressive' | 'other'
}

/** Parse product image filename: "Cropped Cardigan Beige 01.png" -> { base: "Cropped Cardigan Beige", index: 0 } */
function parseProductImageName(filePath: string): { base: string; index: number } | null {
  const dir = path.dirname(filePath)
  const relativeDir = path.relative(PUBLIC_DIR, dir)
  if (!relativeDir.includes('images/products')) return null
  const parts = relativeDir.split(path.sep)
  const folder = parts[parts.length - 1]
  if (!PRODUCT_FOLDERS.includes(folder)) return null

  const name = path.basename(filePath, path.extname(filePath))
  const match = name.match(/^(.+?)\s+(\d{1,2})$/i)
  if (match) {
    return { base: match[1].trim(), index: parseInt(match[2], 10) - 1 }
  }
  // No number suffix - treat as first/only image (e.g. "Studio Model Shot - Black Suit Jacket")
  return { base: name, index: 0 }
}

/** Group product images by base name and folder to determine which are "last 2" */
function buildProductImageGroups(files: string[]): Map<string, { path: string; index: number }[]> {
  const groups = new Map<string, { path: string; index: number }[]>()
  for (const filePath of files) {
    const parsed = parseProductImageName(filePath)
    if (!parsed) continue
    const key = path.dirname(filePath) + '::' + parsed.base
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push({ path: filePath, index: parsed.index })
  }
  for (const arr of groups.values()) {
    arr.sort((a, b) => a.index - b.index)
  }
  return groups
}

function getCompressionTier(
  filePath: string,
  groups: Map<string, { path: string; index: number }[]>
): 'primary' | 'standard' | 'aggressive' | 'other' {
  const parsed = parseProductImageName(filePath)
  if (!parsed) return 'other'
  const key = path.dirname(filePath) + '::' + parsed.base
  const arr = groups.get(key)
  if (!arr || arr.length === 0) return 'other'
  const total = arr.length
  const idx = parsed.index
  if (idx === 0) return 'primary'
  if (idx >= total - 2) return 'aggressive'
  return 'standard'
}

async function getImageFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...(await getImageFiles(fullPath)))
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase()
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        files.push(fullPath)
      }
    }
  }
  return files
}

async function compressImage(
  filePath: string,
  tier: 'primary' | 'standard' | 'aggressive' | 'other'
): Promise<CompressionResult | null> {
  const ext = path.extname(filePath).toLowerCase()
  const originalSize = fs.statSync(filePath).size
  const quality = tier === 'primary' ? QUALITY_PRIMARY : tier === 'aggressive' ? QUALITY_AGGRESSIVE : QUALITY_STANDARD

  try {
    let pipeline = sharp(filePath)
    const metadata = await pipeline.metadata()
    const width = metadata.width || 0

    // For aggressive tier: optionally resize if image is very large
    if (tier === 'aggressive' && width > MAX_WIDTH_AGGRESSIVE) {
      pipeline = pipeline.resize(MAX_WIDTH_AGGRESSIVE, undefined, { withoutEnlargement: true })
    }

    let buffer: Buffer
    if (ext === '.png') {
      buffer = await pipeline.png({ quality, compressionLevel: 9 }).toBuffer()
    } else if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await pipeline.jpeg({ quality }).toBuffer()
    } else if (ext === '.webp') {
      buffer = await pipeline.webp({ quality }).toBuffer()
    } else {
      return null
    }

    const compressedSize = buffer.length
    const shouldSave = compressedSize < originalSize || tier === 'aggressive'
    if (shouldSave) {
      fs.writeFileSync(filePath, buffer)
    }
    return {
      file: path.relative(PUBLIC_DIR, filePath),
      originalSize,
      compressedSize: shouldSave ? compressedSize : originalSize,
      savings: originalSize - (shouldSave ? compressedSize : originalSize),
      savingsPercent: shouldSave
        ? ((1 - compressedSize / originalSize) * 100).toFixed(1) + '%'
        : '0% (kept original)',
      tier,
    }
  } catch (error) {
    console.error(`Error compressing ${filePath}:`, error)
    return null
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

async function main() {
  console.log('🖼️  Tiered Image Compression (first=high, last2=aggressive)')
  console.log('============================================================')
  console.log(`Primary (1st image): quality ${QUALITY_PRIMARY}%`)
  console.log(`Standard (middle):  quality ${QUALITY_STANDARD}%`)
  console.log(`Aggressive (last 2): quality ${QUALITY_AGGRESSIVE}%, max width ${MAX_WIDTH_AGGRESSIVE}px`)
  console.log(`Scanning: ${PUBLIC_DIR}\n`)

  const imageFiles = await getImageFiles(PUBLIC_DIR)
  const productFiles = imageFiles.filter((f) => parseProductImageName(f) !== null)
  const groups = buildProductImageGroups(productFiles)
  console.log(`Found ${imageFiles.length} images (${productFiles.length} product images in womens/mens/kids)\n`)

  const results: CompressionResult[] = []
  let totalOriginal = 0
  let totalCompressed = 0

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i]
    const relativePath = path.relative(PUBLIC_DIR, file)
    const tier = getCompressionTier(file, groups)
    const tierLabel = tier === 'aggressive' ? '[LAST2]' : tier === 'primary' ? '[1st]' : ''
    process.stdout.write(`[${i + 1}/${imageFiles.length}] ${tierLabel} ${relativePath}...`)

    const result = await compressImage(file, tier)
    if (result) {
      results.push(result)
      totalOriginal += result.originalSize
      totalCompressed += result.compressedSize
      if (result.savings > 0) {
        console.log(` ✓ Saved ${result.savingsPercent}`)
      } else {
        console.log(` → ${result.savingsPercent}`)
      }
    } else {
      console.log(' ✗ Failed')
    }
  }

  console.log('\n============================================================')
  console.log('📊 Summary')
  console.log('============================================================')
  console.log(`Total images: ${results.length}`)
  console.log(`Original:  ${formatBytes(totalOriginal)}`)
  console.log(`Compressed: ${formatBytes(totalCompressed)}`)
  console.log(`Saved:     ${formatBytes(totalOriginal - totalCompressed)}`)
  const agg = results.filter((r) => r.tier === 'aggressive')
  if (agg.length > 0) {
    const aggSaved = agg.reduce((s, r) => s + r.savings, 0)
    console.log(`\nAggressive (last 2) tier: ${agg.length} images, ${formatBytes(aggSaved)} saved`)
  }
}

main().catch(console.error)
