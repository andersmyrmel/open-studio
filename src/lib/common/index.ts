/**
 * Common utilities and hooks for Open-Studio
 * Replaces the 'common' workspace package from Supabase monorepo
 */

// Constants
export * from './constants'
export * from './constants/local-storage'
export * from './constants/environment'

// Hooks
export { useParams } from './hooks/useParams'
export { useIsomorphicLayoutEffect } from './hooks/useIsomorphicLayoutEffect'
export { useConstant } from './hooks/useConstant'
export { useDebounce } from './hooks/useDebounce'
export { useLocalStorage, useLocalStorageQuery } from './hooks/useLocalStorage'
export { useSynchronizedAnimation } from './hooks/useSynchronizedAnimation'
export { useTableEditorFiltersSort } from './hooks/useTableEditorFiltersSort'
export { useQuerySchemaState } from './hooks/useSchemaQueryState'
export { useChanged } from './hooks/useChanged'
export { useDashboardHistory } from './hooks/useDashboardHistory'
export { default as useLatest } from './hooks/useLatest'
export { useReportDateRange } from './hooks/useReportDateRange'
export { useSchemasForAi } from './hooks/useSchemasForAi'

// Helpers
export { mergeRefs } from './helpers'

// Stubs for removed features
export * from './stubs/auth'
export * from './stubs/feature-flags'
export * from './stubs/telemetry'
export * from './stubs/project'
export * from './stubs/organization'
export * from './stubs/permissions'
export * from './stubs/entitlements'
export { useIsOrioleDb } from './hooks/useIsOrioleDb'

// Additional stub functions
export const getAccessToken = async () => undefined
export const useCurrentOrgPlan = (): {
  plan: { id: string } | undefined
  isLoading: boolean
  error: undefined
} => ({
  plan: undefined,
  isLoading: false,
  error: undefined,
})
