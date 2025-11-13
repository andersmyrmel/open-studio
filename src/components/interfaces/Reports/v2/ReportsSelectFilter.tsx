/**
 * ReportsSelectFilter stub for Open Studio
 */

import React from 'react'
import { Select } from '@/lib/ui'

export interface ReportsSelectFilterProps {
  value?: string
  onChange?: (value: string) => void
  options?: Array<{ value: string; label: string }>
}

export const ReportsSelectFilter: React.FC<ReportsSelectFilterProps> = ({
  value,
  onChange,
  options = [],
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      {/* Stub implementation */}
    </Select>
  )
}

export default ReportsSelectFilter
