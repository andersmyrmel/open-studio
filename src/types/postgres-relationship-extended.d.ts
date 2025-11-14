/**
 * Extended PostgresRelationship type declarations
 */

import { PostgresRelationship } from '@supabase/postgres-meta'

declare module '@supabase/postgres-meta' {
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
