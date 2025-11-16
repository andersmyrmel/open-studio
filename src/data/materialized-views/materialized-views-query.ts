/**
 * Materialized Views query for Open Studio
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'

export interface MaterializedView {
  id: number
  schema: string
  name: string
  comment: string | null
}

export const materializedViewsKeys = {
  list: (projectRef: string | undefined, schema?: string) =>
    ['projects', projectRef, 'materialized-views', schema].filter(Boolean),
}

export interface MaterializedViewsVariables {
  projectRef?: string
  connectionString?: string
  schema?: string
}

export async function getMaterializedViews({
  projectRef,
  connectionString,
  schema,
}: MaterializedViewsVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  const sql = `
    SELECT
      ('"' || schemaname || '"."' || matviewname || '"')::regclass::oid as id,
      schemaname as schema,
      matviewname as name,
      obj_description(('"' || schemaname || '"."' || matviewname || '"')::regclass, 'pg_class') as comment
    FROM pg_matviews
    WHERE schemaname ${schema ? `= '${schema}'` : `NOT IN ('pg_catalog', 'information_schema')`}
    ORDER BY schemaname, matviewname;
  `

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: materializedViewsKeys.list(projectRef, schema),
  })

  return (result || []) as MaterializedView[]
}

export function useMaterializedViewsQuery<TData = MaterializedView[]>(
  { projectRef, connectionString, schema }: MaterializedViewsVariables,
  options?: UseQueryOptions<MaterializedView[], Error, TData>
) {
  return useQuery({
    queryKey: materializedViewsKeys.list(projectRef, schema),
    queryFn: () => getMaterializedViews({ projectRef, connectionString, schema }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
