/**
 * SQL folder update mutation for Open Studio
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { contentKeys } from './keys'

export interface UpdateSQLSnippetFolderPayload {
  id: string
  name: string
  description?: string
  projectRef: string
}

export async function updateSQLSnippetFolder(payload: UpdateSQLSnippetFolderPayload) {
  // Stub: Local implementation would update the folder in local storage
  return { id: payload.id, name: payload.name, description: payload.description }
}

export function useSQLSnippetFolderUpdateMutation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateSQLSnippetFolder,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: contentKeys.folders(variables.projectRef) })
      toast.success(`Successfully updated folder "${variables.name}"`)
    },
    onError: (error: Error) => {
      toast.error(`Failed to update folder: ${error.message}`)
    },
  })
}
