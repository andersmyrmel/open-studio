/**
 * Project upgrade status query stub for Open Studio
 */

export interface ProjectUpgradeStatus {
  databaseUpgradeStatus?: {
    status?: string
    initiated_at?: string
    latest_status_at?: string
    error?: string
  }
}

export const useProjectUpgradeStatusQuery = (_params?: any, _options?: any): {
  data: ProjectUpgradeStatus | undefined
  isLoading: boolean
  error: any
} => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
  }
}
