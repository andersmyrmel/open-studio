/**
 * Analytics constants for Open Studio
 */

export const ANALYTICS_CATEGORIES = {
  SQL_EDITOR: 'sql_editor',
  TABLE_EDITOR: 'table_editor',
  DATABASE: 'database',
  STORAGE: 'storage',
  AUTH: 'auth',
} as const

export type AnalyticsCategory = (typeof ANALYTICS_CATEGORIES)[keyof typeof ANALYTICS_CATEGORIES]

// Time intervals for analytics data
export type AnalyticsInterval = '1m' | '5m' | '10m' | '30m' | '1h' | '1d' | '7d' | '30d'

// Data point structure for time-series analytics
export interface DataPoint {
  timestamp: string
  value: number
  label?: string
  metadata?: Record<string, any>
}
