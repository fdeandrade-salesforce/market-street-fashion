import React from 'react'
import Link from 'next/link'

interface PromoBannerProps {
  title: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  variant?: 'primary' | 'gradient' | 'solid'
  bgColor?: string
  textColor?: string
  onCtaClick?: () => void
}

export default function PromoBanner({
  title,
  subtitle,
  ctaText = 'Shop Now',
  ctaLink,
  variant = 'gradient',
  bgColor,
  textColor = 'text-white',
  onCtaClick,
}: PromoBannerProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-brand-blue-500'
      case 'gradient':
        return 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
      case 'solid':
        return bgColor || 'bg-brand-gray-900'
      default:
        return 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
    }
  }

  const content = (
    <div className={`${getVariantClasses()} rounded-lg p-6 md:p-8 lg:p-10 ${textColor}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          {subtitle && (
            <p className="text-xs md:text-sm font-medium uppercase tracking-wide mb-2 opacity-90">
              {subtitle}
            </p>
          )}
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
            {title}
          </h3>
        </div>
        {ctaText && (
          <button
            onClick={onCtaClick}
            className="flex-shrink-0 bg-white text-brand-black px-6 py-2.5 md:py-3 text-sm font-medium rounded-lg hover:bg-brand-gray-100 transition-colors whitespace-nowrap"
          >
            {ctaText}
          </button>
        )}
      </div>
    </div>
  )

  if (ctaLink && !onCtaClick) {
    return (
      <Link href={ctaLink} className="block">
        {content}
      </Link>
    )
  }

  return content
}
