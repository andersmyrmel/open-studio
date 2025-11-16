/**
 * Table privileges grant mutation for Open Studio
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'
import { privilegesKeys } from './keys'

export interface TablePrivilegeGrantVariables {
  projectRef: string
  connectionString?: string
  schema?: string
  table?: string
  privilege?: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE' | 'REFERENCES' | 'TRIGGER' | 'ALL'
  role?: string
  // Alias for compatibility
  privilegeType?: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE' | 'REFERENCES' | 'TRIGGER' | 'ALL'
  // Batch operations
  grants?: Array<{
    table_id?: string
    grantee: string
    privilege_type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE' | 'REFERENCES' | 'TRIGGER' | 'ALL'
  }>
}

export async function grantTablePrivilege({
  projectRef,
  connectionString,
  schema,
  table,
  privilege,
  role,
}: TablePrivilegeGrantVariables) {
  const sql = `GRANT ${privilege} ON TABLE "${schema}"."${table}" TO "${role}";`

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: ['grant-table-privilege'],
  })

  return result
}

export function useTablePrivilegeGrantMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: grantTablePrivilege,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: privilegesKeys.tablePrivileges(variables.projectRef, variables.schema),
      })
    },
  })
}

// Type alias for backwards compatibility
export type TablePrivilegesGrant = TablePrivilegeGrantVariables

// Alias for backwards compatibility (plural form)
export const grantTablePrivileges = grantTablePrivilege
