/**
 * Read replicas query stub for Open Studio
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface ReadReplica {
  id: string
  identifier: string
  region: string
  status: string
}

export const replicasKeys = {
  list: (projectRef: string | undefined) => ['projects', projectRef, 'replicas'] as const,
}

export interface ReplicasVariables {
  projectRef?: string
}

export async function getReplicas({ projectRef }: ReplicasVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return empty array for local mode (no replicas)
  return [] as ReadReplica[]
}

export function useReplicasQuery<TData = ReadReplica[]>(
  { projectRef }: ReplicasVariables,
  options?: UseQueryOptions<ReadReplica[], Error, TData>
) {
  return useQuery({
    queryKey: replicasKeys.list(projectRef),
    queryFn: () => getReplicas({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}

// Alias for compatibility
export const useReadReplicasQuery = useReplicasQuery
