/**
 * Deployment commit query stub for Open Studio
 */

export interface DeploymentCommit {
  commitSha: string
  commitTime: string
}

export const useDeploymentCommitQuery = (
  variables?: any,
  options?: any
): {
  data: DeploymentCommit | undefined
  isLoading: boolean
  error: undefined
  isError: boolean
  isSuccess: boolean
} => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
    isError: false,
    isSuccess: true,
  }
}
