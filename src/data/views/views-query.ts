/**
 * Views query for Open Studio
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'
import { viewsKeys } from './keys'

export interface DatabaseView {
  id: number
  schema: string
  name: string
  comment: string | null
  is_updatable: boolean
}

export interface ViewsVariables {
  projectRef?: string
  connectionString?: string
  schema?: string
}

export async function getViews({ projectRef, connectionString, schema }: ViewsVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  const sql = `
    SELECT
      ('"' || schemaname || '"."' || viewname || '"')::regclass::oid as id,
      schemaname as schema,
      viewname as name,
      obj_description(('"' || schemaname || '"."' || viewname || '"')::regclass, 'pg_class') as comment,
      (v.check_option IS NOT NULL) as is_updatable
    FROM pg_views v
    WHERE schemaname ${schema ? `= '${schema}'` : `NOT IN ('pg_catalog', 'information_schema')`}
    ORDER BY schemaname, viewname;
  `

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: viewsKeys.list(projectRef, schema),
  })

  return (result || []) as DatabaseView[]
}

export function useViewsQuery<TData = DatabaseView[]>(
  { projectRef, connectionString, schema }: ViewsVariables,
  options?: UseQueryOptions<DatabaseView[], Error, TData>
) {
  return useQuery({
    queryKey: viewsKeys.list(projectRef, schema),
    queryFn: () => getViews({ projectRef, connectionString, schema }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
