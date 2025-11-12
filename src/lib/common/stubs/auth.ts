/**
 * Auth stubs for Open-Studio
 * Since we removed authentication, these are stub implementations
 * that return default values to prevent errors in code that references auth
 */

// Stub user - no authentication in standalone app
const STUB_USER = {
  id: 'local-user',
  email: 'local@open-studio.dev',
  app_metadata: {},
  user_metadata: {},
  aud: '',
  created_at: new Date().toISOString(),
}

// Stub profile - no authentication in standalone app
const STUB_PROFILE = {
  id: 'local-user',
  primary_email: 'local@open-studio.dev',
  username: 'local-user',
  first_name: 'Local',
  last_name: 'User',
}

/**
 * Stub hook - always returns logged in (no auth required)
 */
export function useIsLoggedIn() {
  return true
}

/**
 * Stub hook - returns stub user
 */
export function useUser() {
  return STUB_USER
}

/**
 * Stub hook - returns stub profile
 */
export function useProfile() {
  return {
    profile: STUB_PROFILE,
    isLoading: false,
    isError: false,
  }
}

/**
 * Stub - always returns true (no permissions in standalone)
 */
export function hasPermission() {
  return true
}

/**
 * Stub - always returns true
 */
export function canUpdateTables() {
  return true
}

/**
 * Stub - always returns true
 */
export function canExecuteSQL() {
  return true
}
