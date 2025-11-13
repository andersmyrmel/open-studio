/**
 * Logs types for Open Studio
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export interface LogEntry {
  id: string
  timestamp: string
  level: LogLevel
  message: string
  metadata?: Record<string, any>
}

export interface LogsFilter {
  level?: LogLevel
  search?: string
  startTime?: string
  endTime?: string
}

export type LogsQueryType = 'api' | 'database' | 'functions' | 'realtime'
