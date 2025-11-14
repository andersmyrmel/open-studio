/**
 * Shared data stub for Open Studio
 * Constants and configurations shared across the application
 */

export const logConstants = {
  LOG_LEVELS: ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'] as const,
  DEFAULT_LOG_LEVEL: 'INFO' as const,
  MAX_LOG_SIZE: 1000,
  LOG_RETENTION_DAYS: 7,
}

const extensionsData = {
  // PostgreSQL extensions available in Supabase
  pg_stat_statements: {
    name: 'pg_stat_statements',
    comment: 'Track planning and execution statistics of all SQL statements',
    default_version: '1.10',
  },
  pgcrypto: {
    name: 'pgcrypto',
    comment: 'Cryptographic functions',
    default_version: '1.3',
  },
  'uuid-ossp': {
    name: 'uuid-ossp',
    comment: 'Generate universally unique identifiers (UUIDs)',
    default_version: '1.1',
  },
  postgis: {
    name: 'postgis',
    comment: 'PostGIS geometry and geography spatial types and functions',
    default_version: '3.3.2',
  },
  pg_graphql: {
    name: 'pg_graphql',
    comment: 'GraphQL support for PostgreSQL',
    default_version: '1.5.0',
  },
  pg_jsonschema: {
    name: 'pg_jsonschema',
    comment: 'JSON Schema validation for PostgreSQL',
    default_version: '0.1.4',
  },
  pgjwt: {
    name: 'pgjwt',
    comment: 'JSON Web Token (JWT) generation and verification',
    default_version: '0.2.0',
  },
  plpgsql: {
    name: 'plpgsql',
    comment: 'PL/pgSQL procedural language',
    default_version: '1.0',
  },
  vector: {
    name: 'vector',
    comment: 'Vector similarity search for PostgreSQL',
    default_version: '0.5.1',
  },
}

// Export as array with find method for compatibility
export const extensions = Object.values(extensionsData) as Array<{
  name: string
  comment: string
  default_version: string
}>

// Also export as object for key-based access
export const extensionsMap = extensionsData

export type Extension = keyof typeof extensionsData
