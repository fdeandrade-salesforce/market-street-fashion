/**
 * Fashion Product Definitions
 * Product templates organized by category and subcategory
 * Each template will generate multiple color variants
 */

// Product template type
export interface ProductTemplate {
  name: string
  price: number
  colors: string[]
  sizes: string[]
  shortDescription: string
  longDescription: string
  materials: string[]
  careInstructions: string[]
  fitNotes: string
  isNew?: boolean
  isBestSeller?: boolean
  isLimitedEdition?: boolean
  isOnlineOnly?: boolean
  tags?: string[]
}

// Product definitions organized by category and subcategory
export const productDefinitions: Record<string, Record<string, ProductTemplate[] | Record<string, ProductTemplate[]>>> = {
  Women: {
    'New In': [
      {
        name: 'Ribbed Tank Top',
        price: 29.90,
        colors: ['Black', 'White', 'Beige', 'Navy'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        shortDescription: 'Essential ribbed tank top with a relaxed fit. Perfect for layering or wearing alone.',
        longDescription: 'This versatile ribbed tank top is crafted from premium cotton blend for ultimate comfort. The relaxed fit allows for easy movement while maintaining a polished silhouette. Perfect as a base layer or worn alone, this piece transitions seamlessly from day to night.',
        materials: ['95% Cotton', '5% Elastane'],
        careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
        fitNotes: 'Relaxed fit. True to size.',
        isNew: true,
        tags: ['new-arrivals', 'basics', 'layering'],
      },
      {
        name: 'Oversized Blazer',
        price: 129.90,
        colors: ['Black', 'Navy', 'Beige'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        shortDescription: 'Modern oversized blazer with structured shoulders. A versatile piece for any wardrobe.',
        longDescription: 'Elevate your look with this contemporary oversized blazer featuring structured shoulders and a relaxed silhouette. Crafted from premium wool blend fabric, this piece offers both sophistication and comfort. The single-button closure and notched lapel create a timeless appeal.',
        materials: ['70% Wool', '25% Polyester', '5% Elastane'],
        careInstructions: ['Dry clean only'],
        fitNotes: 'Oversized fit. Size down for a more fitted look.',
        isNew: true,
        isBestSeller: true,
        tags: ['new-arrivals', 'blazers', 'professional'],
      },
      // Continue with 28+ more products for New In...
    ],
    'Outerwear': [
      {
        name: 'Wool Coat',
        price: 249.90,
        colors: ['Black', 'Navy', 'Camel'],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        shortDescription: 'Classic wool coat with a tailored fit. Timeless elegance for winter.',
        longDescription: 'Brave the elements in style with this classic wool coat. The tailored fit creates a flattering silhouette while the premium fabric offers exceptional warmth. The notched lapel and single-button closure add timeless sophistication.',
        materials: ['70% Wool', '25% Polyester', '5% Other'],
        careInstructions: ['Dry clean only'],
        fitNotes: 'Tailored fit. True to size.',
        isBestSeller: true,
        tags: ['outerwear', 'winter', 'classic'],
      },
      // Continue with 29+ more products for Outerwear...
    ],
    // More subcategories will be added...
  },
  Men: {
    'New In': [
      {
        name: 'Classic Oxford Shirt',
        price: 69.90,
        colors: ['White', 'Blue', 'Pink'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        shortDescription: 'Classic Oxford shirt with a modern fit. Perfect for professional and casual settings.',
        longDescription: 'A wardrobe essential reimagined with a modern fit. This classic Oxford shirt features a button-down collar and premium cotton fabric. The tailored cut ensures a polished look while maintaining comfort throughout the day.',
        materials: ['100% Cotton'],
        careInstructions: ['Machine wash cold', 'Hang dry', 'Iron on medium heat'],
        fitNotes: 'Modern fit. True to size.',
        isNew: true,
        tags: ['new-arrivals', 'shirts', 'professional'],
      },
      // Continue with 29+ more products...
    ],
    // More subcategories will be added...
  },
  Kids: {
    'Girls': {
      'New In': [
        {
          name: 'Floral Print Dress',
          price: 39.90,
          colors: ['Pink Floral', 'Blue Floral', 'Yellow Floral'],
          sizes: ['2T', '3T', '4T', '5', '6', '7', '8'],
          shortDescription: 'Adorable floral print dress perfect for special occasions.',
          longDescription: 'Your little one will love this beautiful floral print dress. Made from soft, breathable fabric with an elastic waist for comfort. Perfect for parties, school, or everyday wear.',
          materials: ['100% Cotton'],
          careInstructions: ['Machine wash cold', 'Tumble dry low'],
          fitNotes: 'Regular fit. True to size.',
          isNew: true,
          tags: ['new-arrivals', 'dresses', 'girls'],
        },
        // Continue with 29+ more products...
      ],
    },
    'Boys': {
      'New In': [
        {
          name: 'Classic Polo Shirt',
          price: 29.90,
          colors: ['Navy', 'Red', 'Gray'],
          sizes: ['2T', '3T', '4T', '5', '6', '7', '8'],
          shortDescription: 'Classic polo shirt perfect for active kids.',
          longDescription: 'Durable and comfortable, this classic polo shirt is perfect for active kids. Made from breathable cotton blend that moves with them throughout the day.',
          materials: ['60% Cotton', '40% Polyester'],
          careInstructions: ['Machine wash cold', 'Tumble dry low'],
          fitNotes: 'Regular fit. True to size.',
          isNew: true,
          tags: ['new-arrivals', 'tops', 'boys'],
        },
        // Continue with 29+ more products...
      ],
    },
  },
}
