/**
 * Table privileges query for Open Studio
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'
import { privilegesKeys } from './keys'

export interface TablePrivilege {
  table_schema: string
  table_name: string
  privilege_type: string
  grantee: string
  // For grouped privileges
  privileges?: Array<{
    privilege_type: string
    grantee?: string
  }>
}

export interface TablePrivilegesVariables {
  projectRef?: string
  connectionString?: string
  schema: string
}

export async function getTablePrivileges({
  projectRef,
  connectionString,
  schema,
}: TablePrivilegesVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  const sql = `
    SELECT
      table_schema,
      table_name,
      privilege_type,
      grantee
    FROM information_schema.table_privileges
    WHERE table_schema = '${schema}'
    ORDER BY table_name, grantee, privilege_type;
  `

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: privilegesKeys.tablePrivileges(projectRef, schema),
  })

  return (result || []) as TablePrivilege[]
}

export function useTablePrivilegesQuery<TData = TablePrivilege[]>(
  { projectRef, connectionString, schema }: TablePrivilegesVariables,
  options?: UseQueryOptions<TablePrivilege[], Error, TData>
) {
  return useQuery({
    queryKey: privilegesKeys.tablePrivileges(projectRef, schema),
    queryFn: () => getTablePrivileges({ projectRef, connectionString, schema }),
    enabled: Boolean(projectRef && schema),
    ...options,
  })
}

// Type alias for backwards compatibility (Pg prefix)
export type PgTablePrivileges = TablePrivilege
