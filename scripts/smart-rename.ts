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

// Build lookups
const productColorLookup = new Map<string, string>();
const productNameLookup = new Map<string, string>(); // normalized name -> id

// Size patterns
const sizePatterns = [
  /-(?:xs|s|m|l|xl|xxl|xxxl|one-size)$/i,
  /-\d+(?:\.\d+)?$/,
  /-\d+-\d+m$/,
  /-\d+t$/,
];

for (const product of products) {
  const nameParts = product.name.split(' - ');
  
  if (nameParts.length === 2) {
    const productName = nameParts[0].toLowerCase();
    const color = nameParts[1].toLowerCase();
    const key = `${productName}|${color}`;
    productColorLookup.set(key, product.id);
    
    // Also store by normalized product name
    const normalizedName = productName.replace(/\s+/g, '-');
    productNameLookup.set(`${normalizedName}|${color}`, product.id);
  } else if (nameParts.length === 3) {
    let colorVariantId = product.id;
    for (const pattern of sizePatterns) {
      colorVariantId = colorVariantId.replace(pattern, '');
    }
    
    const productName = nameParts[0].toLowerCase();
    const color = nameParts[1].toLowerCase();
    const key = `${productName}|${color}`;
    if (!productColorLookup.has(key)) {
      productColorLookup.set(key, colorVariantId);
    }
    
    const normalizedName = productName.replace(/\s+/g, '-');
    if (!productNameLookup.has(`${normalizedName}|${color}`)) {
      productNameLookup.set(`${normalizedName}|${color}`, colorVariantId);
    }
  } else if (nameParts.length === 1) {
    // Base product
    productNameLookup.set(product.name.toLowerCase().replace(/\s+/g, '-'), product.id);
  }
}

console.log(`Loaded ${productColorLookup.size} product-color combinations`);
console.log(`Loaded ${productNameLookup.size} normalized product names`);

// Image directories
const baseDir = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/public/images/products';
const folders = ['womens', 'mens', 'kids'];

// Color words
const colorWords = new Set([
  'black', 'white', 'gray', 'grey', 'navy', 'blue', 'red', 'pink', 'beige', 
  'brown', 'camel', 'tan', 'cream', 'green', 'ivory', 'nude', 'yellow', 'mint',
  'olive', 'burgundy', 'gold', 'silver', 'champagne', 'tortoise', 'sand'
]);

// Manual mappings for products where image names differ from database names
const manualMappings: Record<string, string> = {
  // Women's - image name -> database product base name
  'high-waisted jeans': 'high waist jeans',
  'knit midi skirt': 'knit skirt',
  'pleated midi skirt': 'pleated skirt',
  'satin slip dress': 'slip dress',
  'silk midi dress': 'silk midi dress',
  'ribbed tank beige top': 'ribbed tank top',
  'ribbed tank black top': 'ribbed tank top',
  'ribbed tank white top': 'ribbed tank top',
  'structured handbag': 'shoulder bag',
  'leather crossbody bag': 'crossbody bag',
  'wool blend coat': 'wool coat',
  'wool blend scarf': 'silk scarf', // or wool scarf if exists
  'oversized denim shirt': 'linen shirt', // closest match
  'oversized t-shirt': 'cotton tee',
  'cropped cardigan': 'cropped cardigan',
  
  // Men's
  'cashmere scarf': 'wool scarf',
  'crew neck t-shirt': 'essential tee',
  'leather chelsea boots': 'chelsea boots',
  'leather messenger bag': 'messenger bag',
  'merino wool sweater': 'merino sweater',
  'slim fit chinos': 'slim chinos',
  'slim fit jeans': 'straight jeans',
  'suit jacket': 'tailored blazer',
  'tailored suit trousers': 'tailored trousers',
  'wool blend overcoat': 'wool overcoat',
  
  // Kids
  'kids cargo shorts': 'boys shorts',
  'kids denim jeans': 'girls denim jeans',
  'kids floral dress': 'girls floral dress', 
  'kids graphic t-shirt': 'kids graphic tee',
  'kids hooded jacket': 'kids puffer jacket',
  'kids knit cardigan': 'girls cardigan',
  'kids rain jacket': 'kids puffer jacket',
  'kids sneakers': 'kids sneakers',
};

