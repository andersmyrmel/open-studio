/**
 * ComputeBadge stub for Open Studio
 * Badge component for displaying compute/resource info
 */

import React from 'react'
import { Badge } from '@/lib/ui'
import { cn } from '@/lib/utils'

export interface ComputeBadgeProps {
  size?: 'tiny' | 'small' | 'medium' | 'large'
  compute?: string
  className?: string
  variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  children?: React.ReactNode
}

export const ComputeBadge: React.FC<ComputeBadgeProps> = ({
  size = 'small',
  compute,
  className,
  variant = 'secondary',
  children,
}) => {
  const sizeClasses = {
    tiny: 'text-xs px-1 py-0.5',
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-2.5 py-1',
    large: 'text-base px-3 py-1.5',
  }

  return (
    <Badge variant={variant} className={cn(sizeClasses[size], className)}>
      {children || compute || 'Unknown'}
    </Badge>
  )
}

export default ComputeBadge
