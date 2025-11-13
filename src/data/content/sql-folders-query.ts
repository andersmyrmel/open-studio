/**
 * SQL folders query stub for Open Studio
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface SqlFolder {
  id: string
  name: string
  project_id: number
  created_at: string
  updated_at: string
}

// SQL Snippet type (SQL query saved by user)
export interface Snippet {
  id: string
  name: string
  description?: string
  sql: string
  folder_id?: string
  project_id: number
  owner_id: string
  visibility: 'user' | 'project' | 'public'
  favorite?: boolean
  created_at: string
  updated_at: string
}

export const sqlFoldersKeys = {
  folders: (projectRef: string | undefined) => ['projects', projectRef, 'content', 'folders'] as const,
}

export interface SqlFoldersVariables {
  projectRef?: string
}

export async function getSqlFolders({ projectRef }: SqlFoldersVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return empty array for local mode
  return [] as SqlFolder[]
}

export function useSqlFoldersQuery<TData = SqlFolder[]>(
  { projectRef }: SqlFoldersVariables,
  options?: UseQueryOptions<SqlFolder[], Error, TData>
) {
  return useQuery({
    queryKey: sqlFoldersKeys.folders(projectRef),
    queryFn: () => getSqlFolders({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
