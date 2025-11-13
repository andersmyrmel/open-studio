/**
 * Column privileges revoke mutation for Open Studio
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'
import { privilegesKeys } from './keys'

export interface ColumnPrivilegeRevokeVariables {
  projectRef: string
  connectionString?: string
  schema: string
  table: string
  column: string
  privilege: 'SELECT' | 'INSERT' | 'UPDATE' | 'REFERENCES'
  role: string
}

export async function revokeColumnPrivilege({
  projectRef,
  connectionString,
  schema,
  table,
  column,
  privilege,
  role,
}: ColumnPrivilegeRevokeVariables) {
  const sql = `REVOKE ${privilege} ("${column}") ON TABLE "${schema}"."${table}" FROM "${role}";`

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: ['revoke-column-privilege'],
  })

  return result
}

export function useColumnPrivilegeRevokeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: revokeColumnPrivilege,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: privilegesKeys.columnPrivileges(variables.projectRef, variables.schema, variables.table),
      })
    },
  })
}

// Type alias for backwards compatibility
export type ColumnPrivilegesRevoke = ColumnPrivilegeRevokeVariables

// Alias for backwards compatibility (plural form)
export const revokeColumnPrivileges = revokeColumnPrivilege
