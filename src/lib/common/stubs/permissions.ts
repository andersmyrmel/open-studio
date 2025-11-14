/**
 * Permissions stubs for standalone mode
 *
 * In standalone mode, all permissions are granted.
 */

/**
 * Async permission check - always returns true
 */
export function useAsyncCheckPermissions() {
  return {
    can: true,
    checkPermissions: async () => true,
    isLoading: false,
    isSuccess: true,
  }
}

/**
 * Sync permission check - always returns true
 */
export function checkPermissions() {
  return true
}

/**
 * Hook for permission checks - always returns true
 */
export function useCheckPermissions() {
  return true
}
