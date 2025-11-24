/**
 * Extended PostgresRelationship type declarations
 */

import type { PostgresRelationship } from '@supabase/pg-meta'

export interface ExtendedPostgresRelationship extends PostgresRelationship {
  // These fields are already in PGRelationship from pg-meta
  // Just re-exporting the type with a new name
}

export {}
