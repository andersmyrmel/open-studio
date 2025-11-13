/**
 * Protected schemas hook for Open Studio
 * Returns schemas that should be protected from modification
 */

export const PROTECTED_SCHEMAS = [
  'information_schema',
  'pg_catalog',
  'pg_toast',
  'pg_temp_1',
  'pg_toast_temp_1',
  'auth',
  'extensions',
  'pgbouncer',
  'pgsodium',
  'pgsodium_masks',
  'realtime',
  'storage',
  'supabase_functions',
  'supabase_migrations',
  'vault',
]

export const useIsProtectedSchema = (schema?: string) => {
  if (!schema) return false
  return PROTECTED_SCHEMAS.includes(schema.toLowerCase())
}

export const useProtectedSchemas = () => {
  return PROTECTED_SCHEMAS
}
