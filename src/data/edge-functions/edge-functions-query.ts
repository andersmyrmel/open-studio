/**
 * Edge Functions query stub for Open Studio
 * Cloud-only feature - not available in local mode
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface EdgeFunction {
  id: string
  name: string
  status: 'active' | 'inactive'
  version: number
  created_at: string
  updated_at: string
}

export const edgeFunctionsKeys = {
  list: (projectRef: string | undefined) => ['projects', projectRef, 'edge-functions'] as const,
}

export interface EdgeFunctionsVariables {
  projectRef?: string
}

export async function getEdgeFunctions({ projectRef }: EdgeFunctionsVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return empty array for local mode
  return [] as EdgeFunction[]
}

export function useEdgeFunctionsQuery<TData = EdgeFunction[]>(
  { projectRef }: EdgeFunctionsVariables,
  options?: UseQueryOptions<EdgeFunction[], Error, TData>
) {
  return useQuery({
    queryKey: edgeFunctionsKeys.list(projectRef),
    queryFn: () => getEdgeFunctions({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
