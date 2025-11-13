/**
 * Organization projects infinite query for Open Studio
 * Provides infinite scroll/pagination for organization projects
 */

import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query'

export interface Project {
  id: string
  ref: string
  name: string
  organization_id: string
  region: string
  status: 'active' | 'inactive' | 'paused'
  created_at: string
}

export interface OrgProjectsResponse {
  projects: Project[]
  nextCursor?: string
  hasMore: boolean
}

export interface OrgProjectsInfiniteVariables {
  orgSlug?: string
  cursor?: string
  limit?: number
}

export async function getOrgProjects({
  orgSlug,
  cursor,
  limit = 20,
}: OrgProjectsInfiniteVariables): Promise<OrgProjectsResponse> {
  if (!orgSlug) {
    throw new Error('orgSlug is required')
  }

  // Stub implementation - in production, this would fetch from cloud API
  return {
    projects: [
      {
        id: 'local-project',
        ref: 'local-project',
        name: 'Open Studio Project',
        organization_id: orgSlug,
        region: 'local',
        status: 'active',
        created_at: new Date().toISOString(),
      },
    ],
    hasMore: false,
  }
}

export const orgProjectsKeys = {
  projects: (orgSlug: string | undefined) => ['organizations', orgSlug, 'projects'] as const,
}

export function useOrgProjectsInfiniteQuery<TData = OrgProjectsResponse>(
  { orgSlug, limit }: Omit<OrgProjectsInfiniteVariables, 'cursor'>,
  options: Omit<
    UseInfiniteQueryOptions<OrgProjectsResponse, Error, TData>,
    'queryKey' | 'queryFn' | 'getNextPageParam'
  > = {}
) {
  return useInfiniteQuery<OrgProjectsResponse, Error, TData>({
    queryKey: orgProjectsKeys.projects(orgSlug),
    queryFn: ({ pageParam }) => getOrgProjects({ orgSlug, cursor: pageParam as string, limit }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    enabled: Boolean(orgSlug),
    ...options,
  } as any)
}
