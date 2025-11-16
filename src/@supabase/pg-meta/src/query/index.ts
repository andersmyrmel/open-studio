/**
 * Query types and builder stub for pg-meta
 */

export interface QueryInterface {
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

/**
 * Query builder class for PostgreSQL queries
 * This is a simplified stub implementation
 */
export class Query {
  private _table?: string
  private _schema?: string
  private _select?: string
  private _filters: Array<{ column: string; operator: string; value: any }> = []
  private _count: boolean = false
  private _orderBy?: Array<{ column: string; ascending?: boolean }>

  from(table: string, schema?: string): this {
    this._table = table
    this._schema = schema
    return this
  }

  select(columns: string): this {
    this._select = columns
    return this
  }

  filter(column: string, operator: string, value: any): this {
    this._filters.push({ column, operator, value })
    return this
  }

  match(filters: Record<string, any>): this {
    Object.entries(filters).forEach(([column, value]) => {
      this._filters.push({ column, operator: '=', value })
    })
    return this
  }

  count(): this {
    this._count = true
    return this
  }

  insert(data: any): this {
    // Stub implementation
    return this
  }

  update(data: any): this {
    // Stub implementation
    return this
  }

  delete(): this {
    // Stub implementation
    return this
  }

  truncate(): this {
    // Stub implementation
    return this
  }

  order(column: string, options?: { ascending?: boolean; nullsFirst?: boolean }): this {
    if (!this._orderBy) {
      this._orderBy = []
    }
    this._orderBy.push({ column, ascending: options?.ascending })
    return this
  }

  toSql(): string {
    const schema = this._schema ? `"${this._schema}".` : ''
    const table = this._table ? `"${this._table}"` : ''

    if (this._count) {
      let sql = `SELECT COUNT(*) FROM ${schema}${table}`
      if (this._filters.length > 0) {
        const conditions = this._filters
          .map((f) => `"${f.column}" ${f.operator} ${this.formatValue(f.value)}`)
          .join(' AND ')
        sql += ` WHERE ${conditions}`
      }
      return sql + ';'
    }

    const select = this._select || '*'
    let sql = `SELECT ${select} FROM ${schema}${table}`

    if (this._filters.length > 0) {
      const conditions = this._filters
        .map((f) => `"${f.column}" ${f.operator} ${this.formatValue(f.value)}`)
        .join(' AND ')
      sql += ` WHERE ${conditions}`
    }

    return sql + ';'
  }

  private formatValue(value: any): string {
    if (typeof value === 'string') {
      return `'${value.replace(/'/g, "''")}'`
    }
    if (value === null) {
      return 'NULL'
    }
    return String(value)
  }
}
