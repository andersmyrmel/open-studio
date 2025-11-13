/**
 * Project daily stats query stub for Open Studio
 * Cloud-only analytics feature
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface DailyStat {
  date: string
  api_requests: number
  db_size: number
  bandwidth: number
  active_users: number
}

export const projectDailyStatsKeys = {
  stats: (projectRef: string | undefined, from?: string, to?: string) =>
    ['projects', projectRef, 'daily-stats', from, to].filter(Boolean) as const,
}

export interface ProjectDailyStatsVariables {
  projectRef?: string
  from?: string
  to?: string
}

export async function getProjectDailyStats({
  projectRef,
  from,
  to,
}: ProjectDailyStatsVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return empty array for local mode
  return [] as DailyStat[]
}

export function useProjectDailyStatsQuery<TData = DailyStat[]>(
  { projectRef, from, to }: ProjectDailyStatsVariables,
  options?: UseQueryOptions<DailyStat[], Error, TData>
) {
  return useQuery({
    queryKey: projectDailyStatsKeys.stats(projectRef, from, to),
    queryFn: () => getProjectDailyStats({ projectRef, from, to }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
