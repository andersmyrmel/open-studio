/**
 * API keys query stub for Open Studio
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface ApiKey {
  id: string
  name: string
  api_key: string
  created_at: string
}

export const apiKeysKeys = {
  list: (projectRef: string | undefined) => ['projects', projectRef, 'api-keys'] as const,
}

export interface ApiKeysVariables {
  projectRef?: string
}

export async function getApiKeys({ projectRef }: ApiKeysVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return empty array for local mode
  // In real Supabase, this would return anon and service_role keys
  return [] as ApiKey[]
}

export function useApiKeysQuery<TData = ApiKey[]>(
  { projectRef }: ApiKeysVariables,
  options?: UseQueryOptions<ApiKey[], Error, TData>
) {
  return useQuery({
    queryKey: apiKeysKeys.list(projectRef),
    queryFn: () => getApiKeys({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}

// Alias for backwards compatibility
export const getKeys = getApiKeys
