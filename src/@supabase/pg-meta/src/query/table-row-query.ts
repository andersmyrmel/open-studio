/**
 * Table row query utilities stub for pg-meta
 */

import type { Query } from './index'

export interface TableRowQueryOptions {
  table: {
    schema: string
    name: string
  }
  filters?: any[]
  sorts?: any[]
  limit?: number
  offset?: number
  columns?: string[]
}

export function getTableRowsSql(options: TableRowQueryOptions): Query {
  // Minimal stub - actual SQL generation would happen in executeSql
  const { table, limit = 100, offset = 0 } = options
  const sql = `SELECT * FROM "${table.schema}"."${table.name}" LIMIT ${limit} OFFSET ${offset}`

  return {
    sql,
    params: [],
  }
}

export const MAX_ROWS = 500
export const DEFAULT_ROWS = 100
