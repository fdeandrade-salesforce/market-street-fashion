# Unified Gutter System - Complete Implementation

## Overview
Created a single, unified gutter system applied consistently across EVERY page and global component. This ensures perfect alignment between header, footer, mega menu, and all content areas.

## Unified Gutter System

### Core Utility Classes (in `app/globals.css`)

**1. `.layout-gutter`** - Base gutter utility (single source of truth)
```css
@apply px-4 sm:px-6 lg:px-8 xl:px-10;
```
- Mobile: `px-4` (16px)
- Tablet: `sm:px-6` (24px)
- Desktop: `lg:px-8` (32px)
- Large Desktop: `xl:px-10` (40px)

**2. `.layout-commerce`** - Full-width container for commerce pages
```css
@apply layout-gutter mx-auto;
```
- **Use for**: Home, PLP, PDP, Cart, Account, Commerce grids
- **Behavior**: Full width with gutters only (no max-width constraint)
- **Purpose**: Maximize product display area

**3. `.layout-editorial`** - Max-width container for text-heavy pages
```css
@apply layout-gutter max-w-7xl mx-auto;
```
- **Use for**: About, Sustainability, Legal pages, Text-heavy content
- **Behavior**: Same gutters, but constrained width (max-w-7xl) for readability
- **Purpose**: Optimal reading width while maintaining gutter alignment

### Legacy Aliases (for backward compatibility)
- `.page-container` → `.layout-commerce`
- `.page-container-content` → `.layout-editorial`
- `.page-container-full` → `.layout-commerce`
- `.hero-container` → `.layout-commerce`

## Gutter Values by Breakpoint

| Breakpoint | Padding | Value |
|------------|---------|-------|
| Mobile (default) | `px-4` | 16px |
| Tablet (`sm:`) | `px-6` | 24px |
| Desktop (`lg:`) | `px-8` | 32px |
| Large Desktop (`xl:`) | `px-10` | 40px |

## Commerce vs Editorial Width Rules

### Commerce Pages (`.layout-commerce`)
- **Full width** with gutters only
- No max-width constraint
- Allows product grids to use maximum available width
- Examples: Home, `/women`, `/men`, `/kids`, `/product/[id]`, `/cart`, `/account`

### Editorial Pages (`.layout-editorial`)
- **Max-width** `max-w-7xl` (1280px) for readability
- Same gutters as commerce pages
- Ensures text doesn't stretch too wide
- Examples: `/about`, `/sustainability`, `/terms`, `/shipping-returns`, `/privacy`

## Alignment Guarantee

All components using `.layout-commerce` or `.layout-editorial` share the **exact same gutter values**, ensuring:

✅ **Header left edge** aligns with **product grid left edge**  
✅ **Mega menu dropdown** aligns with **same left edge**  
✅ **Footer left edge** aligns with **same left edge**  
✅ **Cart page** aligns with **same left edge**  
✅ **Account pages** align with **same left edge**  
✅ **PDP gallery** aligns with **same left edge**

## Files Modified

### Core System (1 file)
- `app/globals.css` - Created unified gutter system with 3 utility classes

### Global Components (11 files)
- `components/Navigation.tsx` - Header and mega menu use `.layout-commerce`
- `components/Footer.tsx` - Footer uses `.layout-commerce`
- `components/AnnouncementBar.tsx` - Uses `.layout-commerce`
- `components/Hero.tsx` - Hero content uses `.layout-commerce`
- `components/ProductListingPage.tsx` - PLP uses `.layout-commerce`
- `components/ProductDetailPage.tsx` - PDP uses `.layout-commerce`
- `components/MyAccountPage.tsx` - Account pages use `.layout-commerce`
- `components/TrackingConsentBanner.tsx` - Uses `.layout-commerce`
- `components/SearchModal.tsx` - Uses `.layout-commerce`
- `components/ContactSection.tsx` - Uses `.layout-commerce`
- `components/OrderDetailPage.tsx` - Uses `.layout-commerce`

### Commerce Pages (6 files)
- `app/page.tsx` - Home page uses `.layout-commerce` and `.layout-editorial`
- `app/new-releases/page.tsx` - Uses `.layout-commerce`
- `app/cart/page.tsx` - Uses `.layout-commerce`
- `app/women/page.tsx` - Uses ProductListingPage (already updated)
- `app/men/page.tsx` - Uses ProductListingPage (already updated)
- `app/kids/page.tsx` - Uses ProductListingPage (already updated)
- `app/sale/page.tsx` - Uses ProductListingPage (already updated)

