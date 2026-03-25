import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

const S3_BASE = 'https://s3.amazonaws.com/northerntrailoutfitters.com/market-street';

// Read CSV files
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

const categories = parseCSV(categoriesCsv);
const content = parseCSV(contentCsv);

// Output directories
const baseDir = '/Users/fdeandrade/Documents/GitHub/market-street-fashion/public/images';
const categoryDir = path.join(baseDir, 'categories');
const contentDir = path.join(baseDir, 'content');

// Create directories if they don't exist
[categoryDir, contentDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Download function
function downloadFile(url: string, destPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          fs.unlinkSync(destPath);
          downloadFile(redirectUrl, destPath).then(resolve);
        } else {
          file.close();
          fs.unlinkSync(destPath);
          resolve(false);
        }
      } else {
        file.close();
        fs.unlinkSync(destPath);
        resolve(false);
      }
    }).on('error', () => {
      file.close();
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      resolve(false);
    });
  });
}

// Map category IDs to S3 banner names
function getCategoryBannerUrl(categoryId: string, categoryName: string): string[] {
  const urls: string[] = [];
  
  // Map category IDs to the S3 naming convention
  const categoryMappings: Record<string, string[]> = {
    // Women
    'women': ['Women-All Women.png'],
    'womens-new-in': ['Women-All Women.png'],
    'womens-outerwear': ['Women-Outerwear.png'],
    'womens-dresses': ['Women-Dresses.png'],
    'womens-tops': ['Women-Tops.png'],
    'womens-knitwear': ['Women-Sweaters.png'],
    'womens-bottoms': ['Women-Trousers.png', 'Women-Skirts.png', 'Women-Denim.png'],
    'womens-shoes': ['Women-Bags.png'],
    'womens-bags': ['Women-Bags.png'],
    'womens-accessories': ['Women-Accessories.png'],
    
    // Men
    'men': ['Men-All Men.png'],
    'mens-new-in': ['Men-All Men.png'],
    'mens-outerwear': ['Men-Outerwear.png', 'Men-Jackets.png'],
    'mens-shirts': ['Men-Shirts.png'],
    'mens-tshirts-polos': ['Men-Tshirts.png'],
    'mens-knitwear': ['Men-Sweaters.png'],
    'mens-trousers': ['Men-Pants.png'],
    'mens-shoes': ['Men-Shoes.png'],
    'mens-bags': ['Men-Bags.png'],
    'mens-accessories': ['Men-Accessories.png'],
    
    // Kids
    'kids': ['Kids-All Kids.png'],
    'kids-new-in': ['Kids-All Kids.png'],
    'kids-boys': ['Kids-Boys.png'],
    'kids-girls': ['Kids-Girls.png'],
    'kids-baby': ['Kids-Baby.png'],
    'kids-shoes': ['Kids-Shoes.png'],
    'kids-accessories': ['Kids-Accessories.png'],
    
    // Root
    'root': ['Home-Banner.png'],
  };
  
  const mappedNames = categoryMappings[categoryId];
  if (mappedNames) {
    for (const name of mappedNames) {
      urls.push(`${S3_BASE}/resources/plp banners/${encodeURIComponent(name)}`);
    }
  }
  
  return urls;
}

// Map content asset IDs to S3 URLs
function getContentAssetUrls(contentId: string): { url: string; ext: string }[] {
  const urls: { url: string; ext: string }[] = [];
  
  const contentMappings: Record<string, { path: string; ext: string }[]> = {
    'home-main-01': [{ path: 'resources/hero banner/01.mp4', ext: 'mp4' }],
    'home-main-02': [{ path: 'resources/hero banner/02.mp4', ext: 'mp4' }],
    'home-main-03': [{ path: 'resources/hero banner/03.mp4', ext: 'mp4' }],
    'home-main-04': [{ path: 'resources/hero banner/04.png', ext: 'png' }],
    '404-banner': [
      { path: 'resources/404/404-banner.png', ext: 'png' },
    ],
    'home-categories': [
      { path: 'resources/home/categories.png', ext: 'png' },
    ],
    'home-product-set-content': [
      { path: 'resources/home/product-set.png', ext: 'png' },
    ],
    'home-free-shipping-orders-over-150': [
      { path: 'resources/home/free-shipping.png', ext: 'png' },
    ],
    'home-bottom-womens-shoes': [
      { path: 'resources/home/womens-shoes.png', ext: 'png' },
    ],
    'footer-social-email': [
      { path: 'resources/footer/social-email.png', ext: 'png' },
    ],
    'search-result-banner': [
      { path: 'resources/search/result-banner.png', ext: 'png' },
    ],
    'noresults-help': [
      { path: 'resources/search/no-results.png', ext: 'png' },
    ],
  };
  
  const mappings = contentMappings[contentId];
  if (mappings) {
    for (const mapping of mappings) {
      urls.push({ url: `${S3_BASE}/${mapping.path}`, ext: mapping.ext });
    }
  }
  
  return urls;
}

