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
    // Parse image name like "Cropped Cardigan Beige 01.png"
    const match = img.match(/^(.+?)\s+(\d+)\.(\w+)$/);
    if (!match) continue;
    
    const [, namePart, number, ext] = match;
    
    // Split name into product name and color
    const parts = namePart.split(/\s+/);
    let color = '';
    let productName = '';
    
    // Check if last word is a color
    const lastWord = parts[parts.length - 1].toLowerCase();
    if (colors.includes(lastWord)) {
      color = lastWord === 'grey' ? 'gray' : lastWord === 'bown' ? 'brown' : lastWord;
      productName = parts.slice(0, -1).join(' ');
    } else {
      productName = namePart;
    }
    
    // Convert product name to ID format
    const productId = `${prefix}-${productName.toLowerCase().replace(/\s+/g, '-')}${color ? '-' + color : ''}`;
    const newFileName = `${productId}-${number}.${ext}`;
    
    mappings.push({
      current: img,
      newName: newFileName,
      productId: productId
    });
  }
  
  return mappings;
}

// Extract color variants that should have images
// Images are shared across sizes, so we need: womens-cropped-cardigan-beige (not womens-cropped-cardigan-beige-l)
function extractColorVariantsThatNeedImages(): Set<string> {
  const colorVariants = new Set<string>();
  
  // Size patterns to strip
  const sizePatterns = [
    /-(?:xs|s|m|l|xl|xxl|xxxl|one-size)$/i,
    /-\d+(?:\.\d+)?$/,  // shoe sizes like -10, -10.5
    /-\d+-\d+m$/,  // baby sizes like 0-3m, 12-18m
    /-\d+t$/,  // toddler sizes like 2t, 3t
  ];
  
  for (const product of products) {
    const id = product.id;
    const nameParts = product.name.split(' - ');
    
    // We want color variants (2 parts: name + color) not size variants (3 parts: name + color + size)
    if (nameParts.length === 2) {
      // This looks like a color variant without size, add it
      colorVariants.add(id);
    } else if (nameParts.length === 3) {
      // This is a size variant, extract the color variant ID
      let colorVariantId = id;
      for (const pattern of sizePatterns) {
        colorVariantId = colorVariantId.replace(pattern, '');
      }
      colorVariants.add(colorVariantId);
    } else if (nameParts.length === 1) {
      // Base product without variants - check if it has color variants
      // If not, it needs its own image
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

// Get all image mappings
const womensMapping = createImageMapping(currentImages.womens, 'womens');
const mensMapping = createImageMapping(currentImages.mens, 'mens');
const kidsMapping = createImageMapping(currentImages.kids, 'kids');
const allMappings = [...womensMapping, ...mensMapping, ...kidsMapping];

// Images we have (by base product-color ID)
const imagesWeHave = new Set<string>();
for (const m of allMappings) {
  imagesWeHave.add(m.productId);
}

// Color variants that need images
const colorVariantsThatNeedImages = extractColorVariantsThatNeedImages();

// Find missing images
const missingImages: string[] = [];
for (const colorVariant of colorVariantsThatNeedImages) {
  if (!imagesWeHave.has(colorVariant)) {
    missingImages.push(colorVariant);
  }
}

// Print report
console.log('=== IMAGE RENAME REPORT ===\n');

// Grouped mappings
function printMappings(mappings: typeof womensMapping, title: string) {
  const grouped = new Map<string, string[]>();
  for (const m of mappings) {
    if (!grouped.has(m.productId)) {
      grouped.set(m.productId, []);
    }
    grouped.get(m.productId)!.push(`${m.current} -> ${m.newName}`);
  }
  
  console.log(`--- ${title} ---\n`);
  for (const [productId, files] of grouped) {
    console.log(`${productId}:`);
    files.forEach(f => console.log(`  ${f}`));
  }
  console.log();
}

printMappings(womensMapping, "WOMEN'S PRODUCTS");
printMappings(mensMapping, "MEN'S PRODUCTS");
printMappings(kidsMapping, "KIDS PRODUCTS");

// Missing images
console.log('=== MISSING PRODUCT IMAGES ===\n');
console.log(`Total color variants that need images: ${colorVariantsThatNeedImages.size}`);
console.log(`Images we have: ${imagesWeHave.size}`);
console.log(`Missing: ${missingImages.length}\n`);

// Group missing by category
const missingByCategory: Record<string, string[]> = {
  womens: [],
  mens: [],
  kids: [],
  boys: [],
  girls: [],
  baby: [],
};

for (const id of missingImages.sort()) {
  if (id.startsWith('womens-')) missingByCategory.womens.push(id);
  else if (id.startsWith('mens-')) missingByCategory.mens.push(id);
  else if (id.startsWith('kids-')) missingByCategory.kids.push(id);
  else if (id.startsWith('boys-')) missingByCategory.boys.push(id);
  else if (id.startsWith('girls-')) missingByCategory.girls.push(id);
  else if (id.startsWith('baby-')) missingByCategory.baby.push(id);
}

for (const [category, missing] of Object.entries(missingByCategory)) {
  if (missing.length > 0) {
    console.log(`${category.toUpperCase()} (${missing.length} missing):`);
    missing.forEach(id => console.log(`  - ${id}`));
    console.log();
  }
}

// Category images
console.log('=== CATEGORY IMAGES NEEDED ===\n');
for (const cat of categories) {
  console.log(`  - ${cat.id} (${cat.name})`);
}

// Content images
console.log('\n=== CONTENT IMAGES NEEDED ===\n');
for (const c of content) {
  console.log(`  - ${c.id} (${c.name})`);
}

// Generate rename script
console.log('\n\n=== RENAME SCRIPT ===\n');
console.log('#!/bin/bash\n');

console.log('# Women\'s products');
for (const m of womensMapping) {
  console.log(`mv "${productDirs.womens}/${m.current}" "${productDirs.womens}/${m.newName}"`);
}

console.log('\n# Men\'s products');
for (const m of mensMapping) {
  console.log(`mv "${productDirs.mens}/${m.current}" "${productDirs.mens}/${m.newName}"`);
}

console.log('\n# Kids products');
for (const m of kidsMapping) {
  console.log(`mv "${productDirs.kids}/${m.current}" "${productDirs.kids}/${m.newName}"`);
}

// Summary
console.log('\n\n=== SUMMARY ===\n');
console.log(`Total images to rename: ${allMappings.length}`);
console.log(`  - Women's: ${womensMapping.length}`);
console.log(`  - Men's: ${mensMapping.length}`);
console.log(`  - Kids: ${kidsMapping.length}`);
console.log(`\nMissing images: ${missingImages.length}`);
console.log(`Categories needing images: ${categories.length}`);
console.log(`Content assets needing images: ${content.length}`);