### Editorial Pages (12 files)
- `app/about/page.tsx` - Uses `.layout-editorial`
- `app/sustainability/page.tsx` - Uses `.layout-editorial`
- `app/terms/page.tsx` - Uses `.layout-editorial`
- `app/size-guide/page.tsx` - Uses `.layout-editorial`
- `app/shipping-returns/page.tsx` - Uses `.layout-editorial`
- `app/privacy/page.tsx` - Uses `.layout-editorial`
- `app/privacy-choices/page.tsx` - Uses `.layout-editorial`
- `app/press/page.tsx` - Uses `.layout-editorial`
- `app/payment-methods/page.tsx` - Uses `.layout-editorial`
- `app/customer-service/page.tsx` - Uses `.layout-editorial`
- `app/contact/page.tsx` - Uses `.layout-editorial`
- `app/careers/page.tsx` - Uses `.layout-editorial`
- `app/accessibility/page.tsx` - Uses `.layout-editorial`

### Subcategory Pages (inherited)
- `app/women/[subcategory]/page.tsx` - Uses ProductListingPage component
- `app/men/[subcategory]/page.tsx` - Uses ProductListingPage component
- `app/kids/[subcategory]/page.tsx` - Uses ProductListingPage component
- `app/product/[id]/page.tsx` - Uses ProductDetailPage component

### Account Subpages (inherited)
- All account subpages use MyAccountPage component which uses `.layout-commerce`

## Special Cases

### Full-Bleed Sections
For sections that need to break out of the gutter container (e.g., background colors):
```tsx
<section className="bg-brand-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 layout-gutter py-12">
```
- Negative margins match gutter values exactly
- Then reapply `.layout-gutter` for inner content alignment

### Mini-Cart Drawer
- Uses its own padding (`p-4 md:p-6`) appropriate for drawer component
- Not required to match page gutters (drawer has different constraints)

### Button Padding
- Component-level padding (e.g., `px-8` in buttons) is separate from page gutters
- These are intentional design choices, not page layout gutters

## Validation Checklist

### Alignment Tests
- ✅ Header left edge = Product grid left edge
- ✅ Mega menu dropdown left edge = Product grid left edge
- ✅ Footer left edge = Product grid left edge
- ✅ Cart page left edge = Product grid left edge
- ✅ Account pages left edge = Product grid left edge
- ✅ PDP gallery left edge = Product grid left edge

### Responsiveness Tests
- ✅ Mobile: 16px padding (comfortable, not cramped)
- ✅ Tablet: 24px padding (moderate)
- ✅ Desktop: 32px padding (appropriate for fashion commerce)
- ✅ Large Desktop: 40px padding (subtle, not huge)
- ✅ No horizontal scrolling introduced

### Tested Routes
- ✅ `/` - Home page (commerce + editorial sections)
- ✅ `/women` - Product listing page
- ✅ `/women/new-in` - Subcategory page
- ✅ `/product/{id}` - Product detail page
- ✅ `/cart` - Cart page
- ✅ `/account` - Account landing page
- ✅ `/account/order-history` - Account subpage
- ✅ `/about` - Editorial page
- ✅ `/sustainability` - Editorial page
- ✅ `/shipping-returns` - Editorial page

## Benefits

1. **Perfect Alignment**: Header, footer, mega menu, and all content share the same gutter system
2. **Single Source of Truth**: One utility class (`.layout-gutter`) controls all gutters
3. **Easy Maintenance**: Update gutters globally by changing one class definition
4. **Consistent Experience**: Users see aligned content across all pages
5. **Responsive**: Gutters scale appropriately across all breakpoints
6. **Flexible**: Commerce pages get full width, editorial pages get readable max-width

## Notes

- All changes maintain existing functionality
- No component redesigns
- No typography or color changes
- Grid column counts unchanged
- Responsiveness preserved
- No hardcoded oversized padding values remain

The unified gutter system is now applied consistently across the entire storefront, ensuring perfect alignment and a cohesive user experience.
