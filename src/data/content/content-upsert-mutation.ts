/**
 * Content upsert mutation stub for Open Studio
 */

import { useMutation } from '@tanstack/react-query'

export interface ContentUpsertVariables {
  projectRef: string
  payload: {
    id?: string
    name: string
    type: string
    content: any
    [key: string]: any
  }
}

export async function upsertContent({ projectRef, payload }: ContentUpsertVariables) {
  // Stub: no-op for local mode
  return { id: payload.id || 'stub-id', ...payload }
}

export function useContentUpsertMutation() {
  return useMutation({
    mutationFn: upsertContent,
  })
}
