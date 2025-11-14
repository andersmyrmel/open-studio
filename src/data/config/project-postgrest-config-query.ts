/**
 * Project PostgREST config query stub for Open Studio
 */

export const useProjectPostgrestConfigQuery = (variables?: any, options?: any) => {
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
