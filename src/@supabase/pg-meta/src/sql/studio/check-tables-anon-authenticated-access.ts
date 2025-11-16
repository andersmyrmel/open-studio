/**
 * Tables access check stub for Open Studio
 */

export const checkTablesAnonAuthenticatedAccessSQL = ({ schema }: { schema: string }) => {
  return `SELECT schemaname AS table_schema, tablename AS table_name FROM pg_tables WHERE schemaname = '${schema}'`
}
