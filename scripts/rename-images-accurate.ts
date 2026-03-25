import * as fs from 'fs';
import * as path from 'path';

// Read CSV files
const productsCsv = fs.readFileSync('/Users/fdeandrade/Downloads/product-list.csv', 'utf-8');

// Parse products
function parseCSV(csv: string): { id: string; name: string }[] {
  const lines = csv.trim().split('\n');
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = line.split(',');
    return { id: values[0], name: values[1] };
  });
}

const products = parseCSV(productsCsv);

// Build a lookup of product name + color -> product ID
// We need to find color variants (products with 2 parts in name: "Product Name - Color")
const productColorLookup = new Map<string, string>();
const colorVariantIds = new Set<string>();

// Size patterns to identify size variants
const sizePatterns = [
  /-(?:xs|s|m|l|xl|xxl|xxxl|one-size)$/i,
  /-\d+(?:\.\d+)?$/,
  /-\d+-\d+m$/,
  /-\d+t$/,
];

for (const product of products) {
  const nameParts = product.name.split(' - ');
  
  if (nameParts.length === 2) {
    // Color variant without size: "High Waist Jeans - Black"
    const productName = nameParts[0].toLowerCase();
    const color = nameParts[1].toLowerCase();
    const key = `${productName}|${color}`;
    productColorLookup.set(key, product.id);
    colorVariantIds.add(product.id);
  } else if (nameParts.length === 3) {
    // Size variant: "High Waist Jeans - Black - L"
    // Extract color variant ID by removing size
    let colorVariantId = product.id;
    for (const pattern of sizePatterns) {
      colorVariantId = colorVariantId.replace(pattern, '');
    }
    colorVariantIds.add(colorVariantId);
    
    const productName = nameParts[0].toLowerCase();
    const color = nameParts[1].toLowerCase();
    const key = `${productName}|${color}`;
    if (!productColorLookup.has(key)) {
      productColorLookup.set(key, colorVariantId);
    }
  }
}

console.log(`Found ${productColorLookup.size} product-color combinations in database`);

// Image directories
const baseDir = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/public/images/products';
const folders = ['womens', 'mens', 'kids'];

// Common color names that might appear at end of image filename
const colorWords = new Set([
  'black', 'white', 'gray', 'grey', 'navy', 'blue', 'red', 'pink', 'beige', 
  'brown', 'camel', 'tan', 'cream', 'green', 'ivory', 'nude', 'yellow', 'mint',
  'olive', 'burgundy', 'gold', 'silver', 'champagne', 'tortoise', 'sand'
]);

// Normalize image product name to match database format
function normalizeProductName(imageName: string): string {
  return imageName
    .toLowerCase()
    .replace(/-/g, ' ')  // Replace hyphens with spaces
    .replace(/\s+/g, ' ')  // Normalize spaces
    .trim();
}

// Try to find matching product ID for an image
function findProductMatch(imageName: string, folder: string): { productId: string; confidence: string } | null {
  // Parse: "High-Waisted Jeans Black 01.png" or "Cropped Cardigan Beige 02.png"
  const match = imageName.match(/^(.+?)\s+(\d+)\.(\w+)$/);
  if (!match) return null;
  
  const [, namePart] = match;
  const words = namePart.split(/\s+/);
  
  // Find where color starts (last word that's a color)
  let colorIndex = -1;
  for (let i = words.length - 1; i >= 0; i--) {
    if (colorWords.has(words[i].toLowerCase())) {
      colorIndex = i;
      break;
    }
  }
  
  let productName: string;
  let color: string;
  
  if (colorIndex > 0) {
    productName = words.slice(0, colorIndex).join(' ');
    color = words.slice(colorIndex).join(' ');  // Handle multi-word colors if any
  } else {
    productName = namePart;
    color = '';
  }
  
  // Normalize
  productName = normalizeProductName(productName);
  color = color.toLowerCase().replace('grey', 'gray').replace('bown', 'brown');
  
  // Try exact match
  const key = `${productName}|${color}`;
  if (productColorLookup.has(key)) {
    return { productId: productColorLookup.get(key)!, confidence: 'exact' };
  }
  
  // Try with folder prefix stripped from lookup
  // e.g., "Kids Cargo Shorts" should match "kids-cargo-shorts"
  const prefixes = ['womens', 'mens', 'kids', 'boys', 'girls', 'baby'];
  for (const prefix of prefixes) {
    if (productName.startsWith(prefix + ' ')) {
      const strippedName = productName.substring(prefix.length + 1);
      const strippedKey = `${strippedName}|${color}`;
      if (productColorLookup.has(strippedKey)) {
        return { productId: productColorLookup.get(strippedKey)!, confidence: 'prefix-stripped' };
      }
    }
  }
  
  // Try fuzzy match - look for similar product names
  const normalizedSearch = productName.replace(/\s+/g, '');
  for (const [lookupKey, productId] of productColorLookup.entries()) {
    const [lookupName, lookupColor] = lookupKey.split('|');
    const normalizedLookup = lookupName.replace(/\s+/g, '');
    
    if (lookupColor === color) {
      // Check if names are similar (one contains the other, or minor differences)
      if (normalizedSearch.includes(normalizedLookup) || normalizedLookup.includes(normalizedSearch)) {
        return { productId, confidence: 'fuzzy' };
      }
    }
  }
  
  return null;
}

