/**
 * Markdown stub for Open Studio
 * Markdown rendering component
 */

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

export interface MarkdownProps {
  content?: string
  className?: string
  children?: string
  extLinks?: boolean
  remarkPlugins?: any[]
}

export const Markdown: React.FC<MarkdownProps> = ({
  content,
  className,
  children,
  extLinks = true,
}) => {
  const markdownContent = content || children || ''

  return (
    <div className={cn('prose prose-sm dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              target={extLinks ? '_blank' : undefined}
              rel={extLinks ? 'noopener noreferrer' : undefined}
            />
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}

export default Markdown
