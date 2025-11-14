/**
 * Count estimate SQL stub for Open Studio
 */

export const getCountEstimateSQL = (schema: string, table: string) => {
  return `SELECT reltuples::bigint AS estimate
FROM pg_class
WHERE oid = '${schema}.${table}'::regclass`
}
