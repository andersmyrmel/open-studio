/**
 * Resource warnings query stub for Open Studio
 * Cloud-only feature for usage limits and warnings
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface ResourceWarning {
  type: 'database_size' | 'bandwidth' | 'api_requests' | 'storage'
  level: 'info' | 'warning' | 'critical'
  message: string
  threshold: number
  current: number
}

export const resourceWarningsKeys = {
  warnings: (projectRef: string | undefined) => ['projects', projectRef, 'resource-warnings'] as const,
}

export interface ResourceWarningsVariables {
  projectRef?: string
}

export async function getResourceWarnings({ projectRef }: ResourceWarningsVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return empty array for local mode (no resource limits)
  return [] as ResourceWarning[]
}

export function useResourceWarningsQuery<TData = ResourceWarning[]>(
  { projectRef }: ResourceWarningsVariables,
  options?: UseQueryOptions<ResourceWarning[], Error, TData>
) {
  return useQuery({
    queryKey: resourceWarningsKeys.warnings(projectRef),
    queryFn: () => getResourceWarnings({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
