import fs from 'fs'
import path from 'path'

// Get all files recursively
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles
  
  const files = fs.readdirSync(dirPath, { withFileTypes: true })

  files.forEach(file => {
    const fullPath = path.join(dirPath, file.name)
    if (file.isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
    } else {
      arrayOfFiles.push(fullPath)
    }
  })

  return arrayOfFiles
}

// Read all code files and extract image/video references
function extractAssetReferences(codeDir: string): Set<string> {
  const references = new Set<string>()
  const codeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css']
  
  function scanDirectory(dir: string) {
    if (!fs.existsSync(dir)) return
    
    const files = fs.readdirSync(dir, { withFileTypes: true })
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name)
      
      // Skip node_modules and .next
      if (file.name === 'node_modules' || file.name === '.next' || file.name.startsWith('.')) {
        return
      }
      
      if (file.isDirectory()) {
        scanDirectory(fullPath)
      } else {
        const ext = path.extname(file.name).toLowerCase()
        if (codeExtensions.includes(ext)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf-8')
            
            // Find image references: /images/..., /resources/..., .jpg, .png, .jpeg, .webp, .mp4, .mov, .webm
            const imagePatterns = [
              /['"`]\/images\/[^'"`]+\.(jpg|jpeg|png|webp|gif|svg)/gi,
              /['"`]\/resources\/[^'"`]+\.(jpg|jpeg|png|webp|gif|svg|mp4|mov|webm)/gi,
              /['"`]\/about us resources\/[^'"`]+\.(jpg|jpeg|png|webp|gif|svg|mp4|mov|webm)/gi,
              /['"`][^'"`]+\.(jpg|jpeg|png|webp|gif|svg|mp4|mov|webm)/gi,
            ]
            
            imagePatterns.forEach(pattern => {
              const matches = content.match(pattern)
              if (matches) {
                matches.forEach(match => {
                  // Clean up the match
                  let cleaned = match.replace(/['"`]/g, '')
                  
                  // Handle relative paths
                  if (cleaned.startsWith('/')) {
                    cleaned = 'public' + cleaned
                  } else if (!cleaned.startsWith('public')) {
                    // Try to resolve relative paths
                    const dir = path.dirname(fullPath)
                    const resolved = path.resolve(dir, cleaned)
                    if (resolved.startsWith(process.cwd())) {
                      cleaned = path.relative(process.cwd(), resolved)
                    }
                  }
                  
                  // Normalize path separators
                  cleaned = cleaned.replace(/\\/g, '/')
                  
                  references.add(cleaned)
                  
                  // Also add variations (with and without leading slash)
                  if (cleaned.startsWith('public/')) {
                    references.add(cleaned.substring(7))
                  }
                })
              }
            })
          } catch (error) {
            // Skip files that can't be read
          }
        }
      }
    })
  }
  
  scanDirectory(codeDir)
  return references
}

// Get product slugs from catalog
function getProductSlugs(): Set<string> {
  const slugs = new Set<string>()
  
  try {
    // Read the catalog generation file to understand product structure
    const catalogFile = fs.readFileSync('lib/generate-complete-catalog.ts', 'utf-8')
    
    // Extract product slugs from the catalog
    // Products follow pattern: /images/products/{slug}/{number}.jpg
    const slugMatches = catalogFile.match(/\/images\/products\/([^\/]+)\//g)
    if (slugMatches) {
      slugMatches.forEach(match => {
        const slug = match.replace('/images/products/', '').replace('/', '')
        slugs.add(`public/images/products/${slug}`)
        // Also add numbered images
        for (let i = 1; i <= 4; i++) {
          slugs.add(`public/images/products/${slug}/${i}.jpg`)
        }
      })
    }
    
    // Also check if we can import and run the catalog generator
    // But for safety, we'll rely on file scanning
  } catch (error) {
    console.warn('Could not read catalog file:', error)
  }
  
  return slugs
}

async function main() {
  console.log('🔍 Scanning for unused images and videos...\n')
  
  // Get all asset files
  const assetDirs = [
    'public/images',
    'public/resources',
    'public/about us resources',
  ]
  
  const allAssets = new Set<string>()
  assetDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = getAllFiles(dir)
      files.forEach(file => {
        const relativePath = path.relative(process.cwd(), file).replace(/\\/g, '/')
        allAssets.add(relativePath)
      })
    }
  })
  
  console.log(`Found ${allAssets.size} asset files\n`)
  
  // Extract references from code
  console.log('📖 Scanning code files for references...')
  const codeDirs = ['app', 'components', 'lib']
  const references = new Set<string>()
  
  codeDirs.forEach(dir => {
    const refs = extractAssetReferences(dir)
    refs.forEach(ref => references.add(ref))
  })
  
  // Also check package.json and other config files
  const configRefs = extractAssetReferences('.')
  configRefs.forEach(ref => references.add(ref))
  
  console.log(`Found ${references.size} asset references in code\n`)
  
  // Get product slugs (these are dynamically generated)
  const productSlugs = getProductSlugs()
  productSlugs.forEach(slug => references.add(slug))
  
  // Find unused assets
  const unusedAssets: string[] = []
  const usedAssets: string[] = []
  
  allAssets.forEach(asset => {
    // Normalize asset path
    let normalizedAsset = asset.replace(/\\/g, '/')
    
    // Check if asset is referenced
    let isUsed = false
    
    // Direct match
    if (references.has(normalizedAsset)) {
      isUsed = true
    }
    
    // Check if any reference contains this asset path
    references.forEach(ref => {
      if (ref.includes(normalizedAsset) || normalizedAsset.includes(ref)) {
        isUsed = true
      }
    })
    
    // Check if it's a product image (these are generated dynamically)
    if (normalizedAsset.includes('/images/products/')) {
      const match = normalizedAsset.match(/\/images\/products\/([^\/]+)\/(\d+)\.jpg/)
      if (match) {
        const slug = match[1]
        // Check if slug directory exists (product exists)
        const productDir = `public/images/products/${slug}`
        if (fs.existsSync(productDir)) {
          isUsed = true
        }
      }
    }
    
    // Check if it's a PLP banner (these are referenced dynamically)
    if (normalizedAsset.includes('/resources/plp banners/')) {
      const filename = path.basename(normalizedAsset)
      // These are referenced in ProductListingPage.tsx dynamically
      isUsed = true
    }
    
    if (isUsed) {
      usedAssets.push(asset)
    } else {
      unusedAssets.push(asset)
    }
  })
  
  console.log('═'.repeat(50))
  console.log('📊 Results:')
  console.log(`Total assets: ${allAssets.size}`)
  console.log(`Used assets: ${usedAssets.length}`)
  console.log(`Unused assets: ${unusedAssets.length}`)
  console.log('═'.repeat(50))
  
  if (unusedAssets.length > 0) {
    console.log('\n🗑️  Unused assets found:\n')
    
    // Group by directory
    const byDir: Record<string, string[]> = {}
    unusedAssets.forEach(asset => {
      const dir = path.dirname(asset)
      if (!byDir[dir]) {
        byDir[dir] = []
      }
      byDir[dir].push(asset)
    })
    
    let totalSize = 0
    Object.entries(byDir).forEach(([dir, files]) => {
      console.log(`\n📁 ${dir}:`)
      files.forEach(file => {
        try {
          const stats = fs.statSync(file)
          totalSize += stats.size
          console.log(`   - ${path.basename(file)} (${(stats.size / 1024).toFixed(1)}KB)`)
        } catch (error) {
          console.log(`   - ${path.basename(file)}`)
        }
      })
    })
    
    console.log(`\n💾 Total size of unused assets: ${(totalSize / 1024 / 1024).toFixed(2)}MB`)
    console.log('\n⚠️  Review the list above before deleting.')
    console.log('💡 To delete unused assets, run: npm run remove-unused-assets')
    
    // Save list to file
    fs.writeFileSync('unused-assets.json', JSON.stringify(unusedAssets, null, 2))
    console.log('\n📝 List saved to unused-assets.json')
  } else {
    console.log('\n✅ No unused assets found!')
  }
}

main().catch(console.error)
