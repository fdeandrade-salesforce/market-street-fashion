'use client'

import React from 'react'

export default function InternalDemoBadge() {
  return (
    <div
      className="fixed bottom-4 left-4 z-40 pointer-events-none select-none"
      aria-label="Internal Salesforce demo notice"
    >
      <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 bg-black/80 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue-500" />
        </span>
        Internal Salesforce Demo
      </div>
    </div>
  )
}
