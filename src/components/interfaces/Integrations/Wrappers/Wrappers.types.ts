/**
 * Wrappers types stub for Open Studio
 * Foreign Data Wrapper types
 */

export interface Wrapper {
  id: string
  name: string
  handler: string
  validator?: string
  options?: Record<string, any>
}

export interface WrapperServer {
  id: string
  name: string
  wrapper: string
  options: Record<string, any>
}

export interface ForeignTable {
  id: string
  schema: string
  name: string
  server: string
  options: Record<string, any>
}

export type WrapperHandler =
  | 'stripe_wrapper'
  | 's3_wrapper'
  | 'firebase_wrapper'
  | 'airtable_wrapper'
  | 'clickhouse_wrapper'
  | 'bigquery_wrapper'
  | 'postgres_wrapper'
