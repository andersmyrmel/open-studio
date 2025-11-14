/**
 * SQL snippets query for Open Studio
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface SqlSnippet {
  id: string
  name: string
  type?: string
  description?: string
  content: {
    sql: string
  }
  created_at: string
  updated_at: string
}

export const sqlSnippetsKeys = {
  list: (projectRef: string | undefined) => ['projects', projectRef, 'sql-snippets'] as const,
  detail: (projectRef: string | undefined, id: string | undefined) =>
    ['projects', projectRef, 'sql-snippets', id].filter(Boolean) as const,
}

export interface SqlSnippetsVariables {
  projectRef?: string
}

export async function getSqlSnippets({ projectRef }: SqlSnippetsVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return empty array for local mode
  return [] as SqlSnippet[]
}

export function useSqlSnippetsQuery<TData = SqlSnippet[]>(
  { projectRef }: SqlSnippetsVariables,
  options?: UseQueryOptions<SqlSnippet[], Error, TData>
) {
  return useQuery({
    queryKey: sqlSnippetsKeys.list(projectRef),
    queryFn: () => getSqlSnippets({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
