/**
 * InputIconContainer stub for Open Studio
 * Container for icons in input fields
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface InputIconContainerProps {
  children?: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export const InputIconContainer: React.FC<InputIconContainerProps> = ({
  children,
  className,
  icon,
}) => {
  return (
    <div className={cn('relative flex items-center', className)}>
      {icon && <div className="absolute left-3 flex items-center pointer-events-none">{icon}</div>}
      {children}
    </div>
  )
}

export default InputIconContainer