// Try to find a product match
function findProductMatch(imageName: string, folder: string): string | null {
  const match = imageName.match(/^(.+?)\s+(\d+)\.(\w+)$/);
  if (!match) return null;
  
  const [, namePart] = match;
  const words = namePart.split(/\s+/);
  
  // Find color
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
    productName = words.slice(0, colorIndex).join(' ').toLowerCase();
    color = words.slice(colorIndex).join(' ').toLowerCase();
  } else {
    productName = namePart.toLowerCase();
    color = '';
  }
  
  // Normalize color
  color = color.replace('grey', 'gray').replace('bown', 'brown');
  
  // Handle "Top" suffix in ribbed tank images
  if (productName.includes('ribbed tank') && productName.includes('top')) {
    productName = 'ribbed tank top';
    // Color was incorrectly parsed, fix it
    const colorMatch = namePart.match(/ribbed tank (\w+) top/i);
    if (colorMatch) {
      color = colorMatch[1].toLowerCase();
    }
  }
  
  // Try direct match first
  const directKey = `${productName}|${color}`;
  if (productColorLookup.has(directKey)) {
    return productColorLookup.get(directKey)!;
  }
  
  // Try with manual mapping
  const mappedName = manualMappings[productName];
  if (mappedName) {
    const mappedKey = `${mappedName}|${color}`;
    if (productColorLookup.has(mappedKey)) {
      return productColorLookup.get(mappedKey)!;
    }
  }
  
  // Try with folder prefix
  const prefixedKey = `${folder}-${productName.replace(/\s+/g, '-')}${color ? '-' + color : ''}`;
  
  // Check if this ID exists in products
  const matchingProduct = products.find(p => p.id === prefixedKey || p.id.startsWith(prefixedKey + '-'));
  if (matchingProduct) {
    // Return the color variant ID
    let colorVariantId = matchingProduct.id;
    for (const pattern of sizePatterns) {
      colorVariantId = colorVariantId.replace(pattern, '');
    }
    return colorVariantId;
  }
  
  // Handle "Kids" prefix in kids folder images
  if (folder === 'kids' && productName.startsWith('kids ')) {
    const strippedName = productName.substring(5);
    
    // Try boys/girls variants
    for (const prefix of ['boys', 'girls', 'kids']) {
      const tryKey = `${strippedName}|${color}`;
      if (productColorLookup.has(tryKey)) {
        return productColorLookup.get(tryKey)!;
      }
      
      const prefixedTryKey = `${prefix}-${strippedName.replace(/\s+/g, '-')}${color ? '-' + color : ''}`;
      const tryMatch = products.find(p => p.id === prefixedTryKey || p.id.startsWith(prefixedTryKey + '-'));
      if (tryMatch) {
        let colorVariantId = tryMatch.id;
        for (const pattern of sizePatterns) {
          colorVariantId = colorVariantId.replace(pattern, '');
        }
        return colorVariantId;
      }
    }
  }
  
  return null;
}

// Generate new filename for unmatched images (use consistent convention)
function generateFilename(imageName: string, folder: string): string {
  const match = imageName.match(/^(.+?)\s+(\d+)\.(\w+)$/);
  if (!match) return imageName;
  
  const [, namePart, num, ext] = match;
  const words = namePart.split(/\s+/);
  
  // Find color
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
    productName = words.slice(0, colorIndex).join('-').toLowerCase();
    color = words.slice(colorIndex).join('-').toLowerCase();
  } else {
    productName = words.join('-').toLowerCase();
    color = '';
  }
  
  // Handle special cases
  productName = productName
    .replace('grey', 'gray')
    .replace('bown', 'brown');
  color = color.replace('grey', 'gray').replace('bown', 'brown');
  
  // Don't duplicate folder prefix
  if (productName.startsWith(folder + '-')) {
    productName = productName.substring(folder.length + 1);
  }
  if (productName.startsWith('kids-') && folder === 'kids') {
    productName = productName.substring(5);
  }
  
  const newId = `${folder}-${productName}${color ? '-' + color : ''}`;
  return `${newId}-${num}.${ext}`;
}

