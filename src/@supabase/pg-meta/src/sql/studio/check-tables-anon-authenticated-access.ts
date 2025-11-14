/**
 * Tables access check stub for Open Studio
 */

export const checkTablesAnonAuthenticatedAccessSQL = () => {
  return `SELECT schemaname, tablename FROM pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema')`
}
