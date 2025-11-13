/**
 * Telemetry constants stub for Open Studio
 * No telemetry in local mode
 */

export const TELEMETRY_EVENTS = {
  PROJECT_CREATED: 'project_created',
  TABLE_CREATED: 'table_created',
  SQL_EXECUTED: 'sql_executed',
  EXTENSION_ENABLED: 'extension_enabled',
} as const

export type TelemetryEvent = (typeof TELEMETRY_EVENTS)[keyof typeof TELEMETRY_EVENTS]

export const TELEMETRY_CATEGORIES = {
  TABLE_EDITOR: 'table_editor',
  SQL_EDITOR: 'sql_editor',
  DATABASE: 'database',
  AUTH: 'auth',
  STORAGE: 'storage',
} as const

export type TelemetryCategory = (typeof TELEMETRY_CATEGORIES)[keyof typeof TELEMETRY_CATEGORIES]
