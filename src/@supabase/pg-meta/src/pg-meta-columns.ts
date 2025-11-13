/**
 * PG Column types stub for pg-meta
 */

export interface PGColumn {
  table_id: number
  schema: string
  table: string
  id: string
  ordinal_position: number
  name: string
  default_value: string | null
  data_type: string
  format: string
  is_identity: boolean
  identity_generation: 'ALWAYS' | 'BY DEFAULT' | null
  is_generated: boolean
  is_nullable: boolean
  is_updatable: boolean
  is_unique: boolean
  enums: string[]
  check: string | null
  comment: string | null
}

export interface PGColumnCreate {
  schema: string
  table: string
  name: string
  type: string
  default_value?: string | null
  default_value_format?: 'expression' | 'literal'
  is_identity?: boolean
  identity_generation?: 'ALWAYS' | 'BY DEFAULT'
  is_nullable?: boolean
  is_primary_key?: boolean
  is_unique?: boolean
  comment?: string | null
  check?: string | null
}

export interface PGColumnUpdate extends Partial<PGColumnCreate> {
  id: string
}
