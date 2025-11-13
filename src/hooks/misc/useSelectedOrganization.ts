/**
 * Organization hook stub for Open Studio
 * Cloud-only feature - not applicable for local PostgreSQL
 */

import { useQuery } from '@tanstack/react-query'
import type { Organization } from 'types'

// Stub implementation - returns undefined for local usage
export const useSelectedOrganizationQuery = () => {
  return useQuery<Organization | undefined>({
    queryKey: ['selected-organization'],
    queryFn: () => Promise.resolve(undefined),
    enabled: false, // Never actually run this query
  })
}

export const useSelectedOrganization = () => {
  const { data } = useSelectedOrganizationQuery()
  return data
}
