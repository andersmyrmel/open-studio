/**
 * Column privileges query for Open Studio
 * Query column-level permissions for PostgreSQL tables
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'

export interface ColumnPrivilege {
  table_id: number
  table_schema: string
  table_name: string
  column_id: string
  column_name: string
  privileges: {
    select: boolean
    insert: boolean
    update: boolean
    references: boolean
  }
}

export const columnPrivilegesKeys = {
  list: (projectRef: string | undefined, schema?: string, table?: string) =>
    ['projects', projectRef, 'column-privileges', schema, table].filter(Boolean) as const,
}

export interface ColumnPrivilegesVariables {
  projectRef?: string
  connectionString?: string
  schema: string
  table: string
}

export async function getColumnPrivileges({
  projectRef,
  connectionString,
  schema,
  table,
}: ColumnPrivilegesVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  const sql = `
    SELECT
      c.table_schema,
      c.table_name,
      c.column_name,
      c.ordinal_position as column_id
    FROM information_schema.columns c
    WHERE c.table_schema = '${schema}'
      AND c.table_name = '${table}'
    ORDER BY c.ordinal_position;
  `

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: ['column-privileges', schema, table],
  })

  // Stub: return with all privileges granted for local mode
  return (result || []).map((col: any) => ({
    table_schema: col.table_schema,
    table_name: col.table_name,
    column_id: col.column_id,
    column_name: col.column_name,
    privileges: {
      select: true,
      insert: true,
      update: true,
      references: true,
    },
  })) as ColumnPrivilege[]
}

export function useColumnPrivilegesQuery<TData = ColumnPrivilege[]>(
  { projectRef, connectionString, schema, table }: ColumnPrivilegesVariables,
  options?: UseQueryOptions<ColumnPrivilege[], Error, TData>
) {
  return useQuery({
    queryKey: columnPrivilegesKeys.list(projectRef, schema, table),
    queryFn: () => getColumnPrivileges({ projectRef, connectionString, schema, table }),
    enabled: Boolean(projectRef && schema && table),
    ...options,
  })
}
