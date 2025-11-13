/**
 * Table privileges revoke mutation for Open Studio
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'
import { privilegesKeys } from './keys'

export interface TablePrivilegeRevokeVariables {
  projectRef: string
  connectionString?: string
  schema: string
  table: string
  privilege: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'TRUNCATE' | 'REFERENCES' | 'TRIGGER' | 'ALL'
  role: string
}

export async function revokeTablePrivilege({
  projectRef,
  connectionString,
  schema,
  table,
  privilege,
  role,
}: TablePrivilegeRevokeVariables) {
  const sql = `REVOKE ${privilege} ON TABLE "${schema}"."${table}" FROM "${role}";`

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: ['revoke-table-privilege'],
  })

  return result
}

export function useTablePrivilegeRevokeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: revokeTablePrivilege,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: privilegesKeys.tablePrivileges(variables.projectRef, variables.schema),
      })
    },
  })
}

// Type alias for backwards compatibility
export type TablePrivilegesRevoke = TablePrivilegeRevokeVariables

// Alias for backwards compatibility (plural form)
export const revokeTablePrivileges = revokeTablePrivilege
