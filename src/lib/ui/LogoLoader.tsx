/**
 * LogoLoader component for Open Studio
 * Loading spinner with logo
 */

import React from 'react'
import { cn } from './lib/utils'

export interface LogoLoaderProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({ className, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }

  return (
    <div className={cn('inline-flex items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent',
          sizeClasses[size]
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default LogoLoader
