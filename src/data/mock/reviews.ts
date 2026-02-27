/**
 * Mock Review Data
 * 
 * This file contains all review data used in the application.
 * Reviews are contextual to each product with realistic content.
 * In production, this would be fetched from Supabase.
 */

import { Review, ReviewSummary } from '../../types'

// ============================================================================
// MOCK REVIEWS - Contextual reviews for each product
// ============================================================================

export const mockReviews: Review[] = [
  // ============================================================================
  // RIBBED TANK TOP - Popular product with many reviews
  // ============================================================================
  {
    id: 'pc-1',
    productId: 'ribbed-tank-top',
    author: 'James R.',
    rating: 5,
    date: 'January 2025',
    location: 'San Francisco, CA',
    title: 'Perfect everyday staple',
    content: 'The Ribbed Tank Top is exactly what I was looking for. The white color is crisp and clean, and the fit is spot-on. It layers beautifully with blazers and cardigans and works for any occasion.',
    verified: true,
    helpful: 34,
    images: [
      'https://placehold.co/400x400/f5f5f5/333333?text=Review+Photo+1',
      'https://placehold.co/400x400/f5f5f5/333333?text=Review+Photo+2',
    ],
  },
  {
    id: 'pc-2',
    productId: 'ribbed-tank-top',
    author: 'Maria S.',
    rating: 5,
    date: 'December 2024',
    location: 'New York, NY',
    title: 'Office-to-weekend versatile',
    content: 'I bought this for work and it elevates every outfit. The quality is impeccable - you can tell the fabric is premium. The white color doesn\'t show wear which is a huge plus.',
    verified: true,
    helpful: 28,
    images: [
      'https://placehold.co/400x400/e8e8e8/333333?text=Home+Office+Setup',
    ],
  },
  {
    id: 'pc-3',
    productId: 'ribbed-tank-top',
    author: 'Thomas K.',
    rating: 4,
    date: 'November 2024',
    location: 'Chicago, IL',
    title: 'Beautiful but runs small',
    content: 'Gorgeous top with excellent fabric quality. My only note is that I wish I had ordered the Large size - the Medium is a bit snugger than it appeared in photos. That said, the quality is outstanding.',
    verified: true,
    helpful: 19,
  },
  {
    id: 'pc-4',
    productId: 'ribbed-tank-top',
    author: 'Emily W.',
    rating: 5,
    date: 'October 2024',
    location: 'Portland, OR',
    title: 'Bought 3 in different colors',
    content: 'These tank tops in multiple colors create such a versatile wardrobe base. The white matches everything perfectly. Already planning to buy more!',
    verified: true,
    helpful: 41,
    images: [
      'https://placehold.co/400x400/fafafa/333333?text=Shelf+Display+1',
      'https://placehold.co/400x400/fafafa/333333?text=Shelf+Display+2',
      'https://placehold.co/400x400/fafafa/333333?text=Shelf+Display+3',
    ],
  },
  {
    id: 'pc-7',
    productId: 'ribbed-tank-top',
    author: 'Alexandra P.',
    rating: 5,
    date: 'February 2025',
    location: 'Boston, MA',
    title: 'A comprehensive review after 6 months of ownership',
    content: 'I\'ve been meaning to write this review for a while now, and after wearing my Ribbed Tank Top for six months, I feel I can give a truly comprehensive assessment. First, the packaging - it arrived neatly folded and the presentation felt premium. Upon first trying it on, I was immediately struck by the softness and fit. The fabric has real substance and quality. The white color is absolutely pristine and pairs with everything. I\'ve worn mine to the office layered under blazers, on weekends with jeans, and even to casual dinners. The fabric holds up beautifully - I wash it weekly and it still looks new. I was initially worried about the white showing stains, but it cleans easily. My friends have actually asked where I got it because they want their own. Overall, this is the kind of wardrobe staple that elevates every outfit. Worth every penny and then some.',
    verified: true,
    helpful: 67,
    images: [
      'https://placehold.co/400x400/fafafa/333333?text=6+Month+Review',
    ],
  },
  {
    id: 'pc-5',
    productId: 'oversized-blazer',
    author: 'David L.',
    rating: 5,
    date: 'January 2025',
    location: 'Los Angeles, CA',
    title: 'Sleek and sophisticated',
    content: 'The black blazer is absolutely stunning. It has a subtle structure to the cut that photographs don\'t quite capture. Worth every penny.',
    verified: true,
    helpful: 22,
    images: [
      'https://placehold.co/400x400/2a2a2a/ffffff?text=Black+Cube+Photo',
    ],
  },
  {
    id: 'pc-6',
    productId: 'wide-leg-trousers',
    author: 'Rachel M.',
    rating: 4,
    date: 'December 2024',
    location: 'Seattle, WA',
    title: 'Great neutral option',
    content: 'The gray is the perfect middle ground - not too stark like white, not as dramatic as black. Pairs seamlessly with any top.',
    verified: true,
    helpful: 15,
    images: [
      'https://placehold.co/400x400/888888/ffffff?text=Living+Room',
    ],
  },

  // ============================================================================
  // SILK MIDI DRESS - Bestseller with solid reviews
  // ============================================================================
  {
    id: 'sc-1',
    productId: 'silk-midi-dress',
    author: 'Nathan B.',
    rating: 5,
    date: 'January 2025',
    location: 'Austin, TX',
    title: 'Timeless design',
    content: 'The Silk Midi Dress has a drape and presence that makes it feel special. It\'s become my go-to for events. The fit is perfect.',
    verified: true,
    helpful: 27,
    images: [
      'https://placehold.co/400x400/d4d4d4/333333?text=Coffee+Table+View',
    ],
  },
  {
    id: 'sc-2',
    productId: 'silk-midi-dress',
    author: 'Sophie T.',
    rating: 4,
    date: 'November 2024',
    location: 'Denver, CO',
    title: 'Versatile piece',
    content: 'I wear this to the office and evenings out. Dresses up or down beautifully. Would love to see more color options.',
    verified: true,
    helpful: 18,
  },
  {
    id: 'sc-3',
    productId: 'silk-midi-dress',
    author: 'Marcus J.',
    rating: 5,
    date: 'October 2024',
    location: 'Miami, FL',
    title: 'Better than expected',
    content: 'Arrived perfectly packaged. The silk has a smooth, luxurious feel. I always get compliments when I wear it.',
    verified: true,
    helpful: 12,
    images: [
      'https://placehold.co/400x400/e0e0e0/333333?text=Unboxing',
      'https://placehold.co/400x400/e0e0e0/333333?text=Detail+Shot',
    ],
  },

  // ============================================================================
  // LEATHER ANKLE BOOTS - Good reviews with some variance
  // ============================================================================
  {
    id: 'ss-1',
    productId: 'leather-ankle-boots',
    author: 'Lauren H.',
    rating: 5,
    date: 'December 2024',
    location: 'Boston, MA',
    title: 'Classic elegance',
    content: 'These ankle boots have a timeless profile. The leather is so supple and comfortable. They\'ve become my everyday go-to footwear.',
    verified: true,
    helpful: 31,
    images: [
      'https://placehold.co/400x400/f0f0f0/333333?text=Meditation+Corner',
    ],
  },
  {
    id: 'ss-2',
    productId: 'leather-ankle-boots',
    author: 'Chris P.',
    rating: 3,
    date: 'November 2024',
    location: 'Philadelphia, PA',
    title: 'Nice but not perfect',
    content: 'The boots are beautiful but I noticed a small imperfection in the stitching. Customer service was helpful but I expected perfection at this price point.',
    verified: true,
    helpful: 8,
  },
  {
    id: 'ss-3',
    productId: 'leather-ankle-boots',
    author: 'Amanda G.',
    rating: 5,
    date: 'October 2024',
    location: 'Nashville, TN',
    title: 'Absolutely love it',
    content: 'Perfect addition to my wardrobe. The neutral tone works with everything and the style adds polish to any outfit.',
    verified: true,
    helpful: 24,
    images: [
      'https://placehold.co/400x400/e8e8e8/333333?text=Entryway+Console',
      'https://placehold.co/400x400/e8e8e8/333333?text=Close+Up',
    ],
  },

  // ============================================================================
  // STRUCTURED HANDBAG - Fewer reviews, newer product feel
  // ============================================================================
  {
    id: 'fc-1',
    productId: 'structured-handbag',
    author: 'Diana K.',
    rating: 5,
    date: 'January 2025',
    location: 'San Diego, CA',
    title: 'Striking design',
    content: 'The Structured Handbag makes such a statement. The clean lines and quality construction are remarkable - it looks like a designer piece.',
    verified: true,
    helpful: 14,
    images: [
      'https://placehold.co/400x400/f8f8f8/333333?text=Cone+Detail',
    ],
  },
  {
    id: 'fc-2',
    productId: 'structured-handbag',
    author: 'Peter M.',
    rating: 4,
    date: 'December 2024',
    location: 'Dallas, TX',
    title: 'Great conversation starter',
    content: 'Everyone asks where I got this bag. It has such a polished, professional look. Docking one star only because I wish it came in more colors.',
    verified: true,
    helpful: 9,
  },

  // ============================================================================
  // WOOL BLEND COAT - New product, fewer but enthusiastic reviews
  // ============================================================================
  {
    id: 'sp-1',
    productId: 'wool-blend-coat',
    author: 'Victoria N.',
    rating: 5,
    date: 'January 2025',
    location: 'Brooklyn, NY',
    title: 'Fabric drapes beautifully',
    content: 'The Wool Blend Coat has the most beautiful drape. The quality of the wool blend is evident - it holds its shape while feeling incredibly soft. Absolutely love it.',
    verified: true,
    helpful: 38,
    images: [
      'https://placehold.co/400x400/fff8dc/333333?text=Morning+Light',
      'https://placehold.co/400x400/fff8dc/333333?text=Wall+Pattern',
    ],
  },
  {
    id: 'sp-2',
    productId: 'wool-blend-coat',
    author: 'Jonathan R.',
    rating: 5,
    date: 'December 2024',
    location: 'Minneapolis, MN',
    title: 'Tailored perfection',
    content: 'The cut is impeccable. The structure is crisp, the finish is flawless. It\'s my go-to coat for important meetings and events.',
    verified: true,
    helpful: 26,
    images: [
      'https://placehold.co/400x400/f0f0f0/333333?text=Desk+Setup',
    ],
  },
  {
    id: 'sp-3',
    productId: 'wool-blend-coat',
    author: 'Kelly T.',
    rating: 4,
    date: 'November 2024',
    location: 'Phoenix, AZ',
    title: 'Unique piece',
    content: 'Love the classic silhouette. It works with dresses and jeans alike. Would recommend for anyone who appreciates quality outerwear.',
    verified: true,
    helpful: 15,
  },

  // ============================================================================
  // OXFORD SHIRT - Classic staple, exclusive feel
  // ============================================================================
  {
    id: 'df-1',
    productId: 'oxford-shirt',
    author: 'Alexander B.',
    rating: 5,
    date: 'December 2024',
    location: 'Washington, DC',
    title: 'Worth the splurge',
    content: 'The Oxford Shirt is a wardrobe essential. It works with blazers for the office and jeans for weekends. The quality is exceptional.',
    verified: true,
    helpful: 29,
    images: [
      'https://placehold.co/400x400/f5f5f5/333333?text=Bookshelf+Display',
      'https://placehold.co/400x400/f5f5f5/333333?text=Both+Forms',
    ],
  },
  {
    id: 'df-2',
    productId: 'oxford-shirt',
    author: 'Stephanie L.',
    rating: 5,
    date: 'November 2024',
    location: 'Atlanta, GA',
    title: 'Elegant and versatile',
    content: 'I wear this shirt to meetings and casual Fridays. It layers beautifully under sweaters. The quality is exceptional.',
    verified: true,
    helpful: 17,
    images: [
      'https://placehold.co/400x400/e8e0d8/333333?text=Fireplace+Mantle',
    ],
  },

  // ============================================================================
  // KNIT MIDI SKIRT - Bestseller with many positive reviews
  // ============================================================================
  {
    id: 'vs-1',
    productId: 'knit-midi-skirt',
    author: 'Michelle B.',
    rating: 5,
    date: 'January 2025',
    location: 'Scottsdale, AZ',
    title: 'Best purchase this year',
    content: 'The Knit Midi Skirt exceeded all my expectations. The fit is perfect and the quality is excellent. I wear it weekly with different tops.',
    verified: true,
    helpful: 52,
    images: [
      'https://placehold.co/400x400/f8f8f8/333333?text=Stacked+Arrangement',
      'https://placehold.co/400x400/f8f8f8/333333?text=Different+Config',
      'https://placehold.co/400x400/f8f8f8/333333?text=Close+Up',
    ],
  },
  {
    id: 'vs-2',
    productId: 'knit-midi-skirt',
    author: 'Brian K.',
    rating: 5,
    date: 'December 2024',
    location: 'San Jose, CA',
    title: 'Versatile and beautiful',
    content: 'This skirt works with blouses, sweaters, or t-shirts. The knit quality is consistent and impressive. A true wardrobe staple.',
    verified: true,
    helpful: 38,
    images: [
      'https://placehold.co/400x400/ececec/333333?text=Floating+Shelves',
    ],
  },
  {
    id: 'vs-3',
    productId: 'knit-midi-skirt',
    author: 'Nina S.',
    rating: 4,
    date: 'November 2024',
    location: 'Raleigh, NC',
    title: 'Great value',
    content: 'The price point is excellent for the quality. Pairs with so many tops. Minor note: wish it came in more colors.',
    verified: true,
    helpful: 21,
  },
  {
    id: 'vs-4',
    productId: 'knit-midi-skirt',
    author: 'Daniel F.',
    rating: 5,
    date: 'October 2024',
    location: 'Columbus, OH',
    title: 'Style blogger approved',
    content: 'As a fashion enthusiast, I recommend this to friends all the time. It photographs beautifully and works for virtually any occasion.',
    verified: true,
    helpful: 44,
    images: [
      'https://placehold.co/400x400/fafafa/333333?text=Client+Project+1',
      'https://placehold.co/400x400/fafafa/333333?text=Client+Project+2',
    ],
  },
  {
    id: 'vs-5',
    productId: 'knit-midi-skirt',
    author: 'Margaret H.',
    rating: 5,
    date: 'January 2025',
    location: 'San Diego, CA',
    title: 'Transformed my wardrobe - detailed review',
    content: 'I want to share my experience with the Knit Midi Skirt because I think potential buyers deserve a thorough review. I purchased this after months of looking for the perfect midi skirt, and I can confidently say it was one of the best wardrobe decisions I\'ve ever made. It arrived impeccably packaged. When I first tried it on, I was blown away by how flattering the fit is. The craftsmanship is exceptional - you can tell the knit quality is premium. What I love most is the versatility. I\'ve styled it with at least a dozen different tops, and each look feels completely different. Sometimes I wear it with a tucked-in blouse for the office. Other times with a cozy sweater for weekends. My friends were initially skeptical about another skirt purchase, but even they admit it\'s become a staple. I\'ve received countless compliments, with many asking where I got it. The fabric has held up beautifully over the past few months with proper care. If you\'re on the fence, I say go for it. This is the kind of purchase that gets worn constantly.',
    verified: true,
    helpful: 58,
    images: [
      'https://placehold.co/400x400/fafafa/333333?text=Living+Room+Transform',
      'https://placehold.co/400x400/fafafa/333333?text=Arrangement+1',
      'https://placehold.co/400x400/fafafa/333333?text=Arrangement+2',
    ],
  },

  // ============================================================================
  // SATIN SLIP DRESS - New and elegant
  // ============================================================================
  {
    id: 'sa-1',
    productId: 'satin-slip-dress',
    author: 'Olivia P.',
    rating: 5,
    date: 'January 2025',
    location: 'Salt Lake City, UT',
    title: 'Elegant masterpiece',
    content: 'The Satin Slip Dress is more than a dress - it\'s a statement. The drape and flow are so flattering. Absolutely stunning for special occasions.',
    verified: true,
    helpful: 23,
    images: [
      'https://placehold.co/400x400/f0f0f0/333333?text=Living+Room+Spiral',
    ],
  },
  {
    id: 'sa-2',
    productId: 'satin-slip-dress',
    author: 'Michael H.',
    rating: 5,
    date: 'December 2024',
    location: 'Portland, ME',
    title: 'Designer quality',
    content: 'This could easily be from a luxury brand. The satin has a gorgeous sheen and the craftsmanship is flawless. Worth every penny.',
    verified: true,
    helpful: 18,
    images: [
      'https://placehold.co/400x400/e8e8e8/333333?text=Detail+1',
      'https://placehold.co/400x400/e8e8e8/333333?text=Detail+2',
    ],
  },

  // ============================================================================
  // PLEATED MIDI SKIRT - Bestseller, classic product
  // ============================================================================
  {
    id: 'ff1-1',
    productId: 'pleated-midi-skirt',
    author: 'Catherine R.',
    rating: 5,
    date: 'January 2025',
    location: 'Santa Monica, CA',
    title: 'Breathtaking movement',
    content: 'The Pleated Midi Skirt has this incredible flow when you walk. The pleats catch the light beautifully. My favorite skirt in my wardrobe.',
    verified: true,
    helpful: 41,
    images: [
      'https://placehold.co/400x400/f5f5f5/333333?text=Angle+1',
      'https://placehold.co/400x400/f5f5f5/333333?text=Angle+2',
      'https://placehold.co/400x400/f5f5f5/333333?text=Angle+3',
    ],
  },
  {
    id: 'ff1-2',
    productId: 'pleated-midi-skirt',
    author: 'Andrew T.',
    rating: 5,
    date: 'December 2024',
    location: 'Austin, TX',
    title: 'Worth the investment',
    content: 'This is a statement piece that elevates any outfit. The pleats are so crisp and the fit is impeccable. Highly recommend.',
    verified: true,
    helpful: 33,
    images: [
      'https://placehold.co/400x400/ececec/333333?text=Room+Setting',
    ],
  },
  {
    id: 'ff1-3',
    productId: 'pleated-midi-skirt',
    author: 'Rebecca W.',
    rating: 4,
    date: 'November 2024',
    location: 'Charlotte, NC',
    title: 'Beautiful but needs care',
    content: 'Gorgeous skirt but dry clean only. Small price to pay for something this beautiful. Size up if you\'re between sizes!',
    verified: true,
    helpful: 19,
  },

  // ============================================================================
  // LEATHER CROSSBODY BAG - Bestseller, versatile accessory
  // ============================================================================
  {
    id: 'fb-1',
    productId: 'leather-crossbody-bag',
    author: 'Robert H.',
    rating: 5,
    date: 'January 2025',
    location: 'Detroit, MI',
    title: 'Endlessly versatile',
    content: 'The Leather Crossbody Bag is genius. I use it for work, weekends, and travel. The size is perfect and it always looks polished.',
    verified: true,
    helpful: 36,
    images: [
      'https://placehold.co/400x400/f0f0f0/333333?text=Config+1',
      'https://placehold.co/400x400/f0f0f0/333333?text=Config+2',
      'https://placehold.co/400x400/f0f0f0/333333?text=Config+3',
    ],
  },
  {
    id: 'fb-2',
    productId: 'leather-crossbody-bag',
    author: 'Jessica M.',
    rating: 5,
    date: 'December 2024',
    location: 'Tampa, FL',
    title: 'Best crossbody design',
    content: 'I\'ve tried other crossbody bags but nothing compares to the quality and design of this one. The strap length is perfect.',
    verified: true,
    helpful: 28,
    images: [
      'https://placehold.co/400x400/e8e8e8/333333?text=Modular+Setup',
    ],
  },
  {
    id: 'fb-3',
    productId: 'leather-crossbody-bag',
    author: 'William C.',
    rating: 4,
    date: 'November 2024',
    location: 'Indianapolis, IN',
    title: 'Great bag, want more colors',
    content: 'Love the design and quality. Would buy in other colors in a heartbeat if they were available. Hint hint, Market Street!',
    verified: true,
    helpful: 22,
  },

  // ============================================================================
  // SILK BLOUSE - Premium product, glowing reviews
  // ============================================================================
  {
    id: 'sf-1',
    productId: 'silk-blouse',
    author: 'Jennifer S.',
    rating: 5,
    date: 'January 2025',
    location: 'Beverly Hills, CA',
    title: 'The crown jewel of my wardrobe',
    content: 'The Silk Blouse is absolutely worth the premium price. It\'s my go-to for important meetings and the quality is beyond reproach. Luxury-level craftsmanship.',
    verified: true,
    helpful: 56,
    images: [
      'https://placehold.co/400x400/fafafa/333333?text=Living+Room+Center',
      'https://placehold.co/400x400/fafafa/333333?text=Detail+Shot',
    ],
  },
  {
    id: 'sf-2',
    productId: 'silk-blouse',
    author: 'Christopher L.',
    rating: 5,
    date: 'December 2024',
    location: 'Manhattan, NY',
    title: 'Investment piece',
    content: 'This is the kind of piece you build outfits around. The silk is pristine and the cut is timeless. A wardrobe staple for years to come.',
    verified: true,
    helpful: 42,
    images: [
      'https://placehold.co/400x400/f5f5f5/333333?text=Room+View',
    ],
  },
  {
    id: 'sf-3',
    productId: 'tailored-blazer',
    author: 'Angela M.',
    rating: 5,
    date: 'January 2025',
    location: 'Malibu, CA',
    title: 'Stunning tailored fit',
    content: 'The blazer has a perfect structured fit that flatters my silhouette. It\'s modern yet timeless. Absolutely love it.',
    verified: true,
    helpful: 31,
    images: [
      'https://placehold.co/400x400/c0c0c0/333333?text=Silver+Shimmer',
      'https://placehold.co/400x400/c0c0c0/333333?text=Light+Reflection',
    ],
  },
  {
    id: 'sf-4',
    productId: 'slim-fit-chinos',
    author: 'Gregory P.',
    rating: 5,
    date: 'December 2024',
    location: 'Chicago, IL',
    title: 'Versatile and elegant',
    content: 'The Slim Fit Chinos make such a polished statement. They anchor my work and weekend wardrobes perfectly. The fit is chef\'s kiss.',
    verified: true,
    helpful: 27,
    images: [
      'https://placehold.co/400x400/1a1a1a/ffffff?text=Contrast+View',
    ],
  },
  {
    id: 'sf-5',
    productId: 'silk-blouse',
    author: 'Richard M.',
    rating: 5,
    date: 'January 2025',
    location: 'Miami Beach, FL',
    title: 'An investment piece that defines my style - full review',
    content: 'After researching premium wardrobe staples for nearly a year, I finally pulled the trigger on the Silk Blouse, and I need to share why this was absolutely the right choice. Let me start with my background: I work in a creative field where presentation matters, and I\'ve invested in pieces from well-known brands. This Silk Blouse stands shoulder to shoulder with items costing three times as much. The fabric itself is mesmerizing - it has a beautiful drape that creates different silhouettes depending on how you style it. For the office, I pair it with the Slim Fit Chinos. For evenings, I tuck it into high-waisted trousers. The craftsmanship deserves special mention. I examined every stitch and found zero imperfections. The finish is uniform, the buttons are secure, and the cut is flattering. This is the work of true artisans. This blouse has essentially become the anchor of my work wardrobe. Colleagues invariably ask where I got it. Several have already ordered their own after seeing mine. Is it an investment? Absolutely. Is it worth every penny? Without question.',
    verified: true,
    helpful: 73,
    images: [
      'https://placehold.co/400x400/fafafa/333333?text=Oceanfront+Display',
      'https://placehold.co/400x400/fafafa/333333?text=Morning+Light',
      'https://placehold.co/400x400/fafafa/333333?text=Evening+Lighting',
    ],
  },

  // ============================================================================
  // WOOL BLEND SCARF - Classic accessory, enthusiast reviews
  // ============================================================================
  {
    id: 'ca-1',
    productId: 'wool-blend-scarf',
    author: 'Timothy R.',
    rating: 5,
    date: 'January 2025',
    location: 'San Francisco, CA',
    title: 'Cozy meets chic',
    content: 'The Wool Blend Scarf is a winter essential. The softness is satisfying and it adds polish to any outfit. I wear it with coats and blazers alike.',
    verified: true,
    helpful: 24,
    images: [
      'https://placehold.co/400x400/e0e0e0/333333?text=Assembly+Process',
      'https://placehold.co/400x400/e0e0e0/333333?text=Final+Display',
    ],
  },
  {
    id: 'ca-2',
    productId: 'wool-blend-scarf',
    author: 'Samantha K.',
    rating: 5,
    date: 'December 2024',
    location: 'Seattle, WA',
    title: 'Worth the wait',
    content: 'Had to wait for this to come back in stock but it was worth every day. The quality and softness are unmatched. A true wardrobe staple.',
    verified: true,
    helpful: 18,
    images: [
      'https://placehold.co/400x400/f0f0f0/333333?text=Collection+Display',
    ],
  },

  // ============================================================================
  // LEATHER CHELSEA BOOTS - Footwear, positive reviews
  // ============================================================================
  {
    id: 'tt-1',
    productId: 'leather-chelsea-boots',
    author: 'Patricia N.',
    rating: 5,
    date: 'January 2025',
    location: 'Houston, TX',
    title: 'Classic versatile boot',
    content: 'These Chelsea boots go with everything. Dresses, jeans, trousers - they add polish to any outfit. Beautiful craftsmanship.',
    verified: true,
    helpful: 31,
    images: [
      'https://placehold.co/400x400/f5f5f5/333333?text=Fireplace+View',
      'https://placehold.co/400x400/f5f5f5/333333?text=Height+Detail',
    ],
  },
  {
    id: 'tt-2',
    productId: 'crew-neck-t-shirt',
    author: 'Edward J.',
    rating: 4,
    date: 'December 2024',
    location: 'Pittsburgh, PA',
    title: 'Perfect everyday tee',
    content: 'The fit works great for layering or wearing alone. Adds polish without trying too hard. Wish it came in more colors.',
    verified: true,
    helpful: 14,
    images: [
      'https://placehold.co/400x400/e8e8e8/333333?text=Desk+Setup',
    ],
  },

  // ============================================================================
  // PRODUCTS WITH NO REVIEWS (realistic scenario)
  // ============================================================================
  // offset-pair, tilted-column, floating-disk-charcoal, micro-spiral, 
  // contrast-plane, shadow-edge, polished-fold, layer-one, layer-two - NO REVIEWS

  // ============================================================================
  // PRODUCTS WITH 1-2 REVIEWS
  // ============================================================================
  {
    id: 'fd-1',
    productId: 'leather-belt',
    author: 'Linda C.',
    rating: 4,
    date: 'December 2024',
    location: 'Sacramento, CA',
    title: 'Simple and elegant',
    content: 'The Leather Belt is understated but beautiful. It adds a subtle touch of polish to any outfit. Great quality.',
    verified: true,
    helpful: 8,
    images: [
      'https://placehold.co/400x400/fafafa/333333?text=Disk+Display',
    ],
  },
  {
    id: 'us-1',
    productId: 'cashmere-scarf',
    author: 'Mark W.',
    rating: 5,
    date: 'January 2025',
    location: 'Las Vegas, NV',
    title: 'Perfect luxury',
    content: 'The Cashmere Scarf is mesmerizing. The softness is incredible. Pairs perfectly with my wool coat.',
    verified: true,
    helpful: 16,
    images: [
      'https://placehold.co/400x400/f5e6c8/333333?text=Golden+Tones',
      'https://placehold.co/400x400/f5e6c8/333333?text=Sideboard+View',
    ],
  },
  {
    id: 'us-2',
    productId: 'cashmere-scarf',
    author: 'Carol T.',
    rating: 4,
    date: 'December 2024',
    location: 'Milwaukee, WI',
    title: 'Beautiful addition',
    content: 'Bought this as a gift for my daughter. She loves it! The color options are great.',
    verified: true,
    helpful: 11,
  },
  {
    id: 'bm-1',
    productId: 'bomber-jacket',
    author: 'Frank D.',
    rating: 5,
    date: 'December 2024',
    location: 'Kansas City, MO',
    title: 'Great casual layer',
    content: 'The Bomber Jacket is my go-to casual outer layer. Solid construction and works with jeans and dresses alike.',
    verified: true,
    helpful: 14,
    images: [
      'https://placehold.co/400x400/e0e0e0/333333?text=Modular+Start',
    ],
  },
  {
    id: 'cl-1',
    productId: 'leather-messenger-bag',
    author: 'Helen R.',
    rating: 4,
    date: 'November 2024',
    location: 'Orlando, FL',
    title: 'Nice professional design',
    content: 'The Leather Messenger Bag has the perfect size for my laptop and essentials. Good value for the quality.',
    verified: true,
    helpful: 7,
  },
  {
    id: 'lg-1',
    productId: 'wool-blend-overcoat',
    author: 'Steven M.',
    rating: 5,
    date: 'January 2025',
    location: 'Cleveland, OH',
    title: 'Classic perfection',
    content: 'The Wool Blend Overcoat is so well tailored. It elevates any outfit for fall and winter. Highly recommend.',
    verified: true,
    helpful: 12,
    images: [
      'https://placehold.co/400x400/e8e8e8/333333?text=Shadow+Pattern',
      'https://placehold.co/400x400/e8e8e8/333333?text=Grid+Detail',
    ],
  },
  {
    id: 'sc-4',
    productId: 'cropped-cardigan',
    author: 'Dorothy L.',
    rating: 5,
    date: 'December 2024',
    location: 'San Antonio, TX',
    title: 'Elegant layering piece',
    content: 'The Cropped Cardigan adds polish to any outfit. The proportions are perfect and it layers beautifully.',
    verified: true,
    helpful: 9,
    images: [
      'https://placehold.co/400x400/f0f0f0/333333?text=Corner+View',
    ],
  },
]

