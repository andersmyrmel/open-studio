/**
 * FormLayout stub for Open Studio
 * Container layout for form sections
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface FormLayoutProps {
  className?: string
  children?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  gap?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'card'
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  className,
  children,
  header,
  footer,
  gap = 'medium',
  variant = 'default',
}) => {
  const gapClasses = {
    small: 'space-y-2',
    medium: 'space-y-4',
    large: 'space-y-6',
  }

  return (
    <div
      className={cn(
        gapClasses[gap],
        variant === 'card' && 'rounded-lg border bg-card p-6',
        className
      )}
    >
      {header && <div className="border-b pb-4">{header}</div>}
      <div className={gapClasses[gap]}>{children}</div>
      {footer && <div className="border-t pt-4">{footer}</div>}
    </div>
  )
}

export default FormLayout
