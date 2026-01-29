# Architecture Mapping & Inventory

## Current Architecture Overview

### Product Data Sources
**Primary Source**: `lib/products.ts`
- Single array: `productCatalog` (883 lines, ~40 products)
- Current categories: Geometric, Abstract, Sets, Modular, Premium
- Current subcategories: Cubes, Spheres, Prisms, Columns, Disks, Planes, Spirals, Flow, Edges, Folds, Pairs, Collections, Towers, Blocks, Bases, Assemblies, Layers, Grids, Signature
- Functions:
  - `getProductsBySubcategory(category, subcategory?)` - Filters by category/subcategory
  - `getAllProducts()` - Returns all products
  - `getProductById(id)` - Finds single product
  - `getFeaturedProducts()` - Filters by `isBestSeller || isNew`
  - `getNewArrivals()` - Filters by `isNew`
  - `getSaleProducts()` - Filters by `originalPrice > price`
  - `getNewReleases()` - Filters by `isNew` with fallback

**Product Type Definition**: `components/ProductListingPage.tsx` (lines 11-40)
- Core fields: id, name, brand, price, originalPrice, image, images, category, subcategory
- Variants: size[], color, colors[]
- Stock: inStock, stockQuantity
- Metadata: rating, reviewCount, sku, shortDescription
- Flags: isNew, isBestSeller, isOnlineOnly, isLimitedEdition, storeAvailable
- Promotions: promotionalMessage, discountPercentage, percentOff

### Navigation Structure
**File**: `components/Navigation.tsx` (lines 42-138)
- Hardcoded `navigationItems` array
- Current structure:
  - Women (with dropdown: Categories, Top Sellers, Collections)
  - Men (with dropdown: Categories, Top Sellers, Collections)
  - Accessories (with dropdown: Categories, By Material)
  - New Releases
  - Sale
- Featured images and links per category

### Category Pages
- `app/women/page.tsx` - Uses `getProductsBySubcategory('Women')` with content slots
- `app/men/page.tsx` - Uses `getProductsBySubcategory('Men')`
- `app/sale/page.tsx` - Uses `getSaleProducts()`
- `app/shop/[subcategory]/page.tsx` - Dynamic subcategory pages
- `app/women/[subcategory]/page.tsx` - Women subcategory pages
- `app/product/[id]/page.tsx` - Product detail pages

### Homepage Content
**File**: `app/page.tsx`
- Hero section: `components/Hero.tsx` with hardcoded slides (4 slides)
- Featured Products: Uses `getFeaturedProducts()`
- New Arrivals: Uses `getNewArrivals()`
- Brand Story section: Hardcoded text
- Newsletter section: Hardcoded

**Hero Component**: `components/Hero.tsx`
- Default slides array (lines 22-53)
- Current content: "Geometric Elegance", "Pure Form. Timeless Design.", etc.

### Footer & Custom Pages
**Footer**: `components/Footer.tsx`
- Hardcoded links structure
- Links to: About, Careers, Sustainability, Press, Customer Service, Size Guide, Shipping & Returns, Payment Methods, Contact

**Custom Pages**:
- `app/about/page.tsx` - About Us page with hardcoded content
- `app/sustainability/page.tsx` - Sustainability page with hardcoded content
- `app/customer-service/page.tsx` - Customer service page
- `app/shipping-returns/page.tsx` - Shipping & returns page
- `app/contact/page.tsx` - Contact page
- `app/privacy/page.tsx` - Privacy policy
- `app/terms/page.tsx` - Terms & conditions
- `app/careers/page.tsx` - Careers page
- `app/press/page.tsx` - Press page

### Reviews & Ratings
**Location**: `components/ProductDetailPage.tsx` (lines 70-151)
- Mock reviews array (`mockReviews`)
- Reviews passed as props to `ReviewSection` component
- Rating distribution calculated from reviews
- Reviews stored per product (not in products.ts)

## Proposed New Architecture

### Fashion Taxonomy Structure

**Top Level Categories**:
1. WOMEN
2. MEN  
3. KIDS
4. SALE

**WOMEN Subcategories**:
- New In
- Outerwear
- Dresses
- Tops
- Knitwear
- Shirts
- Jeans
- Trousers
- Skirts
- Blazers
- Activewear
- Shoes
- Bags
- Accessories

**MEN Subcategories**:
- New In
- Outerwear
- Jackets & Blazers
- Shirts
- T-Shirts
- Knitwear
- Jeans
- Trousers
- Suits
- Shoes
- Bags
- Accessories

**KIDS Structure**:
- Girls (New In, Outerwear, Dresses, Tops, Bottoms, Shoes, Accessories)
- Boys (New In, Outerwear, Tops, Bottoms, Shoes, Accessories)

**SALE**:
- Women
- Men
- Kids

### Data Model Changes

**Product Structure** (extend existing):
- Keep all existing fields
- Update `category` to: "Women", "Men", "Kids", "Sale"
- Update `subcategory` to fashion subcategories
- Add `longDescription` for PDP
- Add `materials`, `care`, `fit` fields
- Add `reviews` array per product (or keep separate)
- Ensure `tags` array for filtering

**Navigation Updates**:
- Replace `navigationItems` in `Navigation.tsx`
- Update featured images and links
- Add Kids category

**Content Updates**:
- Hero slides: Fashion-focused messaging
- Homepage sections: Fashion collections
- Category landing pages: Fashion-appropriate intro text
- Footer pages: Fashion retail content

## Implementation Plan

1. **Create Fashion Product Generator** (`lib/fashion-products.ts`)
   - Generate 30+ products per leaf category
   - Realistic names, descriptions, prices
   - Proper sizing (XS-XXL for apparel, shoe sizes, etc.)
   - Color variants
   - Stock levels
   - Reviews

2. **Update products.ts**
   - Replace `productCatalog` with fashion products
   - Update helper functions to work with new taxonomy

3. **Update Navigation**
   - Replace navigation structure
   - Update featured images

4. **Update Homepage**
   - New hero slides
   - Fashion-focused sections

5. **Update Content Pages**
   - Rewrite About, Sustainability, etc. for fashion brand

6. **Update Category Pages**
   - Add intro text for categories
   - Update content slots
