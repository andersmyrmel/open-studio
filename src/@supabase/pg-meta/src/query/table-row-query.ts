/**
 * Table row query utilities stub for pg-meta
 */

import type { Query, QueryInterface, Filter, Sort } from './index'

export interface TableRowQueryOptions {
  table: {
    schema: string
    name: string
  }
  filters?: Filter[]
  sorts?: Sort[]
  limit?: number
  offset?: number
  page?: number
  columns?: string[]
}

export function getTableRowsSql(options: TableRowQueryOptions): QueryInterface {
  // Minimal stub - actual SQL generation would happen in executeSql
  const { table, limit = 100, offset = 0 } = options
  const sql = `SELECT * FROM "${table.schema}"."${table.name}" LIMIT ${limit} OFFSET ${offset}`

  return {
    sql,
    params: [],
  }
}

// Maximum characters to fetch per cell
export const MAX_CHARACTERS = 5000
export const MAX_ROWS = 500
export const DEFAULT_ROWS = 100
export const MAX_ARRAY_SIZE = 500
