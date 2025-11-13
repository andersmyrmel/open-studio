/**
 * AiIconAnimation component for Open Studio
 * AI assistant icon animation (cloud-only feature)
 */

import React from 'react'
import { cn } from './lib/utils'

export interface AiIconAnimationProps {
  className?: string
  loading?: boolean
}

export const AiIconAnimation: React.FC<AiIconAnimationProps> = ({ className, loading = false }) => {
  // Stub: AI features not available in local mode
  // Return a simple icon placeholder
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center w-4 h-4',
        loading && 'animate-pulse',
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h-1.73c.34.6.73 1.26.73 2a2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-.74.4-1.39 1-1.73V14a5 5 0 0 0-5-5v1.73c.6.34 1 .99 1 1.73a2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-.74.4-1.39 1-1.73V9a5 5 0 0 0-5 5h1.73c-.34.6-.73 1.26-.73 2a2 2 0 0 0 2 2 2 2 0 0 0 2-2c0-.74-.4-1.39-1-1.73H7a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
      </svg>
    </div>
  )
}

export default AiIconAnimation
