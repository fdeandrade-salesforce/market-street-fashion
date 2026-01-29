import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // High-Fashion Neutral Design System
        'brand-black': {
          DEFAULT: '#000000',
          off: '#0A0A0A',      // Off-black for subtle contrast
          charcoal: '#1A1A1A', // Charcoal for depth
        },
        'brand-white': {
          DEFAULT: '#FFFFFF',
          bone: '#FAF9F6',     // Bone/ivory for warm neutrals
          ivory: '#FDFCF8',    // Ivory for soft backgrounds
        },
        'brand-gray': {
          50: '#FAFAFA',       // Soft gray - lightest
          100: '#F5F5F5',      // Very light gray
          200: '#EEEEEE',      // Light gray
          300: '#E5E5E5',      // Medium-light gray (warm)
          400: '#D4D4D4',      // Medium gray
          500: '#9E9E9E',      // Neutral gray
          600: '#757575',      // Medium-dark gray
          700: '#616161',      // Dark gray
          800: '#424242',      // Very dark gray
          900: '#212121',      // Near black gray
        },
        // Accent colors - very restrained, only for critical actions
        'brand-accent': {
          DEFAULT: '#000000',  // Black as primary accent
          subtle: '#1A1A1A',   // Charcoal for secondary accents
        },
        // Semantic colors - minimal, high-fashion appropriate
        'brand-success': {
          DEFAULT: '#000000',  // Black for success (editorial)
          light: '#1A1A1A',
        },
        'brand-error': {
          DEFAULT: '#000000',  // Black for errors (minimal)
          light: '#424242',
        },
        'brand-warning': {
          DEFAULT: '#000000',  // Black for warnings (minimal)
          light: '#616161',
        },
        // Legacy support - map old blue to black for backward compatibility
        'brand-blue': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E5E5E5',
          400: '#D4D4D4',
          500: '#000000',      // Primary blue → Black
          600: '#000000',      // Hover blue → Black
          700: '#1A1A1A',
          800: '#424242',
          900: '#212121',
        },
        // Legacy Zara colors - updated to high-fashion palette
        zara: {
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E5E5E5',
            400: '#D4D4D4',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
          accent: {
            red: '#000000',    // Red → Black
            burgundy: '#1A1A1A', // Burgundy → Charcoal
          },
        },
      },
      fontFamily: {
        // Sen Typography System
        sans: ['var(--font-sen)', 'Sen', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'Monaco', 'Courier New', 'monospace'],
        // Display and body use Sen (different weights/tracking for hierarchy)
        display: ['var(--font-sen)', 'Sen', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['var(--font-sen)', 'Sen', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Modern High-Fashion Typography Scale - Strong Hierarchy via Weight & Tracking
        // Display/Hero: Strong weight (500-700), neutral to tight tracking
        'display': ['4rem', { lineHeight: '1.1', fontWeight: '600', letterSpacing: '-0.01em' }], // Strong, confident
        'h1': ['3rem', { lineHeight: '1.15', fontWeight: '600', letterSpacing: '-0.01em' }], // Strong, modern
        'h2': ['2.25rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0' }], // Strong, neutral tracking
        'h3': ['1.875rem', { lineHeight: '1.25', fontWeight: '500', letterSpacing: '0' }], // Medium-strong
        'h4': ['1.5rem', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0' }], // Medium-strong
        'h5': ['1.25rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.01em' }], // Medium, slight positive tracking
        'h6': ['1rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.01em' }], // Medium, slight positive tracking
        // Body: Lighter weight (300-400), neutral to positive tracking
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0.01em' }], // Regular, readable
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0.01em' }], // Regular, readable
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0.02em' }], // Regular, slightly wider
        // Meta/Labels: Smaller size, wider tracking
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400', letterSpacing: '0.03em' }], // Regular, wider tracking
        // Navigation: Medium weight, positive tracking (not forced uppercase)
        'nav': ['0.875rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.05em' }], // Medium, wider tracking
      },
      borderRadius: {
        // High-Fashion: Sharp edges, minimal rounding
        'none': '0',
        '0': '0',
        'sm': '0',      // Small radius → 0
        'DEFAULT': '0', // Default → 0
        'md': '0',      // Medium → 0
        'lg': '0',      // Large → 0
        'xl': '0',      // Extra large → 0
        '2xl': '0',     // 2XL → 0
        'full': '0',    // Full → 0
        'subtle': '2px', // Only for inputs/modals if absolutely needed
      },
      spacing: {
        // Spacing Scale - Design System Tokens
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },
      screens: {
        'xs': '475px',
      },
      boxShadow: {
        // High-Fashion: Minimal shadows, editorial depth
        'none': 'none',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)', // Extremely subtle
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.05)', // Minimal default
        'md': '0 2px 4px 0 rgba(0, 0, 0, 0.05)', // Subtle medium
        'lg': '0 4px 6px -1px rgba(0, 0, 0, 0.08)', // Soft large (reduced)
        'xl': '0 8px 10px -2px rgba(0, 0, 0, 0.1)', // Very soft (reduced)
        '2xl': '0 12px 16px -4px rgba(0, 0, 0, 0.12)', // Minimal (reduced)
        'inner': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'editorial': '0 1px 3px 0 rgba(0, 0, 0, 0.08)', // Editorial soft depth
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
