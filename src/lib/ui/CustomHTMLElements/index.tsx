/**
 * Custom HTML Elements stub for Open Studio
 */
import React from 'react'

export const Heading: React.FC<React.HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }> = ({ level = 1, children, ...props }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return React.createElement(Tag, props, children)
}
