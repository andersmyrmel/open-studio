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
