/**
 * Logs constants stub for Open Studio
 */

export const LOGS_TABLES = {
  EDGE: 'edge_logs',
  POSTGRES: 'postgres_logs',
  FUNCTIONS: 'function_logs',
  FUNCTION_EDGE: 'function_edge_logs',
  AUTH: 'auth_logs',
} as const

export const DEFAULT_QUERY_PARAMS = {
  sql: '',
  timestamp_start: undefined,
  timestamp_end: undefined,
}

export const LOGS_EXPLORER_DOCS_URL = 'https://supabase.com/docs/guides/platform/logs'

export const LOG_LEVELS = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'] as const
export const DEFAULT_LOG_LEVEL = 'INFO'
export const MAX_LOG_SIZE = 10000
export const LOG_RETENTION_DAYS = 7

export const LOG_SCHEMAS = {
  schemas: ['public', 'auth', 'storage']
}
