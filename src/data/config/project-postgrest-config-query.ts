/**
 * Project PostgREST config query stub for Open Studio
 */

export interface ProjectPostgrestConfig {
  jwt_secret: string
}

export const useProjectPostgrestConfigQuery = (
  variables?: any,
  options?: any
): {
  data: ProjectPostgrestConfig | undefined
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

export const useProjectPostgrestConfigUpdateMutation = (options?: any) => {
  return {
    mutate: () => {},
    mutateAsync: async () => {},
    isLoading: false,
    ...options,
  }
}
