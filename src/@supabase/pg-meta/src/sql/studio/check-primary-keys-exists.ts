/**
 * Primary keys exists check stub for Open Studio
 */

export const checkPrimaryKeysExistSQL = (schema: string, table: string) => {
  return `SELECT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = '${schema}.${table}'::regclass
    AND contype = 'p'
  )`
}