// Process all images
interface RenameEntry {
  folder: string;
  currentPath: string;
  newPath: string;
  productId: string;
  confidence: string;
  imageNumber: string;
}

interface UnmatchedEntry {
  folder: string;
  filename: string;
  suggestedId: string;
}

const renames: RenameEntry[] = [];
const unmatched: UnmatchedEntry[] = [];
const extraMedia: { folder: string; filename: string; type: string }[] = [];

for (const folder of folders) {
  const folderPath = path.join(baseDir, folder);
  if (!fs.existsSync(folderPath)) continue;
  
  const files = fs.readdirSync(folderPath);
  
  for (const file of files) {
    // Skip hidden files
    if (file.startsWith('.')) continue;
    
    // Handle videos separately
    if (file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.mov')) {
      extraMedia.push({ folder, filename: file, type: 'video' });
      continue;
    }
    
    // Handle images
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webp')) {
      const match = findProductMatch(file, folder);
      
      if (match) {
        const numMatch = file.match(/(\d+)\.(\w+)$/);
        if (numMatch) {
          const [, num, ext] = numMatch;
          renames.push({
            folder,
            currentPath: path.join(folderPath, file),
            newPath: path.join(folderPath, `${match.productId}-${num}.${ext}`),
            productId: match.productId,
            confidence: match.confidence,
            imageNumber: num
          });
        }
      } else {
        // Generate suggested ID based on naming convention
        const imgMatch = file.match(/^(.+?)\s+(\d+)\.(\w+)$/);
        if (imgMatch) {
          const [, namePart] = imgMatch;
          const suggestedId = `${folder}-${namePart.toLowerCase().replace(/\s+/g, '-')}`;
          unmatched.push({ folder, filename: file, suggestedId });
        } else {
          unmatched.push({ folder, filename: file, suggestedId: 'unknown-format' });
        }
      }
    }
  }
}

// Report
console.log('\n=== RENAME ANALYSIS ===\n');
console.log(`Total images to rename: ${renames.length}`);
console.log(`  - Exact matches: ${renames.filter(r => r.confidence === 'exact').length}`);
console.log(`  - Fuzzy matches: ${renames.filter(r => r.confidence === 'fuzzy').length}`);
console.log(`  - Prefix-stripped: ${renames.filter(r => r.confidence === 'prefix-stripped').length}`);
console.log(`\nUnmatched images: ${unmatched.length}`);
console.log(`Extra videos: ${extraMedia.length}`);

// Show unmatched
if (unmatched.length > 0) {
  console.log('\n=== UNMATCHED IMAGES ===');
  console.log('These images don\'t have matching products in the database:\n');
  for (const u of unmatched) {
    console.log(`  ${u.folder}/${u.filename}`);
    console.log(`    Suggested ID: ${u.suggestedId}`);
  }
}

// Show extra videos
if (extraMedia.length > 0) {
  console.log('\n=== EXTRA VIDEOS ===');
  console.log('These videos will be kept as-is (not in product database):\n');
  for (const v of extraMedia) {
    console.log(`  ${v.folder}/${v.filename}`);
  }
}

// Generate rename script
const scriptPath = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/scripts/do-rename.sh';
let script = '#!/bin/bash\n\n';
script += '# Image rename script - generated automatically\n';
script += `# Total renames: ${renames.length}\n\n`;

script += 'set -e  # Exit on error\n\n';

for (const r of renames) {
  script += `mv "${r.currentPath}" "${r.newPath}"\n`;
}

fs.writeFileSync(scriptPath, script);
fs.chmodSync(scriptPath, '755');
console.log(`\nRename script written to: ${scriptPath}`);

// Also generate a mapping CSV for reference
const mappingPath = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/final-rename-mapping.csv';
let csv = 'folder,current_filename,new_filename,product_id,confidence,image_number\n';
for (const r of renames) {
  const currentFilename = path.basename(r.currentPath);
  const newFilename = path.basename(r.newPath);
  csv += `${r.folder},"${currentFilename}","${newFilename}",${r.productId},${r.confidence},${r.imageNumber}\n`;
}
fs.writeFileSync(mappingPath, csv);
console.log(`Mapping CSV written to: ${mappingPath}`);

// Summary by folder
console.log('\n=== SUMMARY BY FOLDER ===');
for (const folder of folders) {
  const folderRenames = renames.filter(r => r.folder === folder);
  const folderUnmatched = unmatched.filter(u => u.folder === folder);
  const folderVideos = extraMedia.filter(v => v.folder === folder);
  console.log(`\n${folder}:`);
  console.log(`  Renaming: ${folderRenames.length} images`);
  console.log(`  Unmatched: ${folderUnmatched.length} images`);
  console.log(`  Videos: ${folderVideos.length}`);
}

console.log('\n=== READY TO RENAME ===');
console.log('Run: bash /Users/fdeandrade/Documents/GitHub/market-street-fashion/scripts/do-rename.sh');
