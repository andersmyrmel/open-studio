/**
 * Logs date pickers for Open Studio
 */

import React from 'react'

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
