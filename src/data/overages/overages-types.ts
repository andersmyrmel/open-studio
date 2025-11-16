/**
 * Overages and metrics types stub for Open Studio
 */

export interface OrgMetricsUsage {
  available_in_plan: boolean
  unlimited: boolean
  metric: string
  pricing_free_units: number
  usage: number
  limit: number
}

export const useOrgMetricsUsageQuery = (variables?: any, options?: any) => {
  return {
    data: [] as OrgMetricsUsage[],
    isLoading: false,
    error: undefined,
    isSuccess: true,
  }
}