// Process all images
interface RenameEntry {
  folder: string;
  currentPath: string;
  currentFile: string;
  newFile: string;
  productId: string | null;
  status: 'matched' | 'unmatched';
}

const renames: RenameEntry[] = [];

for (const folder of folders) {
  const folderPath = path.join(baseDir, folder);
  if (!fs.existsSync(folderPath)) continue;
  
  const files = fs.readdirSync(folderPath);
  
  for (const file of files) {
    if (file.startsWith('.')) continue;
    if (file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.mov')) continue;
    if (!file.endsWith('.png') && !file.endsWith('.jpg') && !file.endsWith('.webp')) continue;
    
    const productId = findProductMatch(file, folder);
    
    if (productId) {
      const match = file.match(/(\d+)\.(\w+)$/);
      if (match) {
        const [, num, ext] = match;
        renames.push({
          folder,
          currentPath: path.join(folderPath, file),
          currentFile: file,
          newFile: `${productId}-${num}.${ext}`,
          productId,
          status: 'matched'
        });
      }
    } else {
      const newFile = generateFilename(file, folder);
      renames.push({
        folder,
        currentPath: path.join(folderPath, file),
        currentFile: file,
        newFile,
        productId: null,
        status: 'unmatched'
      });
    }
  }
}

// Report
console.log('\n=== RENAME ANALYSIS ===\n');
console.log(`Total images: ${renames.length}`);
console.log(`  - Matched to database: ${renames.filter(r => r.status === 'matched').length}`);
console.log(`  - Extra images (not in database): ${renames.filter(r => r.status === 'unmatched').length}`);

// Show sample renames
console.log('\n=== SAMPLE RENAMES ===\n');
console.log('Matched images:');
renames.filter(r => r.status === 'matched').slice(0, 10).forEach(r => {
  console.log(`  ${r.currentFile} -> ${r.newFile}`);
});

console.log('\nExtra images (renamed by convention):');
renames.filter(r => r.status === 'unmatched').slice(0, 10).forEach(r => {
  console.log(`  ${r.currentFile} -> ${r.newFile}`);
});

// Generate script
const scriptPath = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/scripts/do-rename.sh';
let script = '#!/bin/bash\n\n';
script += '# Image rename script\n';
script += `# Total: ${renames.length} images\n`;
script += `# Matched: ${renames.filter(r => r.status === 'matched').length}\n`;
script += `# Extra: ${renames.filter(r => r.status === 'unmatched').length}\n\n`;
script += 'set -e\n\n';

for (const r of renames) {
  const newPath = path.join(path.dirname(r.currentPath), r.newFile);
  script += `mv "${r.currentPath}" "${newPath}"\n`;
}

fs.writeFileSync(scriptPath, script);
fs.chmodSync(scriptPath, '755');

// Generate CSV
const csvPath = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/final-rename-mapping.csv';
let csv = 'folder,current_filename,new_filename,product_id,status\n';
for (const r of renames) {
  csv += `${r.folder},"${r.currentFile}","${r.newFile}",${r.productId || 'extra'},${r.status}\n`;
}
fs.writeFileSync(csvPath, csv);

// Summary
console.log('\n=== SUMMARY BY FOLDER ===\n');
for (const folder of folders) {
  const folderRenames = renames.filter(r => r.folder === folder);
  const matched = folderRenames.filter(r => r.status === 'matched').length;
  const unmatched = folderRenames.filter(r => r.status === 'unmatched').length;
  console.log(`${folder}: ${folderRenames.length} total (${matched} matched, ${unmatched} extra)`);
}

console.log('\n=== FILES CREATED ===');
console.log(`Rename script: ${scriptPath}`);
console.log(`Mapping CSV: ${csvPath}`);
console.log('\nRun: bash scripts/do-rename.sh');