async function main() {
  console.log('=== DOWNLOADING S3 ASSETS ===\n');
  
  const results: { type: string; id: string; url: string; status: string; localPath: string }[] = [];
  
  // Download category banners
  console.log('--- Downloading Category Banners ---\n');
  for (const category of categories) {
    const urls = getCategoryBannerUrl(category.id, category.name);
    
    if (urls.length === 0) {
      console.log(`  ⚠ No URL mapping for: ${category.id}`);
      results.push({ type: 'category', id: category.id, url: '', status: 'no-mapping', localPath: '' });
      continue;
    }
    
    let downloaded = false;
    for (const url of urls) {
      const ext = path.extname(url).replace('.', '') || 'png';
      const localPath = path.join(categoryDir, `${category.id}.${ext}`);
      
      console.log(`  Trying: ${category.id} <- ${url}`);
      const success = await downloadFile(url, localPath);
      
      if (success) {
        console.log(`  ✓ Downloaded: ${category.id}.${ext}`);
        results.push({ type: 'category', id: category.id, url, status: 'success', localPath });
        downloaded = true;
        break;
      }
    }
    
    if (!downloaded) {
      console.log(`  ✗ Failed: ${category.id}`);
      results.push({ type: 'category', id: category.id, url: urls[0] || '', status: 'failed', localPath: '' });
    }
  }
  
  // Download hero/content assets
  console.log('\n--- Downloading Content Assets ---\n');
  for (const c of content) {
    const urlInfos = getContentAssetUrls(c.id);
    
    if (urlInfos.length === 0) {
      console.log(`  ⚠ No URL mapping for: ${c.id}`);
      results.push({ type: 'content', id: c.id, url: '', status: 'no-mapping', localPath: '' });
      continue;
    }
    
    for (let i = 0; i < urlInfos.length; i++) {
      const { url, ext } = urlInfos[i];
      const suffix = urlInfos.length > 1 ? `-${i + 1}` : '';
      const localPath = path.join(contentDir, `${c.id}${suffix}.${ext}`);
      
      console.log(`  Trying: ${c.id}${suffix}.${ext} <- ${url}`);
      const success = await downloadFile(url, localPath);
      
      if (success) {
        console.log(`  ✓ Downloaded: ${c.id}${suffix}.${ext}`);
        results.push({ type: 'content', id: c.id, url, status: 'success', localPath });
      } else {
        console.log(`  ✗ Failed: ${c.id}${suffix}.${ext}`);
        results.push({ type: 'content', id: c.id, url, status: 'failed', localPath: '' });
      }
    }
  }
  
  // Summary
  console.log('\n=== SUMMARY ===\n');
  const successful = results.filter(r => r.status === 'success');
  const failed = results.filter(r => r.status === 'failed');
  const noMapping = results.filter(r => r.status === 'no-mapping');
  
  console.log(`Total attempts: ${results.length}`);
  console.log(`Successful: ${successful.length}`);
  console.log(`Failed: ${failed.length}`);
  console.log(`No mapping: ${noMapping.length}`);
  
  if (failed.length > 0) {
    console.log('\nFailed downloads:');
    failed.forEach(r => console.log(`  - ${r.type}/${r.id}: ${r.url}`));
  }
  
  if (noMapping.length > 0) {
    console.log('\nNo URL mappings:');
    noMapping.forEach(r => console.log(`  - ${r.type}/${r.id}`));
  }
}

main().catch(console.error);
