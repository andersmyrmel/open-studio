/**
 * Users infinite query stub for Open Studio
 */

export interface User {
  id: string
  email?: string
  phone?: string
  created_at?: string
  last_sign_in_at?: string
  app_metadata?: Record<string, any>
  user_metadata?: Record<string, any>
  role?: string
  is_anonymous?: boolean
  providers?: any[]
}

export const useUsersInfiniteQuery = () => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
    fetchNextPage: () => {},
    hasNextPage: false,
  }
}
