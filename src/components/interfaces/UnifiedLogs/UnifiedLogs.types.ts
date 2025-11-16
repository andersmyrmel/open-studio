/**
 * UnifiedLogs types stub for Open Studio
 */

export interface LogData {
  id: string
  timestamp: string
  event_message: string
  metadata?: Record<string, any>
}

export interface LogsEndpointParams {
  project?: string
  sql?: string
  timestamp_start?: number
  timestamp_end?: number
}

export type LogsTableName = 'edge_logs' | 'postgres_logs' | 'function_logs' | 'function_edge_logs' | 'auth_logs'

export interface QuerySearchParamsType {
  sql?: string
  timestamp_start?: number
  timestamp_end?: number
  table?: LogsTableName
}
