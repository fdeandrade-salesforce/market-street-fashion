/**
 * Fashion Catalog Generator
 * This script generates a complete fashion product catalog
 * Run with: npx ts-node lib/generate-fashion-catalog.ts > lib/fashion-catalog.ts
 */

import { Product } from '../components/ProductListingPage'

// Product definitions organized by category and subcategory
const productDefinitions = {
  Women: {
    'New In': [
      { name: 'Ribbed Tank Top', price: 29.90, colors: ['Black', 'White', 'Beige'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Essential ribbed tank top with a relaxed fit.', new: true },
      { name: 'Oversized Blazer', price: 129.90, colors: ['Black', 'Navy', 'Beige'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Modern oversized blazer with structured shoulders.', new: true, bestSeller: true },
      { name: 'Wide Leg Trousers', price: 89.90, colors: ['Black', 'Navy', 'Cream'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], desc: 'Flowing wide-leg trousers in premium fabric.', new: true },
      { name: 'Silk Midi Dress', price: 149.90, colors: ['Black', 'Navy', 'Pink'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Elegant silk midi dress with a relaxed silhouette.', new: true, limited: true },
      { name: 'Cropped Cardigan', price: 59.90, colors: ['Beige', 'Gray', 'Pink'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Soft cropped cardigan in a classic knit.', new: true },
      { name: 'Leather Ankle Boots', price: 179.90, colors: ['Black', 'Brown', 'Tan'], sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'], desc: 'Classic leather ankle boots with a modern twist.', new: true, bestSeller: true },
      { name: 'Oversized T-Shirt', price: 39.90, colors: ['White', 'Black', 'Gray'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Comfortable oversized t-shirt in premium cotton.', new: true },
      { name: 'High-Waisted Jeans', price: 79.90, colors: ['Blue', 'Black', 'White'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], desc: 'Classic high-waisted jeans with a flattering fit.', new: true },
      { name: 'Knit Midi Skirt', price: 69.90, colors: ['Black', 'Navy', 'Beige'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Elegant knit midi skirt with a comfortable fit.', new: true },
      { name: 'Structured Handbag', price: 149.90, colors: ['Black', 'Brown', 'Beige'], sizes: ['One Size'], desc: 'Classic structured handbag in premium leather.', new: true, bestSeller: true },
      { name: 'Satin Slip Dress', price: 89.90, colors: ['Black', 'Navy', 'Pink'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Elegant satin slip dress with adjustable straps.', new: true },
      { name: 'Wool Blend Scarf', price: 49.90, colors: ['Beige', 'Gray', 'Navy'], sizes: ['One Size'], desc: 'Luxurious wool blend scarf in a classic pattern.', new: true },
    ],
    'Outerwear': [
      { name: 'Wool Coat', price: 249.90, colors: ['Black', 'Navy', 'Camel'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], desc: 'Classic wool coat with a tailored fit.', bestSeller: true },
      { name: 'Trench Coat', price: 199.90, colors: ['Beige', 'Black', 'Navy'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Iconic trench coat in water-resistant fabric.' },
      { name: 'Puffer Jacket', price: 149.90, colors: ['Black', 'Navy', 'Olive'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Lightweight puffer jacket with a modern silhouette.' },
      { name: 'Leather Jacket', price: 299.90, colors: ['Black', 'Brown'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Classic leather jacket with a relaxed fit.', bestSeller: true },
      { name: 'Denim Jacket', price: 79.90, colors: ['Blue', 'Black', 'White'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Classic denim jacket with a comfortable fit.' },
      { name: 'Wool Blend Coat', price: 179.90, colors: ['Gray', 'Camel', 'Black'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Warm wool blend coat with a modern design.' },
      { name: 'Windbreaker', price: 89.90, colors: ['Black', 'Navy', 'Pink'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Lightweight windbreaker with a sporty design.' },
      { name: 'Peacoat', price: 219.90, colors: ['Navy', 'Black', 'Gray'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Classic peacoat with double-breasted closure.' },
      { name: 'Faux Fur Coat', price: 189.90, colors: ['Beige', 'Black', 'Gray'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Luxurious faux fur coat with a relaxed fit.' },
      { name: 'Bomber Jacket', price: 129.90, colors: ['Black', 'Olive', 'Navy'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Modern bomber jacket with ribbed cuffs.' },
      { name: 'Quilted Jacket', price: 139.90, colors: ['Black', 'Navy', 'Beige'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Stylish quilted jacket with a modern design.' },
      { name: 'Parka', price: 199.90, colors: ['Black', 'Olive', 'Navy'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Functional parka with a hood and multiple pockets.' },
    ],
    // More subcategories will be added...
  },
  // Men and Kids will be added...
}

// This is a template - the actual generation will create the full catalog
console.log('// This file would contain the full generated catalog')
console.log('// For now, see lib/fashion-products-data.ts for the structure')
