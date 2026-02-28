// Test script to verify video paths
const productIds = [
  'wool-blend-coat',
  'structured-handbag',
  'silk-midi-dress',
  'satin-slip-dress',
  'ribbed-tank-top',
  'oversized-blazer',
  'leather-belt',
  'tailored-suit-jacket',
  'leather-chelsea-boots',
  'kids-floral-dress',
  'kids-hooded-jacket',
  'kids-graphic-t-shirt',
  'kids-sneakers',
];

const PRODUCT_VIDEOS = {
  'wool-blend-coat': 'video-220.mp4',
  'structured-handbag': 'video-221.mp4',
  'silk-midi-dress': 'video-222.mp4',
  'satin-slip-dress': 'video-223.mp4',
  'ribbed-tank-top': 'video-88.mp4',
  'oversized-blazer': 'video-89.mp4',
  'leather-belt': 'video-77.mp4',
  'tailored-suit-jacket': 'video-120.mp4',
  'leather-chelsea-boots': 'video-135.mp4',
  'kids-floral-dress': 'video-35.mp4',
  'kids-hooded-jacket': 'video-36.mp4',
  'kids-graphic-t-shirt': 'video-55.mp4',
  'kids-sneakers': 'video-94.mp4',
};

const PRODUCT_IMAGE_MAP = {
  'wool-blend-coat': { folder: 'womens' },
  'structured-handbag': { folder: 'womens' },
  'silk-midi-dress': { folder: 'womens' },
  'satin-slip-dress': { folder: 'womens' },
  'ribbed-tank-top': { folder: 'womens' },
  'oversized-blazer': { folder: 'womens' },
  'leather-belt': { folder: 'mens' },
  'tailored-suit-jacket': { folder: 'mens' },
  'leather-chelsea-boots': { folder: 'mens' },
  'kids-floral-dress': { folder: 'kids' },
  'kids-hooded-jacket': { folder: 'kids' },
  'kids-graphic-t-shirt': { folder: 'kids' },
  'kids-sneakers': { folder: 'kids' },
};

console.log('Expected Video Paths:\n');
productIds.forEach(id => {
  const videoFile = PRODUCT_VIDEOS[id];
  const meta = PRODUCT_IMAGE_MAP[id];
  if (videoFile && meta) {
    const path = `/images/products/${meta.folder}/${videoFile}`;
    console.log(`${id}: ${path}`);
  }
});

console.log('\n\nTo test in browser console:');
console.log('1. Open http://localhost:3001');
console.log('2. Open DevTools Console (F12)');
console.log('3. Run: document.querySelectorAll("video").length');
console.log('4. Run: Array.from(document.querySelectorAll("video")).map(v => v.src)');
console.log('5. Check if product card videos are showing');
