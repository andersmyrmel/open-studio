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

// Table event actions for SQL event parser
export const TABLE_EVENT_ACTIONS = {
  TableCreated: 'table_created' as const,
  TableDataAdded: 'table_data_added' as const,
  TableRLSEnabled: 'table_rls_enabled' as const,
}

export type TableEventAction = (typeof TABLE_EVENT_ACTIONS)[keyof typeof TABLE_EVENT_ACTIONS]

// Import data events
export interface ImportDataFileDroppedEvent {
  type: 'import_data_file_dropped'
  fileType: string
  fileSize: number
}
