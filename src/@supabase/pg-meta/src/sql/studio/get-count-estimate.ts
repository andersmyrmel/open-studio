/**
 * Count estimation constants and utilities
 */

// Threshold for using estimated counts vs exact counts
// When row count exceeds this, use pg_class estimates instead of COUNT(*)
export const THRESHOLD_COUNT = 100000

export function shouldUseEstimate(rowCount: number): boolean {
  return rowCount > THRESHOLD_COUNT
}
