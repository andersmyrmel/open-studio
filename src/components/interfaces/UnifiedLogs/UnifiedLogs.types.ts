/**
 * Unified logs types for Open Studio
 */

export interface UnifiedLog {
  id: string
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  service: 'api' | 'database' | 'functions' | 'realtime'
  metadata?: Record<string, any>
}

export interface UnifiedLogsFilters {
  search?: string
  level?: string[]
  service?: string[]
  startTime?: string
  endTime?: string
}

export interface UnifiedLogsQueryParams {
  projectRef: string
  filters: UnifiedLogsFilters
  limit?: number
  offset?: number
}
