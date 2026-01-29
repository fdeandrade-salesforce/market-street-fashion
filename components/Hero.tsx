'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Button from './Button'
import LazyImage from './LazyImage'

interface Slide {
  title: string
  subtitle?: string
  image?: string
  video?: string
  ctaText?: string
  ctaLink?: string
}

interface HeroProps {
  slides?: Slide[]
  autoPlayInterval?: number // in milliseconds (Nike uses ~5000-7000ms)
}

// Default slides if none provided
const defaultSlides: Slide[] = [
  {
    title: 'The New Season',
    subtitle: 'A new collection shaped by contrast, proportion, and modern attitude. Introducing key pieces for the season ahead.',
    video: '/resources/hero banner/01.mp4?v=2',
    ctaText: 'Discover the Collection',
    ctaLink: '/women?filter=new',
  },
  {
    title: 'The Modern Wardrobe',
    subtitle: 'Elevated silhouettes, refined textures, and a bold approach to everyday dressing. Designed to move with you.',
    video: '/resources/hero banner/02.mp4',
    image: '/resources/hero banner/02.mp4',
    ctaText: 'Shop the Edit',
    ctaLink: '/women',
  },
  {
    title: 'After Hours',
    subtitle: 'Statement pieces and refined layers designed for nights out, late moments, and everything in between.',
    video: '/resources/hero banner/03.mp4',
    image: '/resources/hero banner/03.mp4',
    ctaText: 'Explore the Collection',
    ctaLink: '/women',
  },
  {
    title: 'New Perspectives',
    subtitle: 'A curated drop of standout pieces that redefine contemporary fashion. Confident. Expressive. Uncompromising.',
    image: '/resources/hero banner/04.png',
    ctaText: 'Shop Now',
    ctaLink: '/women',
  },
]

export default function Hero({ 
  slides = defaultSlides,
  autoPlayInterval = 6000, // 6 seconds like Nike
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, slides.length, autoPlayInterval])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    // Reset auto-play timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, autoPlayInterval)
    }
  }, [isPaused, slides.length, autoPlayInterval])

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    // Reset auto-play timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((p) => (p + 1) % slides.length)
      }, autoPlayInterval)
    }
  }, [isPaused, slides.length, autoPlayInterval])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    // Reset auto-play timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((p) => (p + 1) % slides.length)
      }, autoPlayInterval)
    }
  }, [isPaused, slides.length, autoPlayInterval])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) {
      goToNext()
    } else if (distance < -minSwipeDistance) {
      goToPrevious()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  // Handle video playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide && slides[index].video) {
          video.play().catch(() => {
            // Auto-play may be blocked by browser
          })
        } else {
          video.pause()
        }
      }
    })
  }, [currentSlide, slides])

  return (
    <section 
      className="relative h-[100vh] md:h-[500px] lg:h-[700px] xl:h-[85vh] overflow-hidden"
      style={{ minHeight: '100vh' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => {
          const offset = index - currentSlide
          return (
            <div
              key={index}
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${offset * 100}%)`,
                zIndex: index === currentSlide ? 10 : 0,
              }}
            >
            {/* Video Background */}
            {slide.video && (
              <video
                key={slide.video}
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster={slide.image}
              >
                <source src={`${slide.video}${slide.video.includes('?') ? '&' : '?'}v=2`} type="video/mp4" />
              </video>
            )}
            
            {/* Image Background */}
            {!slide.video && slide.image && (
              <LazyImage
                src={slide.image}
                alt={slide.title}
                className="w-full h-full"
                objectFit="cover"
              />
            )}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
          )
        })}
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center z-20 overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => {
            const offset = index - currentSlide
            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${offset * 100}%)`,
                }}
              >
                <div className="layout-commerce w-full">
                  <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 lg:mb-6 tracking-tight">
                      {slide.title}
                    </h1>
                    {slide.subtitle && (
                      <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 mb-8 lg:mb-10 font-normal">
                        {slide.subtitle}
                      </p>
                    )}
                    <div className="flex justify-center">
                      <Button variant="primary" size="lg" href={slide.ctaLink || '#'}>
                        {slide.ctaText || 'Shop Now'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Arrows - Bottom Corner */}
      <div className="absolute bottom-6 right-6 z-30 flex gap-2">
        <button
          onClick={goToPrevious}
          className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  )
}
