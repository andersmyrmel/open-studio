/**
 * Input stub for Open Studio
 * Re-exports shadcn/ui Input with ui-patterns compatible interface
 */

import React from 'react'
import { Input as ShadcnInput } from '@/lib/ui'
import { cn } from '@/lib/utils'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'tiny' | 'small' | 'medium' | 'large'
  error?: string
  descriptionText?: string
  label?: string
  labelOptional?: string
  actions?: React.ReactNode
  copy?: boolean
  icon?: React.ReactNode
  reveal?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'medium',
      error,
      descriptionText,
      label,
      labelOptional,
      actions,
      copy,
      icon,
      reveal,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      tiny: 'h-6 text-xs px-2 py-1',
      small: 'h-8 text-sm px-3 py-1',
      medium: 'h-10 text-sm px-3 py-2',
      large: 'h-12 text-base px-4 py-3',
    }

    return (
      <div className="space-y-1">
        {label && (
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
              {labelOptional && <span className="text-foreground-lighter ml-2">({labelOptional})</span>}
            </label>
            {actions}
          </div>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>}
          <ShadcnInput
            ref={ref}
            className={cn(sizeClasses[size], icon && 'pl-10', error && 'border-destructive', className)}
            {...props}
          />
        </div>
        {descriptionText && <p className="text-xs text-foreground-light">{descriptionText}</p>}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
