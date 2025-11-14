/**
 * Extended PostgresRelationship type declarations
 */

import { PostgresRelationship } from '@supabase/postgres-meta'

declare module '@supabase/postgres-meta' {
  export interface PostgresRelationship {
    schema: string
    table: string
    columns: string[]
    foreign_key_name: string
    relation: string
    is_one_to_one: boolean
    referenced_schema: string
    referenced_relation: string
    referenced_columns: string[]
    // Extended properties for compatibility
    id?: number
    target_table_schema?: string
    target_table_name?: string
    target_column_name?: string
    source_schema?: string
    source_table_name?: string
    source_column_name?: string
  }

  export interface ExtendedPostgresRelationship extends PostgresRelationship {
    id?: number
    target_table_schema?: string
    target_table_name?: string
    target_column_name?: string
    source_schema?: string
    source_table_name?: string
    source_column_name?: string
  }
}

export {}
