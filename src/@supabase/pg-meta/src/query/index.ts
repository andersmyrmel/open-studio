/**
 * Query types stub for pg-meta
 */

export interface Query {
  sql: string
  params?: any[]
}

export type QueryResult<T = any> = {
  data: T[]
  error: Error | null
}
