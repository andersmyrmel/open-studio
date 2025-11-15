/**
 * Logs types stub for Open Studio
 */

export interface DatePickerToFrom {
  from: Date | string | undefined | null
  to: Date | string | undefined | null
}

export interface LogsQueryParams {
  sql?: string
  timestamp_start?: number
  timestamp_end?: number
}
