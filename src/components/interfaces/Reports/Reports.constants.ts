/**
 * Reports constants stub for Open Studio
 */

export const REPORT_TYPES = {
  PERFORMANCE: 'performance',
  USAGE: 'usage',
  ERRORS: 'errors',
  SECURITY: 'security',
} as const

export type ReportType = (typeof REPORT_TYPES)[keyof typeof REPORT_TYPES]

export const REPORT_INTERVALS = {
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
} as const

export type ReportInterval = (typeof REPORT_INTERVALS)[keyof typeof REPORT_INTERVALS]
