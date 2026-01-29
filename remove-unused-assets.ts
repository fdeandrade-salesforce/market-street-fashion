import fs from 'fs'

async function main() {
  console.log('🗑️  Removing unused assets...\n')
  
  if (!fs.existsSync('unused-assets.json')) {
    console.error('❌ unused-assets.json not found. Please run "npm run find-unused-assets" first.')
    process.exit(1)
  }
  
  const unusedAssets: string[] = JSON.parse(fs.readFileSync('unused-assets.json', 'utf-8'))
  
  if (unusedAssets.length === 0) {
    console.log('✅ No unused assets to remove.')
    return
  }
  
  console.log(`Found ${unusedAssets.length} unused assets to remove.\n`)
  
  let removedCount = 0
  let totalSize = 0
  let errorCount = 0
  
  unusedAssets.forEach(asset => {
    try {
      if (fs.existsSync(asset)) {
        const stats = fs.statSync(asset)
        totalSize += stats.size
        
        fs.unlinkSync(asset)
        removedCount++
        console.log(`✓ Removed: ${asset}`)
        
        // Try to remove empty directories
        const dir = asset.substring(0, asset.lastIndexOf('/'))
        try {
          const dirFiles = fs.readdirSync(dir)
          if (dirFiles.length === 0) {
            fs.rmdirSync(dir)
            console.log(`✓ Removed empty directory: ${dir}`)
          }
        } catch (error) {
          // Directory not empty or doesn't exist, ignore
        }
      }
    } catch (error) {
      errorCount++
      console.error(`✗ Error removing ${asset}:`, error)
    }
  })
  
  console.log('\n' + '═'.repeat(50))
  console.log('📊 Summary:')
  console.log(`Removed: ${removedCount} files`)
  console.log(`Errors: ${errorCount}`)
  console.log(`Space freed: ${(totalSize / 1024 / 1024).toFixed(2)}MB`)
  console.log('✅ Cleanup complete!')
  
  // Remove the unused-assets.json file
  try {
    fs.unlinkSync('unused-assets.json')
  } catch (error) {
    // Ignore
  }
}

main().catch(console.error)
