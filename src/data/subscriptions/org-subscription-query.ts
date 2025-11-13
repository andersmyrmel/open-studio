/**
 * Organization subscription query stub for Open Studio
 * Cloud-only feature - not available in local mode
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface OrgSubscription {
  tier: 'free' | 'pro' | 'team' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired'
  plan: string
  [key: string]: any
}

export const orgSubscriptionKeys = {
  subscription: (orgSlug: string | undefined) => ['organizations', orgSlug, 'subscription'] as const,
}

export interface OrgSubscriptionVariables {
  orgSlug?: string
}

export async function getOrgSubscription({ orgSlug }: OrgSubscriptionVariables) {
  if (!orgSlug) throw new Error('orgSlug is required')

  // Stub: return free tier for local mode
  return {
    tier: 'free',
    status: 'active',
    plan: 'Free',
  } as OrgSubscription
}

export function useOrgSubscriptionQuery<TData = OrgSubscription>(
  { orgSlug }: OrgSubscriptionVariables,
  options?: UseQueryOptions<OrgSubscription, Error, TData>
) {
  return useQuery({
    queryKey: orgSubscriptionKeys.subscription(orgSlug),
    queryFn: () => getOrgSubscription({ orgSlug }),
    enabled: Boolean(orgSlug),
    ...options,
  })
}
