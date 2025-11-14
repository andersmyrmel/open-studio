/**
 * useProtectedSchemas hook for Open Studio
 * Identifies and handles protected/internal PostgreSQL schemas
 */

import { useSelectedProject } from 'lib/common'

// Internal PostgreSQL schemas that should be protected from modifications
export const INTERNAL_SCHEMAS = [
  'pg_catalog',
  'information_schema',
  'pg_toast',
  'pg_temp',
  'pg_toast_temp',
]

// Supabase-specific internal schemas
export const SUPABASE_INTERNAL_SCHEMAS = [
  'auth',
  'storage',
  'realtime',
  'supabase_functions',
  'supabase_migrations',
  '_analytics',
  '_realtime',
]

export const ALL_PROTECTED_SCHEMAS = [...INTERNAL_SCHEMAS, ...SUPABASE_INTERNAL_SCHEMAS]

export interface ProtectedSchemaInfo {
  isProtected: boolean
  isInternal: boolean
  isSupabaseInternal: boolean
  canModify: boolean
}

export function useProtectedSchemas(options?: { excludeSchemas?: string[] }) {
  const project = useSelectedProject()

  const isProtectedSchema = (schema: string): boolean => {
    return ALL_PROTECTED_SCHEMAS.includes(schema)
  }

  const isInternalSchema = (schema: string): boolean => {
    return INTERNAL_SCHEMAS.includes(schema)
  }

  const isSupabaseInternalSchema = (schema: string): boolean => {
    return SUPABASE_INTERNAL_SCHEMAS.includes(schema)
  }

  const getSchemaInfo = (schema: string): ProtectedSchemaInfo => {
    const isInternal = isInternalSchema(schema)
    const isSupabaseInternal = isSupabaseInternalSchema(schema)
    const isProtected = isInternal || isSupabaseInternal

    return {
      isProtected,
      isInternal,
      isSupabaseInternal,
      canModify: !isProtected,
    }
  }

  const isSchemaLocked = (schema: string): boolean => {
    return isProtectedSchema(schema)
  }

  const excludeSchemas = options?.excludeSchemas || []
  const filteredProtectedSchemas = ALL_PROTECTED_SCHEMAS.filter(
    (schema) => !excludeSchemas.includes(schema)
  )

  return {
    isProtectedSchema,
    isInternalSchema,
    isSupabaseInternalSchema,
    isSchemaLocked,
    getSchemaInfo,
    protectedSchemas: ALL_PROTECTED_SCHEMAS,
    internalSchemas: INTERNAL_SCHEMAS,
    supabaseInternalSchemas: SUPABASE_INTERNAL_SCHEMAS,
    data: filteredProtectedSchemas,
  }
}

export default useProtectedSchemas

// Alias for backwards compatibility
export const useIsProtectedSchema = useProtectedSchemas
