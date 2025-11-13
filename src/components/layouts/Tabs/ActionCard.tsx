/**
 * ActionCard stub for Open Studio
 * Card component for action items in tabs
 */

import React from 'react'
import { Card } from '@/lib/ui'
import { cn } from '@/lib/utils'

export interface ActionCardProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  children,
  className,
  onClick,
  disabled = false,
}) => {
  return (
    <Card
      className={cn(
        'p-4',
        onClick && !disabled && 'cursor-pointer hover:border-foreground-muted transition-colors',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="flex items-start gap-4">
        {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
        <div className="flex-1">
          {title && <h3 className="text-sm font-semibold mb-1">{title}</h3>}
          {description && <p className="text-sm text-foreground-light">{description}</p>}
          {children}
        </div>
      </div>
    </Card>
  )
}

export default ActionCard
