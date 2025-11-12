/**
 * Project context stubs for standalone mode
 *
 * In standalone mode, there is no project concept - we connect directly to
 * a PostgreSQL database without project/organization hierarchy.
 */

export const DEFAULT_PROJECT = {
  id: 1,
  ref: 'default',
  name: 'Open Studio',
  status: 'ACTIVE_HEALTHY',
  region: 'local',
  inserted_at: new Date().toISOString(),
}

/**
 * Stub hook that returns a default project for compatibility
 */
export function useSelectedProjectQuery() {
  return {
    data: DEFAULT_PROJECT,
    isLoading: false,
    isError: false,
    error: null,
  }
}

/**
 * Stub function that always returns false (no AWS OrioleDB in standalone)
 */
export function useIsOrioleDbInAws() {
  return false
}

export const PROJECT_STATUS = {
  ACTIVE_HEALTHY: 'ACTIVE_HEALTHY',
  INACTIVE: 'INACTIVE',
  COMING_UP: 'COMING_UP',
  UNKNOWN: 'UNKNOWN',
  RESTORING: 'RESTORING',
  PAUSED: 'PAUSED',
} as const
