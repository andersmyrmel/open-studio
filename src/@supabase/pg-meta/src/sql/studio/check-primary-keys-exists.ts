/**
 * Primary keys exists check stub for Open Studio
 */

export const checkPrimaryKeysExistSQL = (tables: { name: string; schema: string }[]) => {
  if (tables.length === 0) {
    return 'SELECT NULL::text as id, NULL::text as name, NULL::text as schema, NULL::boolean as has_primary_key WHERE false'
  }

  const checks = tables
    .map(
      (table) => `
    SELECT
      '${table.schema}.${table.name}'::text as id,
      '${table.name}'::text as name,
      '${table.schema}'::text as schema,
      EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conrelid = '${table.schema}.${table.name}'::regclass
        AND contype = 'p'
      ) as has_primary_key
  `
    )
    .join(' UNION ALL ')

  return checks
}
