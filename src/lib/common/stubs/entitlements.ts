/**
 * Entitlements stubs for standalone mode
 *
 * In standalone mode, all entitlements are granted.
 */

/**
 * Check entitlements - always returns true
 */
export function useCheckEntitlements() {
  return {
    hasEntitlement: () => true,
    isLoading: false,
  }
}

/**
 * Organization AI opt-in level stub
 */
export function useOrgAiOptInLevel() {
  return {
    level: 'full', // Full AI access in standalone
    isLoading: false,
  }
}
