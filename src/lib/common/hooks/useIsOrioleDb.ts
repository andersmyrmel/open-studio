/**
 * useIsOrioleDb hook for Open Studio
 * Checks if the current database is OrioleDB (cloud-only feature)
 */

import { useSelectedProjectQuery } from 'lib/common'

export function useIsOrioleDb(): boolean {
  const { data: project } = useSelectedProjectQuery()

  // OrioleDB is a cloud-only feature
  // In local development, we're always using standard PostgreSQL
  return false
}
