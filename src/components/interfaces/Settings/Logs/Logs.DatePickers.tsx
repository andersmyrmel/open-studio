/**
 * Logs date pickers for Open Studio
 */

import React from 'react'

export type DatePickerValue =
  | { mode: 'custom'; from: Date; to: Date; isHelper?: boolean; text?: string }
  | { mode: 'preset'; preset: string; from?: Date; to?: Date; isHelper?: boolean; text?: string }
  | { from: string; to: string; isHelper?: boolean; text?: string }
  | Date
  | null

export interface LogsDatePickersProps {
  onDateChange?: (startDate: Date, endDate: Date) => void
}

export const LogsDatePickers: React.FC<LogsDatePickersProps> = ({ onDateChange }) => {
  // Stub: minimal date picker
  return null
}

export default LogsDatePickers

// Alias for backwards compatibility (singular)
export const LogsDatePicker = LogsDatePickers