// ============================================================================
// HELPER: Generate Review Summary for a Product
// ============================================================================

export function generateReviewSummary(productId: string): ReviewSummary {
  const productReviews = mockReviews.filter((r) => r.productId === productId)
  
  if (productReviews.length === 0) {
    return {
      productId,
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      aiSummary: undefined,
    }
  }

  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  let totalRating = 0

  productReviews.forEach((review) => {
    const rounded = Math.round(review.rating) as 1 | 2 | 3 | 4 | 5
    if (rounded >= 1 && rounded <= 5) {
      ratingDistribution[rounded]++
    }
    totalRating += review.rating
  })

  const averageRating = totalRating / productReviews.length

  return {
    productId,
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: productReviews.length,
    ratingDistribution,
    aiSummary: undefined, // Placeholder for AI-generated summary
  }
}

// Pre-computed review summaries for all products with reviews
export const mockReviewSummaries: Record<string, ReviewSummary> = {
  'ribbed-tank-top': generateReviewSummary('ribbed-tank-top'),
  'oversized-blazer': generateReviewSummary('oversized-blazer'),
  'wide-leg-trousers': generateReviewSummary('wide-leg-trousers'),
  'silk-midi-dress': generateReviewSummary('silk-midi-dress'),
  'leather-ankle-boots': generateReviewSummary('leather-ankle-boots'),
  'structured-handbag': generateReviewSummary('structured-handbag'),
  'wool-blend-coat': generateReviewSummary('wool-blend-coat'),
  'oxford-shirt': generateReviewSummary('oxford-shirt'),
  'knit-midi-skirt': generateReviewSummary('knit-midi-skirt'),
  'satin-slip-dress': generateReviewSummary('satin-slip-dress'),
  'pleated-midi-skirt': generateReviewSummary('pleated-midi-skirt'),
  'leather-crossbody-bag': generateReviewSummary('leather-crossbody-bag'),
  'silk-blouse': generateReviewSummary('silk-blouse'),
  'tailored-blazer': generateReviewSummary('tailored-blazer'),
  'slim-fit-chinos': generateReviewSummary('slim-fit-chinos'),
  'wool-blend-scarf': generateReviewSummary('wool-blend-scarf'),
  'leather-chelsea-boots': generateReviewSummary('leather-chelsea-boots'),
  'crew-neck-t-shirt': generateReviewSummary('crew-neck-t-shirt'),
  'leather-belt': generateReviewSummary('leather-belt'),
  'cashmere-scarf': generateReviewSummary('cashmere-scarf'),
  'bomber-jacket': generateReviewSummary('bomber-jacket'),
  'leather-messenger-bag': generateReviewSummary('leather-messenger-bag'),
  'wool-blend-overcoat': generateReviewSummary('wool-blend-overcoat'),
  'cropped-cardigan': generateReviewSummary('cropped-cardigan'),
}
