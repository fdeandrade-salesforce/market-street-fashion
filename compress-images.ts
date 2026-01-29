import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

interface CompressionOptions {
  quality?: number
  maxWidth?: number
  maxHeight?: number
}

const DEFAULT_OPTIONS: CompressionOptions = {
  quality: 75, // 75% quality as requested
  maxWidth: 2000, // Max width for web
  maxHeight: 2000, // Max height for web
}

async function compressImage(
  inputPath: string,
  outputPath: string,
  options: CompressionOptions = {}
): Promise<{ originalSize: number; compressedSize: number; saved: number }> {
  const stats = fs.statSync(inputPath)
  const originalSize = stats.size

  const ext = path.extname(inputPath).toLowerCase()
  const isJpeg = ['.jpg', '.jpeg'].includes(ext)
  const isPng = ext === '.png'

  let sharpInstance = sharp(inputPath)

  // Resize if needed
  if (options.maxWidth || options.maxHeight) {
    sharpInstance = sharpInstance.resize(options.maxWidth, options.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  // Apply compression based on format
  if (isJpeg) {
    await sharpInstance
      .jpeg({ quality: options.quality || 75, mozjpeg: true })
      .toFile(outputPath)
  } else if (isPng) {
    await sharpInstance
      .png({ quality: options.quality || 75, compressionLevel: 9 })
      .toFile(outputPath)
  } else {
    // For other formats, just copy
    fs.copyFileSync(inputPath, outputPath)
  }

  const compressedStats = fs.statSync(outputPath)
  const compressedSize = compressedStats.size
  const saved = originalSize - compressedSize

  return { originalSize, compressedSize, saved }
}

async function compressDirectory(
  dirPath: string,
  options: CompressionOptions = {}
): Promise<void> {
  const files = fs.readdirSync(dirPath, { withFileTypes: true })
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']

  for (const file of files) {
    const fullPath = path.join(dirPath, file.name)

    if (file.isDirectory()) {
      await compressDirectory(fullPath, options)
    } else if (file.isFile()) {
      const ext = path.extname(file.name).toLowerCase()
      if (imageExtensions.includes(ext)) {
        try {
          // Compress in place (temporary file first)
          const tempPath = fullPath + '.tmp'
          const result = await compressImage(fullPath, tempPath, options)

          // Replace original with compressed version
          fs.renameSync(tempPath, fullPath)

          const savedPercent = ((result.saved / result.originalSize) * 100).toFixed(1)
          console.log(
            `✓ ${file.name}: ${(result.originalSize / 1024).toFixed(1)}KB → ${(result.compressedSize / 1024).toFixed(1)}KB (saved ${savedPercent}%)`
          )
        } catch (error) {
          console.error(`✗ Error compressing ${file.name}:`, error)
        }
      }
    }
  }
}

function getDirectorySize(dirPath: string): number {
  let size = 0
  if (!fs.existsSync(dirPath)) return 0
  
  const files = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const file of files) {
    const fullPath = path.join(dirPath, file.name)
    if (file.isDirectory()) {
      size += getDirectorySize(fullPath)
    } else {
      const stats = fs.statSync(fullPath)
      size += stats.size
    }
  }

  return size
}

async function main() {
  const options: CompressionOptions = {
    quality: 75,
    maxWidth: 2000,
    maxHeight: 2000,
  }

  console.log('🖼️  Starting image compression with quality: 75...\n')
  console.log('Options:', options)
  console.log('')

  const directories = [
    'public/images/products',
    'public/resources/plp banners',
    'public/resources/support images',
    'public/resources/hero banner',
    'public/images/hero',
    'public/about us resources',
  ]

  let totalOriginalSize = 0
  let totalCompressedSize = 0

  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      console.log(`\n📁 Processing: ${dir}`)
      console.log('─'.repeat(50))

      const beforeStats = getDirectorySize(dir)
      await compressDirectory(dir, options)
      const afterStats = getDirectorySize(dir)

      totalOriginalSize += beforeStats
      totalCompressedSize += afterStats

      const saved = beforeStats - afterStats
      const savedPercent = beforeStats > 0 ? ((saved / beforeStats) * 100).toFixed(1) : '0'
      console.log(`\nDirectory: ${(beforeStats / 1024 / 1024).toFixed(2)}MB → ${(afterStats / 1024 / 1024).toFixed(2)}MB (saved ${savedPercent}%)`)
    } else {
      console.log(`⚠️  Directory not found: ${dir}`)
    }
  }

  console.log('\n' + '═'.repeat(50))
  console.log('📊 Summary:')
  console.log(`Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`)
  console.log(`Total compressed size: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`)
  console.log(`Total saved: ${((totalOriginalSize - totalCompressedSize) / 1024 / 1024).toFixed(2)}MB`)
  console.log(`Compression ratio: ${totalOriginalSize > 0 ? (((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(1) : '0'}%`)
  console.log('\n✅ Compression complete!')
}

main().catch(console.error)
