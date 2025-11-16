/**
 * Profile utilities for Open Studio
 * Stub implementation - no user profiles in local PostgreSQL mode
 */

export interface Profile {
  id: string
  email?: string
  username?: string
  full_name?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export const useProfile = () => {
  // Stub: Return undefined for local usage
  // In Supabase Cloud, this would return the authenticated user's profile
  return {
    data: undefined as Profile | undefined,
    isLoading: false,
    error: undefined,
    profile: undefined as Profile | undefined,
  }
}

export const getProfile = async (): Promise<Profile | undefined> => {
  // Stub: No profile in local mode
  return undefined
}
