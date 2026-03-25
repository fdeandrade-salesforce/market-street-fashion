import * as fs from 'fs';
import * as path from 'path';

// Read CSV files
const productsCsv = fs.readFileSync('/Users/fdeandrade/Downloads/product-list.csv', 'utf-8');
const categoriesCsv = fs.readFileSync('/Users/fdeandrade/Downloads/category-list.csv', 'utf-8');
const contentCsv = fs.readFileSync('/Users/fdeandrade/Downloads/content-assets-list.csv', 'utf-8');

// Parse CSV
function parseCSV(csv: string): { id: string; name: string }[] {
  const lines = csv.trim().split('\n');
  return lines.slice(1).filter(line => line.trim()).map(line => {
    const values = line.split(',');
    return { id: values[0], name: values[1] };
  });
}

const products = parseCSV(productsCsv);
const categories = parseCSV(categoriesCsv);
const content = parseCSV(contentCsv);

// Image directories
const baseDir = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/public/images/products';
const folders = ['womens', 'mens', 'kids'];

// Get all images after rename
function getImages(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => 
    (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp')) && !f.startsWith('.')
  );
}

// Get all videos
function getVideos(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => 
    (f.endsWith('.mp4') || f.endsWith('.webm') || f.endsWith('.mov')) && !f.startsWith('.')
  );
}

// Build list of color variants that should have images
const sizePatterns = [
  /-(?:xs|s|m|l|xl|xxl|xxxl|one-size)$/i,
  /-\d+(?:\.\d+)?$/,
  /-\d+-\d+m$/,
  /-\d+t$/,
];

const colorVariantsThatNeedImages = new Set<string>();

for (const product of products) {
  const nameParts = product.name.split(' - ');
  
  if (nameParts.length === 2) {
    // Color variant without size
    colorVariantsThatNeedImages.add(product.id);
  } else if (nameParts.length === 3) {
    // Size variant - extract color variant ID
    let colorVariantId = product.id;
    for (const pattern of sizePatterns) {
      colorVariantId = colorVariantId.replace(pattern, '');
    }
    colorVariantsThatNeedImages.add(colorVariantId);
  }
}

// Get images we have now
const allImages: { folder: string; filename: string; productId: string }[] = [];

for (const folder of folders) {
  const folderPath = path.join(baseDir, folder);
  const images = getImages(folderPath);
  
  for (const img of images) {
    // Extract product ID from filename (remove -NN.ext suffix)
    const match = img.match(/^(.+)-\d+\.\w+$/);
    if (match) {
      allImages.push({ folder, filename: img, productId: match[1] });
    }
  }
}

// Get unique product IDs we have images for
const imageProductIds = new Set(allImages.map(i => i.productId));

console.log('=== FINAL IMAGE REPORT ===\n');
console.log(`Total images after rename: ${allImages.length}`);
console.log(`Unique products with images: ${imageProductIds.size}`);
console.log(`Products in database needing images: ${colorVariantsThatNeedImages.size}`);

// Find missing
const missingProducts: string[] = [];
for (const colorVariant of colorVariantsThatNeedImages) {
  if (!imageProductIds.has(colorVariant)) {
    missingProducts.push(colorVariant);
  }
}

// Find extra images (not in database)
const extraProducts: string[] = [];
for (const productId of imageProductIds) {
  if (!colorVariantsThatNeedImages.has(productId)) {
    extraProducts.push(productId);
  }
}

console.log(`\nMissing images: ${missingProducts.length}`);
console.log(`Extra images (not in database): ${extraProducts.length}`);

// Group missing by category
const missingByCategory: Record<string, string[]> = {};
for (const id of missingProducts.sort()) {
  const prefix = id.split('-')[0];
  if (!missingByCategory[prefix]) {
    missingByCategory[prefix] = [];
  }
  missingByCategory[prefix].push(id);
}

console.log('\n=== MISSING IMAGES BY CATEGORY ===\n');
for (const [category, ids] of Object.entries(missingByCategory)) {
  console.log(`${category.toUpperCase()} (${ids.length}):`);
  ids.forEach(id => console.log(`  - ${id}`));
  console.log();
}

// Videos summary
console.log('=== VIDEOS ===\n');
for (const folder of folders) {
  const folderPath = path.join(baseDir, folder);
  const videos = getVideos(folderPath);
  if (videos.length > 0) {
    console.log(`${folder}: ${videos.length} videos`);
    videos.forEach(v => console.log(`  - ${v}`));
  }
}

// Categories and content
console.log('\n=== CATEGORY IMAGES NEEDED ===\n');
console.log(`Total: ${categories.length}`);
categories.forEach(c => console.log(`  - ${c.id} (${c.name})`));

console.log('\n=== CONTENT IMAGES NEEDED ===\n');
console.log(`Total: ${content.length}`);
content.forEach(c => console.log(`  - ${c.id} (${c.name})`));

// Generate CSV of missing images
let missingCsv = 'type,id,category,name\n';

for (const id of missingProducts.sort()) {
  const prefix = id.split('-')[0];
  // Find the product name
  const product = products.find(p => p.id.startsWith(id));
  const name = product ? product.name.split(' - ').slice(0, 2).join(' - ') : id;
  missingCsv += `product,${id},${prefix},"${name}"\n`;
}

for (const cat of categories) {
  missingCsv += `category,${cat.id},categories,"${cat.name}"\n`;
}

for (const c of content) {
  missingCsv += `content,${c.id},content,"${c.name}"\n`;
}

fs.writeFileSync('/Users/fdeandrade/Documents/GitHub/market-street-fashion/missing-images-final.csv', missingCsv);
console.log('\n=== FILE CREATED ===');
console.log('Missing images list: missing-images-final.csv');

// Summary
console.log('\n=== SUMMARY ===\n');
console.log(`✓ Images renamed: ${allImages.length}`);
console.log(`✓ Products with images: ${imageProductIds.size}`);
console.log(`✗ Missing product images: ${missingProducts.length}`);
console.log(`✗ Missing category images: ${categories.length}`);
console.log(`✗ Missing content images: ${content.length}`);
console.log(`+ Extra images (bonus): ${extraProducts.length}`);
