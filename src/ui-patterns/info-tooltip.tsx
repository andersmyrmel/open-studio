/**
 * InfoTooltip stub for Open Studio
 * Tooltip with info icon
 */

import React from 'react'
import { HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/lib/ui'
import { cn } from '@/lib/utils'

export interface InfoTooltipProps {
  children?: React.ReactNode
  content?: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
  iconClassName?: string
  size?: 'tiny' | 'small' | 'medium' | 'large'
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  children,
  content,
  side = 'top',
  align = 'center',
  className,
  iconClassName,
  size = 'small',
}) => {
  const sizeClasses = {
    tiny: 'h-3 w-3',
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn('inline-flex items-center cursor-help', className)}>
            {children || (
              <HelpCircle className={cn('text-foreground-lighter', sizeClasses[size], iconClassName)} />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default InfoTooltip
