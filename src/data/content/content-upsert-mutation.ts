/**
 * Content upsert mutation stub for Open Studio
 */

import { useMutation } from '@tanstack/react-query'

export interface UpsertContentPayload {
  id?: string
  name: string
  type: string
  content: any
  description?: string
  visibility?: 'user' | 'project' | 'public'
  [key: string]: any
}

export interface ContentUpsertVariables {
  projectRef: string
  payload: UpsertContentPayload
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
