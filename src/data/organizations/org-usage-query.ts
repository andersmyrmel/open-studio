/**
 * Organization usage query for Open Studio
 * Fetches usage metrics and quotas for organizations
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export interface OrgUsage {
  project_count: number
  storage_used_gb: number
  bandwidth_used_gb: number
  database_size_gb: number
  plan: string
  quotas: {
    max_projects: number
    max_storage_gb: number
    max_bandwidth_gb: number
  }
}

export interface OrgUsageVariables {
  orgSlug?: string
}

export async function getOrgUsage({ orgSlug }: OrgUsageVariables) {
  if (!orgSlug) {
    throw new Error('orgSlug is required')
  }

  // Stub implementation - in production, this would fetch from cloud API
  return {
    project_count: 1,
    storage_used_gb: 0.5,
    bandwidth_used_gb: 0.1,
    database_size_gb: 0.2,
    plan: 'free',
    quotas: {
      max_projects: 2,
      max_storage_gb: 0.5,
      max_bandwidth_gb: 5,
    },
  } as OrgUsage
}

export const orgUsageKeys = {
  usage: (orgSlug: string | undefined) => ['organizations', orgSlug, 'usage'] as const,
}

export function useOrgUsageQuery<TData = OrgUsage>(
  { orgSlug }: OrgUsageVariables,
  options: UseQueryOptions<OrgUsage, Error, TData> = {}
) {
  return useQuery<OrgUsage, Error, TData>({
    queryKey: orgUsageKeys.usage(orgSlug),
    queryFn: () => getOrgUsage({ orgSlug }),
    enabled: Boolean(orgSlug),
    ...options,
  })
}
