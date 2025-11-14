/**
 * Org usage query stub for Open Studio
 */

export interface OrgMetricsUsage {
  usage: {
    storage: number
    bandwidth: number
    active_users: number
  }
  billing_cycle_start: string
  billing_cycle_end: string
  capped?: boolean
  available_in_plan?: boolean
  unlimited?: boolean
  metric?: string
  pricing_free_units?: number
}

export const useOrgUsageQuery = () => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
    isSuccess: true,
  }
}
