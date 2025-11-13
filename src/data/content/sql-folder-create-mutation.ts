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
  return { id: 'stub-folder-id', name, project_ref: projectRef }
}

export function useSqlFolderCreateMutation() {
  return useMutation({
    mutationFn: createSqlFolder,
  })
}

// Aliases for backwards compatibility (capital SQL)
export const useSQLSnippetFolderCreateMutation = useSqlFolderCreateMutation
export const createSQLSnippetFolder = createSqlFolder
