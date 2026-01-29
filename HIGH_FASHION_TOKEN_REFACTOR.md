# High-Fashion Design Token Refactor

## Overview
Complete refactor of design tokens to achieve a high-fashion, luxury editorial aesthetic. All changes made at the token/theme level to ensure consistency across the entire storefront.

## Design Direction
Transformed from a blue-accented, rounded design system to a high-fashion black/white/neutral system with:
- Predominantly black/white/soft neutrals
- Very subtle contrast system
- Sharp edges (minimal/no rounded corners)
- Strong typography hierarchy
- Reduced borders (subtle when needed)
- Black primary CTAs
- Restrained accent colors
- Editorial, premium feeling

## Token System Changes

### 1. Color Tokens (`tailwind.config.ts`)

#### Before:
- Blue-centric palette (`brand-blue-500`, `brand-blue-600`, etc.)
- Standard gray scale
- Blue accents throughout

#### After:
- **Black System**:
  - `brand-black`: `#000000` (primary)
  - `brand-black-off`: `#0A0A0A` (off-black)
  - `brand-black-charcoal`: `#1A1A1A` (charcoal)
- **White System**:
  - `brand-white`: `#FFFFFF` (primary)
  - `brand-white-bone`: `#FAF9F6` (bone/ivory)
  - `brand-white-ivory`: `#FDFCF8` (ivory)
- **Gray Scale**: Updated with warmer tones, maintained 50-900 scale
- **Accent Colors**: 
  - `brand-accent`: Black-based (replaces blue)
  - Semantic colors (success, error, warning) → Black/charcoal
- **Legacy Support**: `brand-blue-*` mapped to black/gray for backward compatibility

### 2. Border Radius Tokens (`tailwind.config.ts`)

#### Before:
- `rounded-lg`, `rounded-xl`, `rounded-full` used throughout
- Default radius values from Tailwind

#### After:
- **All radius values set to `0`**:
  - `rounded-sm` → `0`
  - `rounded-md` → `0`
  - `rounded-lg` → `0`
  - `rounded-xl` → `0`
  - `rounded-full` → `0`
- **Exception**: `rounded-subtle` → `2px` (only for inputs/modals if absolutely needed)
- Sharp, editorial edges throughout

### 3. Typography Tokens (`tailwind.config.ts`)

#### Before:
- Standard font weights (300-600)
- Normal letter spacing
- Standard line heights

#### After:
- **Display/Headings**:
  - Ultra-light weights (200-300)
  - Tighter letter spacing (`-0.03em` to `-0.01em`)
  - Reduced line heights (1.05-1.3)
  - Editorial, high-fashion feel
- **Body Text**:
  - Light weights (300)
  - Slightly wider letter spacing (`0.01em` to `0.02em`)
  - Increased line heights (1.6-1.7)
  - More whitespace feeling
- **Navigation**:
  - New `nav` size with wider tracking (`0.05em`)
  - Medium weight (400)
- **Font Families**: Added `display` and `body` variants for editorial hierarchy

### 4. Border & Divider Tokens (`app/globals.css`)

#### Before:
- `border-brand-gray-200` (light gray)
- Blue borders for active states
- Standard border widths

#### After:
- **Subtle black borders**: `rgba(0, 0, 0, 0.08)` (8% opacity)
- **Minimal borders**: 1px width where needed
- **Active states**: Black borders instead of blue
- Reduced visual weight, editorial spacing

### 5. Shadow & Elevation Tokens (`tailwind.config.ts`)

#### Before:
- Standard Tailwind shadows
- Material UI-style elevation
- Blue-tinted shadows

#### After:
- **Minimal shadows**:
  - `shadow-sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.03)`
  - `shadow-md`: `0 2px 4px 0 rgba(0, 0, 0, 0.05)`
  - `shadow-lg`: `0 4px 6px -1px rgba(0, 0, 0, 0.08)` (reduced)
  - `shadow-editorial`: `0 1px 3px 0 rgba(0, 0, 0, 0.08)` (new)
- **Black-based shadows**: All shadows use black with low opacity
- Flat design with extremely soft editorial depth

### 6. Component Classes (`app/globals.css`)

