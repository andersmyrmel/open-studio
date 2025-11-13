/**
 * Logs DatePickers stub for Open Studio
 */

import React from 'react'

export interface LogsDatePickersProps {
  onChange?: (start: Date, end: Date) => void
  startDate?: Date
  endDate?: Date
}

export const LogsDatePickers: React.FC<LogsDatePickersProps> = ({
  onChange,
  startDate,
  endDate,
}) => {
  return (
    <div className="flex gap-2">
      <input
        type="datetime-local"
        value={startDate?.toISOString().slice(0, 16)}
        onChange={(e) => onChange?.(new Date(e.target.value), endDate || new Date())}
        className="px-3 py-2 border rounded"
      />
      <input
        type="datetime-local"
        value={endDate?.toISOString().slice(0, 16)}
        onChange={(e) => onChange?.(startDate || new Date(), new Date(e.target.value))}
        className="px-3 py-2 border rounded"
      />
    </div>
  )
}

export default LogsDatePickers
