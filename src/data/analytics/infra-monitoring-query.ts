/**
 * Infrastructure monitoring query stub for Open Studio
 * Cloud-only monitoring feature
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface InfraMonitoring {
  cpu_usage: number
  memory_usage: number
  disk_usage: number
  connections: number
  timestamp: string
}

export const infraMonitoringKeys = {
  current: (projectRef: string | undefined) =>
    ['projects', projectRef, 'infra-monitoring'] as const,
}

export interface InfraMonitoringVariables {
  projectRef?: string
}

export async function getInfraMonitoring({ projectRef }: InfraMonitoringVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return healthy stats for local mode
  return {
    cpu_usage: 0,
    memory_usage: 0,
    disk_usage: 0,
    connections: 0,
    timestamp: new Date().toISOString(),
  } as InfraMonitoring
}

export function useInfraMonitoringQuery<TData = InfraMonitoring>(
  { projectRef }: InfraMonitoringVariables,
  options?: UseQueryOptions<InfraMonitoring, Error, TData>
) {
  return useQuery({
    queryKey: infraMonitoringKeys.current(projectRef),
    queryFn: () => getInfraMonitoring({ projectRef }),
    enabled: Boolean(projectRef),
    refetchInterval: 5000, // Refresh every 5 seconds
    ...options,
  })
}
