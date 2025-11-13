/**
 * ProductEmptyState stub for Open Studio
 * Empty state placeholder component
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface ProductEmptyStateProps {
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
  action?: React.ReactNode
}

export const ProductEmptyState: React.FC<ProductEmptyStateProps> = ({
  title,
  description,
  children,
  className,
  action,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && <p className="text-foreground-light mb-4">{description}</p>}
      {children}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export default ProductEmptyState
