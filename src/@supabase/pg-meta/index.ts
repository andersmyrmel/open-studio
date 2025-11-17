/**
 * Internal pg-meta package extracted from Supabase monorepo
 * This is the client-safe version that only includes SQL generators
 */

// Export the default object (main API)
export { default } from './src/index'

// Export types only (no conflicting exports)
export type { PGColumn } from './src/pg-meta-columns'
export type { PostgresColumn } from './src/pg-meta-columns'
export type { PostgresTable } from './src/pg-meta-tables'
export type { PostgresFunction } from './src/pg-meta-functions'
export type { PostgresSchema } from './src/pg-meta-schemas'
export type { PostgresRole } from './src/pg-meta-roles'
export type { PostgresView } from './src/pg-meta-views'
export type { PostgresMaterializedView } from './src/pg-meta-materialized-views'
export type { PostgresForeignTable } from './src/pg-meta-foreign-tables'
export type { PostgresPolicy } from './src/pg-meta-policies'
export type { PostgresTrigger, PGTrigger, PGTriggerCreate, PGTriggerUpdate } from './src/pg-meta-triggers'
export type { PostgresType } from './src/pg-meta-types'
export type { PostgresExtension } from './src/pg-meta-extensions'
export type { PostgresPublication } from './src/pg-meta-publications'
export type { PostgresConfig } from './src/pg-meta-config'
export type { PostgresVersion } from './src/pg-meta-version'
export type { PostgresIndex } from './src/pg-meta-indexes'
export type { PostgresTablePrivileges } from './src/pg-meta-table-privileges'
export type { PostgresColumnPrivileges } from './src/pg-meta-column-privileges'
export type { PostgresPrimaryKey } from './src/pg-meta-tables'
export type { PostgresRelationship } from './src/pg-meta-tables'

// Export query types and classes
export * from './src/query/types'
export { Query } from './src/query/Query'
export type { Filter, Sort, FilterOperator } from './src/query/types'

// Export pg-format functions
export { ident, literal } from './src/pg-format/index'

// Export constants
export { DEFAULT_SYSTEM_SCHEMAS, DEFAULT_PLATFORM_APPLICATION_NAME } from './src/constants'

// Export studio SQL helpers
export { COUNT_ESTIMATE_SQL, THRESHOLD_COUNT } from './src/sql/studio/get-count-estimate'
export { getCheckPrimaryKeysExistsSQL } from './src/sql/studio/check-primary-keys-exists'
export { getTablesWithAnonAuthenticatedAccessSQL } from './src/sql/studio/check-tables-anon-authenticated-access'

// Export table row query helpers
export { getTableRowsSql, MAX_CHARACTERS, MAX_ARRAY_SIZE } from './src/query/table-row-query'
