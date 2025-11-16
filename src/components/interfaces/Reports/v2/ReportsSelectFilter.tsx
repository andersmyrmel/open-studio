/**
 * ReportsSelectFilter stub for Open Studio
 */

import React from 'react'
import { Select } from '@/lib/ui'

export interface ReportsSelectFilterProps {
  value?: string
  onChange?: (value: string) => void
  options?: Array<{ value: string; label: string }>
  label?: string
  showSearch?: boolean
}

export const ReportsSelectFilter: React.FC<ReportsSelectFilterProps> = ({
  value,
  onChange,
  options = [],
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <div />
    </Select>
  )
}

// Simple validation schema stub
export const selectFilterSchema = {
  parse: (value: any) => value,
  safeParse: (value: any) => ({ success: true, data: value }),
}

export default ReportsSelectFilter
