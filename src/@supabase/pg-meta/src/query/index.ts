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

export type FilterOperator =
  | '='
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'like'
  | 'ilike'
  | 'is'
  | 'in'
  | 'cs'
  | 'cd'
  | 'ov'
  | 'sl'
  | 'sr'
  | 'nxl'
  | 'nxr'
  | 'adj'

export interface Filter {
  column: string
  operator: FilterOperator
  value: any
}

export type SortOrder = 'asc' | 'desc' | 'nullsfirst' | 'nullslast'

export interface Sort {
  column: string
  order: SortOrder
  nulls?: 'first' | 'last'
  ascending?: boolean
  table?: string
  nullsFirst?: boolean
}
