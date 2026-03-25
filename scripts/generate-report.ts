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
    return {
      id: values[0],
      name: values[1]
    };
  });
}

const products = parseCSV(productsCsv);
const categories = parseCSV(categoriesCsv);
const content = parseCSV(contentCsv);

// Image directories
const baseDir = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/public/images';
const productDirs = {
  womens: path.join(baseDir, 'products/womens'),
  mens: path.join(baseDir, 'products/mens'),
  kids: path.join(baseDir, 'products/kids'),
};

// Get current images
function getImages(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp'));
}

const currentImages = {
  womens: getImages(productDirs.womens),
  mens: getImages(productDirs.mens),
  kids: getImages(productDirs.kids),
};

// Common colors
const colors = ['black', 'white', 'gray', 'grey', 'navy', 'blue', 'red', 'pink', 'beige', 'brown', 'camel', 'tan', 'cream', 'green', 'ivory', 'nude', 'yellow', 'mint', 'bown'];

// Create mapping from current image names to product IDs
function createImageMapping(images: string[], prefix: string): { current: string; newName: string; productId: string }[] {
  const mappings: { current: string; newName: string; productId: string }[] = [];
  
  for (const img of images) {
    const match = img.match(/^(.+?)\s+(\d+)\.(\w+)$/);
    if (!match) continue;
    
    const [, namePart, number, ext] = match;
    const parts = namePart.split(/\s+/);
    let color = '';
    let productName = '';
    
    const lastWord = parts[parts.length - 1].toLowerCase();
    if (colors.includes(lastWord)) {
      color = lastWord === 'grey' ? 'gray' : lastWord === 'bown' ? 'brown' : lastWord;
      productName = parts.slice(0, -1).join(' ');
    } else {
      productName = namePart;
    }
    
    const productId = `${prefix}-${productName.toLowerCase().replace(/\s+/g, '-')}${color ? '-' + color : ''}`;
    const newFileName = `${productId}-${number}.${ext}`;
    
    mappings.push({ current: img, newName: newFileName, productId });
  }
  
  return mappings;
}

// Extract color variants
function extractColorVariantsThatNeedImages(): Set<string> {
  const colorVariants = new Set<string>();
  const sizePatterns = [
    /-(?:xs|s|m|l|xl|xxl|xxxl|one-size)$/i,
    /-\d+(?:\.\d+)?$/,
    /-\d+-\d+m$/,
    /-\d+t$/,
  ];
  
  for (const product of products) {
    const id = product.id;
    const nameParts = product.name.split(' - ');
    
    if (nameParts.length === 2) {
      colorVariants.add(id);
    } else if (nameParts.length === 3) {
      let colorVariantId = id;
      for (const pattern of sizePatterns) {
        colorVariantId = colorVariantId.replace(pattern, '');
      }
      colorVariants.add(colorVariantId);
    } else if (nameParts.length === 1) {
      const hasColorVariants = products.some(p => 
        p.id.startsWith(id + '-') && p.name.split(' - ').length >= 2
      );
      if (!hasColorVariants) {
        colorVariants.add(id);
      }
    }
  }
  
  return colorVariants;
}

// Get mappings
const womensMapping = createImageMapping(currentImages.womens, 'womens');
const mensMapping = createImageMapping(currentImages.mens, 'mens');
const kidsMapping = createImageMapping(currentImages.kids, 'kids');
const allMappings = [...womensMapping, ...mensMapping, ...kidsMapping];

// Images we have
const imagesWeHave = new Set<string>();
const imageCountByProduct = new Map<string, number>();
for (const m of allMappings) {
  imagesWeHave.add(m.productId);
  imageCountByProduct.set(m.productId, (imageCountByProduct.get(m.productId) || 0) + 1);
}

// Missing
const colorVariantsThatNeedImages = extractColorVariantsThatNeedImages();
const missingImages: string[] = [];
for (const colorVariant of colorVariantsThatNeedImages) {
  if (!imagesWeHave.has(colorVariant)) {
    missingImages.push(colorVariant);
  }
}

// Generate Missing Images CSV
let missingCsv = 'type,id,category,status,notes\n';
for (const id of missingImages.sort()) {
  let category = 'unknown';
  if (id.startsWith('womens-')) category = 'womens';
  else if (id.startsWith('mens-')) category = 'mens';
  else if (id.startsWith('kids-')) category = 'kids';
  else if (id.startsWith('boys-')) category = 'boys';
  else if (id.startsWith('girls-')) category = 'girls';
  else if (id.startsWith('baby-')) category = 'baby';
  
  missingCsv += `product,${id},${category},missing,\n`;
}

for (const cat of categories) {
  missingCsv += `category,${cat.id},categories,missing,${cat.name}\n`;
}

for (const c of content) {
  missingCsv += `content,${c.id},content,missing,${c.name}\n`;
}

fs.writeFileSync('/Users/fdeandrade/Documents/GitHub/market-street-fashion/missing-images.csv', missingCsv);
console.log('Created: missing-images.csv');

// Generate Rename Mapping CSV
let renameCsv = 'current_name,new_name,product_id,folder\n';
for (const m of womensMapping) {
  renameCsv += `"${m.current}","${m.newName}",${m.productId},womens\n`;
}
for (const m of mensMapping) {
  renameCsv += `"${m.current}","${m.newName}",${m.productId},mens\n`;
}
for (const m of kidsMapping) {
  renameCsv += `"${m.current}","${m.newName}",${m.productId},kids\n`;
}

fs.writeFileSync('/Users/fdeandrade/Documents/GitHub/market-street-fashion/image-rename-mapping.csv', renameCsv);
console.log('Created: image-rename-mapping.csv');

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Total images to rename: ${allMappings.length}`);
console.log(`Missing product images: ${missingImages.length}`);
console.log(`Missing category images: ${categories.length}`);
console.log(`Missing content images: ${content.length}`);
