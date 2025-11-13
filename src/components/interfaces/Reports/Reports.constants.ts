/**
 * Reports constants for Open Studio
 */

import { addDays, startOfDay, subDays } from 'date-fns'

export interface DatePickerHelper {
  label: string
  startDate: Date
  endDate: Date
}

// Date picker helpers for reports
export const REPORTS_DATEPICKER_HELPERS: DatePickerHelper[] = [
  {
    label: 'Last 24 hours',
    startDate: subDays(startOfDay(new Date()), 1),
    endDate: new Date(),
  },
  {
    label: 'Last 7 days',
    startDate: subDays(startOfDay(new Date()), 7),
    endDate: new Date(),
  },
  {
    label: 'Last 30 days',
    startDate: subDays(startOfDay(new Date()), 30),
    endDate: new Date(),
  },
  {
    label: 'Last 90 days',
    startDate: subDays(startOfDay(new Date()), 90),
    endDate: new Date(),
  },
]
