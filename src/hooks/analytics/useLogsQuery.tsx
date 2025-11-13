/**
 * useLogsQuery hook for Open Studio
 * Fetches and manages log data for analytics and debugging
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export interface LogEvent {
  id: string
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  metadata?: Record<string, any>
}

export interface LogsQueryVariables {
  projectRef?: string
  queryType?: 'api' | 'database' | 'functions' | 'realtime'
  startTime?: string
  endTime?: string
  limit?: number
  search?: string
  level?: LogEvent['level']
}

export interface LogsQueryResponse {
  logs: LogEvent[]
  totalCount: number
  hasMore: boolean
}

export async function fetchLogs({
  projectRef,
  queryType = 'api',
  startTime,
  endTime,
  limit = 100,
  search,
  level,
}: LogsQueryVariables): Promise<LogsQueryResponse> {
  if (!projectRef) {
    throw new Error('projectRef is required')
  }

  // Stub implementation - in production, this would fetch from logs API
  return {
    logs: [],
    totalCount: 0,
    hasMore: false,
  }
}

export const logsKeys = {
  all: (projectRef: string | undefined) => ['projects', projectRef, 'logs'] as const,
  type: (projectRef: string | undefined, queryType: string) =>
    ['projects', projectRef, 'logs', queryType] as const,
  filtered: (
    projectRef: string | undefined,
    queryType: string,
    filters: Partial<LogsQueryVariables>
  ) => ['projects', projectRef, 'logs', queryType, filters] as const,
}

export function useLogsQuery<TData = LogsQueryResponse>(
  variables: LogsQueryVariables,
  options: UseQueryOptions<LogsQueryResponse, Error, TData> = {}
) {
  const { projectRef, queryType = 'api', ...filters } = variables

  return useQuery<LogsQueryResponse, Error, TData>({
    queryKey: logsKeys.filtered(projectRef, queryType, filters),
    queryFn: () => fetchLogs(variables),
    enabled: Boolean(projectRef),
    refetchInterval: 10000, // Auto-refresh every 10 seconds
    ...options,
  })
}
