/**
 * Edge Functions query stub for Open Studio
 * Edge Functions are a Supabase platform feature, not PostgreSQL
 * This stub allows Database Hooks code to compile without edge function support
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface EdgeFunction {
  id: string
  slug: string
  name: string
  verify_jwt?: boolean
}

export interface EdgeFunctionsVariables {
  projectRef?: string
}

export const edgeFunctionsKeys = {
  list: (projectRef: string) => ['edge-functions', projectRef] as const,
}

export async function getEdgeFunctions({ projectRef }: EdgeFunctionsVariables) {
  // Edge Functions not supported in PostgreSQL-only mode
  return [] as EdgeFunction[]
}

export function useEdgeFunctionsQuery<TData = EdgeFunction[]>(
  { projectRef }: EdgeFunctionsVariables,
  options?: UseQueryOptions<EdgeFunction[], Error, TData>
) {
  return useQuery({
    queryKey: edgeFunctionsKeys.list(projectRef!),
    queryFn: () => getEdgeFunctions({ projectRef }),
    enabled: false, // Disabled - edge functions not supported
    ...options,
  })
}
