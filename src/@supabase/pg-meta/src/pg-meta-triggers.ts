/**
 * PG Trigger types stub for pg-meta
 */

export interface PGTrigger {
  id: number
  table_id: number
  enabled_mode: 'ORIGIN' | 'REPLICA' | 'ALWAYS' | 'DISABLED'
  name: string
  table: string
  schema: string
  condition: string | null
  orientation: 'ROW' | 'STATEMENT'
  activation: 'BEFORE' | 'AFTER' | 'INSTEAD OF'
  events: ('INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE')[]
  function_schema: string
  function_name: string
  function_args: string[]
}

export interface PGTriggerCreate {
  name: string
  schema: string
  table: string
  enabled_mode?: 'ORIGIN' | 'REPLICA' | 'ALWAYS' | 'DISABLED'
  function_name: string
  function_schema: string
  function_args?: string[]
  orientation: 'ROW' | 'STATEMENT'
  activation: 'BEFORE' | 'AFTER' | 'INSTEAD OF'
  events: ('INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE')[]
  condition?: string | null
}

export interface PGTriggerUpdate extends Partial<PGTriggerCreate> {
  id: number
}
