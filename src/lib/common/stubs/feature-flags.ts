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
