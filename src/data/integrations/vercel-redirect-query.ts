/**
 * Vercel redirect query stub for Open Studio
 */

export interface VercelRedirect {
  url: string
}

export const useVercelRedirectQuery = (
  variables?: any,
  options?: any
): {
  data: VercelRedirect | undefined
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
