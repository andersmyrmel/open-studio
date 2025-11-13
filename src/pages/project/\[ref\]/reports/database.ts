/**
 * Database reports page types
 */

export interface DatabaseReport {
  metric: string
  value: number
  timestamp: string
}

export type DatabaseReportMetric =
  | 'cpu_usage'
  | 'memory_usage'
  | 'disk_usage'
  | 'connections'
  | 'queries_per_second'
