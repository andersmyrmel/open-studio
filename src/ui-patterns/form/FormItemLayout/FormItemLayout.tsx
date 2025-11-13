/**
 * FormItemLayout stub for Open Studio
 * Layout component for form items with labels and descriptions
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface FormItemLayoutProps {
  label?: string
  labelOptional?: string
  layout?: 'horizontal' | 'vertical' | 'flex'
  description?: React.ReactNode
  descriptionText?: string
  children?: React.ReactNode
  className?: string
  error?: string
  beforeLabel?: React.ReactNode
  afterLabel?: React.ReactNode
  id?: string
  isReactForm?: boolean
  flex?: boolean
  align?: 'start' | 'center' | 'end'
  size?: 'tiny' | 'small' | 'medium' | 'large'
}

export const FormItemLayout: React.FC<FormItemLayoutProps> = ({
  label,
  labelOptional,
  layout = 'vertical',
  description,
  descriptionText,
  children,
  className,
  error,
  beforeLabel,
  afterLabel,
  id,
  isReactForm = false,
  flex = false,
  align = 'start',
  size = 'medium',
}) => {
  const isHorizontal = layout === 'horizontal' || layout === 'flex' || flex
  const alignClass = align === 'start' ? 'items-start' : align === 'center' ? 'items-center' : 'items-end'

  return (
    <div className={cn('space-y-2', isHorizontal && 'flex gap-4', isHorizontal && alignClass, className)}>
      {(label || beforeLabel || afterLabel) && (
        <div className={cn('flex items-center gap-2', isHorizontal && 'w-1/3 flex-shrink-0')}>
          {beforeLabel}
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
              {labelOptional && <span className="text-foreground-lighter ml-2">({labelOptional})</span>}
            </label>
          )}
          {afterLabel}
        </div>
      )}
      <div className={cn('space-y-2', isHorizontal && 'flex-1')}>
        {(description || descriptionText) && (
          <p className="text-sm text-foreground-light">{description || descriptionText}</p>
        )}
        {children}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  )
}

export default FormItemLayout
