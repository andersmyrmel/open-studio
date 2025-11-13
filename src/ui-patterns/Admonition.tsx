/**
 * Admonition stub for Open Studio
 * Alert/callout component for displaying informational messages
 */

import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/lib/ui'
import { cn } from '@/lib/utils'
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react'

export interface AdmonitionProps {
  type?: 'note' | 'info' | 'tip' | 'warning' | 'danger' | 'default'
  title?: string
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
  showIcon?: boolean
  label?: string
}

const iconMap = {
  note: Info,
  info: Info,
  tip: CheckCircle,
  warning: AlertTriangle,
  danger: AlertCircle,
  default: Info,
}

const variantMap = {
  note: 'default',
  info: 'default',
  tip: 'default',
  warning: 'warning',
  danger: 'destructive',
  default: 'default',
} as const

export const Admonition: React.FC<AdmonitionProps> = ({
  type = 'default',
  title,
  description,
  children,
  className,
  showIcon = true,
  label,
}) => {
  const Icon = iconMap[type]
  const variant = variantMap[type]

  return (
    <Alert variant={variant as any} className={cn('my-4', className)}>
      {showIcon && <Icon className="h-4 w-4" />}
      {(title || label) && <AlertTitle>{title || label}</AlertTitle>}
      {(description || children) && (
        <AlertDescription>{description || children}</AlertDescription>
      )}
    </Alert>
  )
}

export default Admonition