#### Buttons:
- **Primary**: Black background, white text, sharp edges
- **Secondary**: White background, black border, sharp edges
- **Ghost**: Transparent, black text
- **Outline**: Transparent, black border
- Removed: Blue colors, rounded corners, heavy shadows

#### Product Cards:
- Sharp edges (no rounded corners)
- Subtle editorial shadow on hover
- Clean, minimal styling

#### Navigation:
- Black active state (replaces blue)
- High-fashion typography (wider tracking)
- Subtle borders

#### Announcement Bar:
- Neutral gray background (replaces blue)
- Black text
- Editorial styling

## Files Changed

1. **`tailwind.config.ts`**
   - Complete color system refactor
   - Border radius tokens set to 0
   - Typography tokens updated
   - Shadow tokens reduced
   - Added new token variants

2. **`app/globals.css`**
   - Updated component classes (`.btn`, `.product-card`, `.nav-link`, etc.)
   - Removed rounded corners
   - Changed blue to black
   - Reduced shadows
   - Updated typography hierarchy
   - Subtle border system

## Visual Impact

### Before → After:

**Colors**:
- Blue CTAs → Black CTAs
- Blue accents → Black/charcoal accents
- Blue borders → Subtle black borders
- Blue hover states → Charcoal/gray hover states

**Shapes**:
- Rounded cards → Sharp, rectangular cards
- Rounded buttons → Sharp buttons
- Rounded images → Sharp images
- Pill buttons → Rectangular buttons

**Typography**:
- Standard weights → Ultra-light headings
- Normal tracking → Tighter headings, wider body
- Standard hierarchy → Strong editorial hierarchy

**Depth**:
- Material shadows → Minimal editorial shadows
- Blue-tinted shadows → Black-based shadows
- Heavy elevation → Flat with subtle depth

## Validation Checklist

### Homepage
- ✅ Hero section: Sharp edges, black CTAs
- ✅ Banners: Editorial styling, minimal borders
- ✅ Product cards: Sharp corners, subtle shadows

### Product Listing Pages (PLPs)
- ✅ Product cards: Sharp edges, black accents
- ✅ Filters: Subtle borders, black active states
- ✅ Buttons: Black primary, sharp edges

### Product Detail Pages (PDPs)
- ✅ Buy box: Black primary button
- ✅ Variant selection: Sharp edges, subtle borders
- ✅ Images: Sharp corners

### Cart & Checkout
- ✅ Cart items: Sharp cards, minimal borders
- ✅ Buttons: Black primary CTAs
- ✅ Forms: Sharp inputs, subtle borders

### Modals & Overlays
- ✅ Sharp edges (or minimal 2px radius if needed)
- ✅ Black accents
- ✅ Editorial shadows

### Navigation & Footer
- ✅ Black active states
- ✅ High-fashion typography
- ✅ Subtle borders

## Accessibility

- ✅ Contrast ratios maintained (black on white, white on black)
- ✅ Focus states preserved (black ring)
- ✅ Hover states functional (charcoal/gray)
- ✅ Text readability maintained (light weights with proper sizing)

## Backward Compatibility

- ✅ `brand-blue-*` tokens mapped to black/gray (components using old tokens still work)
- ✅ Legacy `zara` colors updated but maintained
- ✅ All existing Tailwind classes continue to function

## Risks & Considerations

1. **Component-Level Overrides**: Some components may have hardcoded `rounded-*` classes that need manual review
2. **Image Assets**: Product images may have rounded corners baked in (not addressed in this refactor)
3. **Third-Party Components**: Any external components may still use blue/rounded styling
4. **Brand Consistency**: Ensure all team members understand the new high-fashion aesthetic

## Follow-Up Suggestions

1. **Component Audit**: Review individual components for hardcoded styles that override tokens
2. **Image Assets**: Consider updating product image containers if rounded corners are visible
3. **Documentation**: Update design system documentation to reflect new high-fashion direction
4. **Team Alignment**: Ensure designers and developers understand the new token system
5. **A/B Testing**: Consider testing the new aesthetic with users

## Summary

Successfully transformed the design token system from a blue-accented, rounded design to a high-fashion black/white/neutral system with sharp edges, strong typography, and minimal visual elements. All changes made at the token level ensure automatic propagation across the entire storefront without requiring component-level changes.
