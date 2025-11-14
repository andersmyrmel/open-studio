/**
 * @supabase/shared-types events stub for Open Studio
 * Analytics and tracking event types
 */

/**
 * Telemetry event names
 * In standalone mode, these are stubs for compatibility
 */
export enum TelemetryEvent {
  // Project events
  PROJECT_CREATED = 'project_created',
  PROJECT_DELETED = 'project_deleted',
  PROJECT_PAUSED = 'project_paused',
  PROJECT_RESUMED = 'project_resumed',

  // Database events
  SQL_EXECUTED = 'sql_executed',
  TABLE_CREATED = 'table_created',
  TABLE_UPDATED = 'table_updated',
  TABLE_DELETED = 'table_deleted',

  // Function events
  FUNCTION_CREATED = 'function_created',
  FUNCTION_UPDATED = 'function_updated',
  FUNCTION_DELETED = 'function_deleted',

  // Extension events
  EXTENSION_ENABLED = 'extension_enabled',
  EXTENSION_DISABLED = 'extension_disabled',

  // UI events
  PAGE_VIEWED = 'page_viewed',
  BUTTON_CLICKED = 'button_clicked',
}

/**
 * Event metadata structure
 */
export interface TelemetryEventMetadata {
  event: TelemetryEvent
  properties?: Record<string, any>
  timestamp?: string
}

/**
 * JWT Secret update status
 */
export enum JwtSecretUpdateStatus {
  Updated = 'UPDATED',
  Updating = 'UPDATING',
  Failed = 'FAILED',
}
