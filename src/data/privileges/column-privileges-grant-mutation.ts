/**
 * Column privileges grant mutation for Open Studio
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'
import { privilegesKeys } from './keys'

export interface ColumnPrivilegeGrantVariables {
  projectRef: string
  connectionString?: string
  schema: string
  table: string
  column: string
  privilege: 'SELECT' | 'INSERT' | 'UPDATE' | 'REFERENCES'
  role: string
}

export async function grantColumnPrivilege({
  projectRef,
  connectionString,
  schema,
  table,
  column,
  privilege,
  role,
}: ColumnPrivilegeGrantVariables) {
  const sql = `GRANT ${privilege} ("${column}") ON TABLE "${schema}"."${table}" TO "${role}";`

  const { result } = await executeSql({
    projectRef,
    connectionString,
    sql,
    queryKey: ['grant-column-privilege'],
  })

  return result
}

export function useColumnPrivilegeGrantMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: grantColumnPrivilege,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: privilegesKeys.columnPrivileges(variables.projectRef, variables.schema, variables.table),
      })
    },
  })
}

// Alias for backwards compatibility (plural form)
export const grantColumnPrivileges = grantColumnPrivilege
