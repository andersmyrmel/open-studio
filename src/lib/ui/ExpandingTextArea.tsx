/**
 * ExpandingTextArea component for Open Studio
 * Auto-expanding textarea that grows with content
 */

import React, { useRef, useEffect } from 'react'
import { cn } from './lib/utils'

export interface ExpandingTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number
  maxRows?: number
}

export const ExpandingTextArea = React.forwardRef<HTMLTextAreaElement, ExpandingTextAreaProps>(
  ({ className, minRows = 3, maxRows = 10, value, onChange, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const combinedRef = ref || textareaRef

    useEffect(() => {
      const textarea = typeof combinedRef === 'function' ? null : combinedRef?.current
      if (!textarea) return

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto'

      // Calculate the new height
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20
      const minHeight = lineHeight * minRows
      const maxHeight = lineHeight * maxRows
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)

      textarea.style.height = `${newHeight}px`
    }, [value, minRows, maxRows, combinedRef])

    return (
      <textarea
        ref={combinedRef as any}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-auto',
          className
        )}
        value={value}
        onChange={onChange}
        {...props}
      />
    )
  }
)

ExpandingTextArea.displayName = 'ExpandingTextArea'

export default ExpandingTextArea
