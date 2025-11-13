/**
 * InputErrorIcon stub for Open Studio
 * Error icon indicator for input fields
 */

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputErrorIconProps {
  className?: string
  size?: number
}

export const InputErrorIcon: React.FC<InputErrorIconProps> = ({ className, size = 16 }) => {
  return (
    <div className={cn('absolute right-3 flex items-center pointer-events-none', className)}>
      <AlertCircle className="text-destructive" size={size} />
    </div>
  )
}

export default InputErrorIcon
