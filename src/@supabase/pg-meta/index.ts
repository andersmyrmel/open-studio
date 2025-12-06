/**
 * Internal pg-meta package extracted from Supabase monorepo
 * This is the client-safe version that only includes SQL generators
 */

// Export the default object (main API)
export { default } from './src/index'

// Export PG types and create Postgres* aliases for compatibility
export type { PGColumn } from './src/pg-meta-columns'
export type { PGColumn as PostgresColumn } from './src/pg-meta-columns'
export type { PGTable } from './src/pg-meta-tables'
export type { PGTable as PostgresTable } from './src/pg-meta-tables'
export type { PGFunction } from './src/pg-meta-functions'
export type { PGFunction as PostgresFunction } from './src/pg-meta-functions'
export type { PGRole } from './src/pg-meta-roles'
export type { PGRole as PostgresRole } from './src/pg-meta-roles'
export type { PGView } from './src/pg-meta-views'
export type { PGView as PostgresView } from './src/pg-meta-views'
export type { PGMaterializedView } from './src/pg-meta-materialized-views'
export type { PGMaterializedView as PostgresMaterializedView } from './src/pg-meta-materialized-views'
export type { PGForeignTable } from './src/pg-meta-foreign-tables'
export type { PGForeignTable as PostgresForeignTable } from './src/pg-meta-foreign-tables'
export type { PGPolicy } from './src/pg-meta-policies'
export type { PGPolicy as PostgresPolicy } from './src/pg-meta-policies'
export type { PGTrigger, PGTriggerCreate, PGTriggerUpdate } from './src/pg-meta-triggers'
export type { PGTrigger as PostgresTrigger } from './src/pg-meta-triggers'
export type { PGExtension } from './src/pg-meta-extensions'
export type { PGExtension as PostgresExtension } from './src/pg-meta-extensions'
export type { PGPublication } from './src/pg-meta-publications'
export type { PGPublication as PostgresPublication } from './src/pg-meta-publications'
export type { PGSchema } from './src/pg-meta-schemas'
export type { PGSchema as PostgresSchema } from './src/pg-meta-schemas'
export type { PGType } from './src/pg-meta-types'
export type { PGType as PostgresType } from './src/pg-meta-types'
export type { PGIndex } from './src/pg-meta-indexes'
export type { PGIndex as PostgresIndex } from './src/pg-meta-indexes'
export type { PGConfig } from './src/pg-meta-config'
export type { PGConfig as PostgresConfig } from './src/pg-meta-config'
export type { PGVersion } from './src/pg-meta-version'
export type { PGVersion as PostgresVersion } from './src/pg-meta-version'
export type { PGTablePrivileges } from './src/pg-meta-table-privileges'
export type { PGTablePrivileges as PostgresTablePrivileges } from './src/pg-meta-table-privileges'
export type { PGColumnPrivileges } from './src/pg-meta-column-privileges'
export type { PGColumnPrivileges as PostgresColumnPrivileges } from './src/pg-meta-column-privileges'
export type { PGPrimaryKey } from './src/pg-meta-tables'
export type { PGPrimaryKey as PostgresPrimaryKey } from './src/pg-meta-tables'
export type { PGRelationship } from './src/pg-meta-tables'
export type { PGRelationship as PostgresRelationship } from './src/pg-meta-tables'

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
