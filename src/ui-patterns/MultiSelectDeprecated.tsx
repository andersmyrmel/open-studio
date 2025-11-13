/**
 * MultiSelectDeprecated stub for Open Studio
 * Legacy multi-select component types
 */

import React from 'react'

export interface MultiSelectOption {
  id?: string | number
  value: string | number
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  description?: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  onChange?: (value: (string | number)[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  label?: string
  descriptionText?: string
  error?: string
  size?: 'tiny' | 'small' | 'medium' | 'large'
}

// Stub implementation - not used in current extraction
const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder = 'Select...' }) => {
  return <div className="text-sm text-foreground-lighter">{placeholder}</div>
}

export default MultiSelect

// Also export V2 alias if needed
export const MultiSelectV2 = MultiSelect
