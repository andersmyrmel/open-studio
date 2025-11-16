/**
 * ReportBlockContainer stub for Open Studio
 * Container for report blocks
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface ReportBlockContainerProps {
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
  loading?: boolean
  error?: string
  draggable?: boolean
  showDragHandle?: boolean
  onDragStart?: (e: React.DragEvent<Element>) => void
  label?: string
  badge?: React.ReactNode
  actions?: React.ReactNode
}

export const ReportBlockContainer: React.FC<ReportBlockContainerProps> = ({
  title,
  description,
  children,
  className,
  loading = false,
  error,
}) => {
  return (
    <div className={cn('rounded-lg border bg-card p-6', className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
          {description && <p className="text-sm text-foreground-light">{description}</p>}
        </div>
      )}
      {error && (
        <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
        </div>
      )}
      {!loading && !error && children}
    </div>
  )
}

export default ReportBlockContainer
