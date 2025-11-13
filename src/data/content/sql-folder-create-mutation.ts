/**
 * SQL folder create mutation stub for Open Studio
 */

import { useMutation } from '@tanstack/react-query'

export interface SqlFolderCreateVariables {
  projectRef: string
  name: string
}

export async function createSqlFolder({ projectRef, name }: SqlFolderCreateVariables) {
  // Stub: no-op for local mode
  return {
    id: `folder-${Date.now()}`,
    name,
    project_id: parseInt(projectRef) || 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export function useSqlFolderCreateMutation() {
  return useMutation({
    mutationFn: createSqlFolder,
  })
}

// Aliases for backwards compatibility (capital SQL)
export const useSQLSnippetFolderCreateMutation = useSqlFolderCreateMutation
export const createSQLSnippetFolder = createSqlFolder
