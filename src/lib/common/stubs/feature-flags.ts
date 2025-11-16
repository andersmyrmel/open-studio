/**
 * Feature Flags stubs for Open-Studio
 * Simplified feature flag system - all features enabled by default in standalone
 */

export type Feature =
  | 'sql_editor'
  | 'table_editor'
  | 'schema_visualizer'
  | 'database_functions'
  | 'database_triggers'
  | 'database_extensions'
  | 'inline_editor'
  | 'query_performance'
  | 'linter'
  | 'disableProjectCreationAndUpdate'
  | 'showRefreshToast'
  | 'triggersInsteadOfRealtime'

/**
 * Check if a feature is enabled
 * In standalone mode, all database features are enabled
 */
export function isFeatureEnabled(feature: Feature): boolean {
  return true
}

/**
 * Hook to check if feature is enabled
 */
export function useFlag(feature: Feature): boolean {
  return true
}

/**
 * Hook to get feature flags context
 */
export function useFeatureFlags() {
  return {
    isLoading: false,
    flags: {},
    getFlag: (feature: Feature) => true,
  }
}

/**
 * Stub for IS_PLATFORM check
 * Always false since we're standalone
 */
export const IS_PLATFORM = false

/**
 * Hook to check if specific features are enabled
 * Returns an object with feature flags as properties
 */
export function useIsFeatureEnabled(features: string[] | Feature[]): Record<string, boolean> {
  const result: Record<string, boolean> = {}

  // Convert feature strings to camelCase property names
  features.forEach((feature) => {
    const key = typeof feature === 'string' ? feature.replace(/[:-]/g, '') : feature
    result[key] = true
  })

  // Common feature flags
  return {
    ...result,
    realtimeAll: true,
    realtime: true,
    billingAll: true,
    billing: true,
  }
}
