/**
 * JWT secret updating status query stub for Open Studio
 * Cloud-only feature
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface JwtSecretUpdatingStatus {
  isUpdating: boolean
  progress?: number
  error?: string
}

export const jwtSecretKeys = {
  updatingStatus: (projectRef: string | undefined) =>
    ['projects', projectRef, 'jwt-secret', 'updating-status'] as const,
}

export interface JwtSecretUpdatingStatusVariables {
  projectRef?: string
}

export async function getJwtSecretUpdatingStatus({ projectRef }: JwtSecretUpdatingStatusVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: always return not updating for local mode
  return {
    isUpdating: false,
  } as JwtSecretUpdatingStatus
}

export function useJwtSecretUpdatingStatusQuery<TData = JwtSecretUpdatingStatus>(
  { projectRef }: JwtSecretUpdatingStatusVariables,
  options?: UseQueryOptions<JwtSecretUpdatingStatus, Error, TData>
) {
  return useQuery({
    queryKey: jwtSecretKeys.updatingStatus(projectRef),
    queryFn: () => getJwtSecretUpdatingStatus({ projectRef }),
    enabled: Boolean(projectRef),
    refetchInterval: 2000, // Poll every 2 seconds when enabled
    ...options,
  })
}
