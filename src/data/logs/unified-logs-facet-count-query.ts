/**
 * Unified logs facet count query for Open Studio
 * Aggregation query for log filtering
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export interface LogFacetCount {
  value: string
  count: number
}

export interface UnifiedLogsFacetCountVariables {
  projectRef?: string
  facet: string
  filters?: Record<string, any>
}

export async function getUnifiedLogsFacetCount({
  projectRef,
  facet,
  filters,
}: UnifiedLogsFacetCountVariables): Promise<LogFacetCount[]> {
  // Stub: return empty for local mode
  return []
}

export function useUnifiedLogsFacetCountQuery(
  variables: UnifiedLogsFacetCountVariables,
  options?: UseQueryOptions<LogFacetCount[], Error>
) {
  return useQuery({
    queryKey: ['unified-logs-facet-count', variables],
    queryFn: () => getUnifiedLogsFacetCount(variables),
    enabled: Boolean(variables.projectRef),
    ...options,
  })
}
