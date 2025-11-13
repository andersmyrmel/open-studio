/**
 * Profile utilities for Open Studio
 * Stub implementation - no user profiles in local PostgreSQL mode
 */

export const useProfile = () => {
  // Stub: Return undefined for local usage
  // In Supabase Cloud, this would return the authenticated user's profile
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
  }
}

export const getProfile = async () => {
  // Stub: No profile in local mode
  return undefined
}
