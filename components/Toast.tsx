'use client'

import React, { useEffect } from 'react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
  type?: 'success' | 'info' | 'error'
}

export default function Toast({ message, isVisible, onClose, duration = 3000, type = 'info' }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  // Use tokenized colors from design system
  const bgColor = type === 'success' 
    ? 'bg-brand-blue-500' 
    : type === 'error'
    ? 'bg-red-600'
    : 'bg-brand-gray-900'

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <div className={`${bgColor} text-brand-white px-4 py-3 rounded-lg flex items-center gap-3 min-w-[280px] max-w-md shadow-lg pointer-events-auto animate-slide-up`}>
        {type === 'success' ? (
          <svg className="w-5 h-5 flex-shrink-0 text-brand-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : type === 'error' ? (
          <svg className="w-5 h-5 flex-shrink-0 text-brand-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 flex-shrink-0 text-brand-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <p className="text-sm font-medium flex-1 text-brand-white break-words">{message}</p>
        <button
          onClick={onClose}
          className="text-brand-white hover:opacity-80 transition-opacity flex-shrink-0 p-1 -mr-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue-500"
          aria-label="Close toast"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
