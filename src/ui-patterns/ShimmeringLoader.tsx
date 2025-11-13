/**
 * ShimmeringLoader stub for Open Studio
 * Loading skeleton component
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface ShimmeringLoaderProps {
  className?: string
  active?: boolean
  rounded?: boolean
  delayIndex?: number
}

const ShimmeringLoader: React.FC<ShimmeringLoaderProps> = ({
  className,
  active = true,
  rounded = false,
  delayIndex = 0,
}) => {
  if (!active) return null

  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        rounded && 'rounded-full',
        !rounded && 'rounded',
        className
      )}
      style={{
        animationDelay: `${delayIndex * 50}ms`,
      }}
    />
  )
}

export interface GenericSkeletonLoaderProps {
  className?: string
  rows?: number
  height?: number
}

export const GenericSkeletonLoader: React.FC<GenericSkeletonLoaderProps> = ({
  className,
  rows = 3,
  height = 20,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <ShimmeringLoader
          key={i}
          className={`h-${height}`}
          delayIndex={i}
        />
      ))}
    </div>
  )
}

export default ShimmeringLoader
