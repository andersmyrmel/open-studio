/**
 * AWS redirect query stub for Open Studio
 */

export interface AwsRedirect {
  url: string
}

export const useAwsRedirectQuery = (
  variables?: any,
  options?: any
): {
  data: AwsRedirect | undefined
  isLoading: boolean
  error: undefined
  isError: boolean
} => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
    isError: false,
  }
}
