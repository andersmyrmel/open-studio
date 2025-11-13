/**
 * Foreign Data Wrapper (FDW) handler constants
 * Extracted from Supabase Studio for Open Studio
 * Minimal version - only what's needed for table-editor-types.ts
 */

export const WRAPPER_HANDLERS = {
  AIRTABLE: 'airtable_fdw_handler',
  AUTH0: 'auth0_fdw_handler',
  BIGQUERY: 'bigquery_fdw_handler',
  CLICKHOUSE: 'click_house_fdw_handler',
  FIREBASE: 'firebase_fdw_handler',
  LOGFLARE: 'logflare_fdw_handler',
  MSSQL: 'mssql_fdw_handler',
  PADDLE: 'paddle_fdw_handler',
  S3: 's3_fdw_handler',
  STRIPE: 'stripe_fdw_handler',
  SNOWFLAKE: 'snowflake_fdw_handler',
  REDIS: 'redis_fdw_handler',
  POSTGRES: 'postgres_fdw_handler',
}

// Full WRAPPERS array omitted for now - only WRAPPER_HANDLERS is needed
export const WRAPPERS: any[] = []
