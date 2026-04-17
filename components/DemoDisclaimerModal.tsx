'use client'

import React, { useState, useEffect } from 'react'

const COOKIE_NAME = 'msDemoDisclaimerDismissed'
const FIGMA_URL =
  'https://www.figma.com/design/m5r8rEOE0MEAu2zxrx6JmU/-EXTERNAL-PILOT--Storefront-NEXT-Design-System?t=Kby5pAEW92GTh1Eb-0'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
  return match ? decodeURIComponent(match.split('=')[1]) : null
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export default function DemoDisclaimerModal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const dismissed = getCookie(COOKIE_NAME)
    if (!dismissed) {
      const timer = setTimeout(() => setIsVisible(true), 400)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isVisible])

  const handleClose = () => {
    setCookie(COOKIE_NAME, '1', 1)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-disclaimer-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto overflow-hidden animate-fade-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-brand-gray-400 hover:text-brand-black hover:bg-brand-gray-100 rounded-lg transition-colors"
          aria-label="Close disclaimer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Accent header bar */}
        <div className="h-1 w-full bg-gradient-to-r from-brand-blue-500 via-brand-blue-400 to-brand-blue-600" />

        <div className="p-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full bg-brand-blue-50 text-brand-blue-700 text-xs font-medium uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue-500" />
            Internal Salesforce Demo
          </div>

          <h2
            id="demo-disclaimer-title"
            className="text-2xl font-semibold text-brand-black mb-4"
          >
            Welcome to Market Street
          </h2>

          <div className="space-y-4 text-sm text-brand-gray-700 leading-relaxed">
            <p>
              This is the <strong>Fashion theme demo</strong> for the Salesforce
              Storefront NEXT Design System. It was originally built as an
              internal demo and is being shared with select partners as part of
              an external pilot.
            </p>

            <p>
              <strong>Disclaimer:</strong> The content, layouts, and components
              shown here are used for UX exploration, product research, and
              design proposals. They should not be treated as final, high-fidelity
              deliverables, nor as an authoritative representation of the
              Storefront NEXT Design System. Official design system components and
              specifications live in the pilot Figma file below.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-end">
            <button
              onClick={handleClose}
              className="px-5 py-2.5 bg-white border border-brand-gray-300 text-brand-black text-sm font-medium rounded-lg hover:bg-brand-gray-50 transition-colors"
            >
              Got it
            </button>
            <a
              href={FIGMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-black text-white text-sm font-medium rounded-lg hover:bg-brand-gray-800 transition-colors"
            >
              Open Pilot Figma
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
