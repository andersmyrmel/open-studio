/**
 * NoSearchResults stub for Open Studio
 * Empty state for no search results
 */

import React from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NoSearchResultsProps {
  searchString?: string
  onResetClick?: () => void
  className?: string
  children?: React.ReactNode
}

export const NoSearchResults: React.FC<NoSearchResultsProps> = ({
  searchString,
  onResetClick,
  className,
  children,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <Search className="h-12 w-12 text-foreground-lighter mb-4" />
      <h3 className="text-lg font-semibold mb-2">No results found</h3>
      {searchString && (
        <p className="text-foreground-light mb-4">
          No results found for "{searchString}"
        </p>
      )}
      {children}
      {onResetClick && (
        <button
          onClick={onResetClick}
          className="mt-4 text-sm text-brand hover:underline"
        >
          Clear search
        </button>
      )}
    </div>
  )
}

export default NoSearchResults
