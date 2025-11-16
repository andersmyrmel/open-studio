/**
 * PostgreSQL client for Open-Studio
 *
 * This replaces Supabase's platform API with direct PostgreSQL connections
 * using node-postgres (pg).
 */

import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg'

// Singleton pool instance
let pool: Pool | null = null

/**
 * Get or create a PostgreSQL connection pool
 */
export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 10000, // Timeout after 10 seconds when connecting
    })

    // Log pool errors
    pool.on('error', (err: any) => {
      console.error('Unexpected error on idle PostgreSQL client', err)
    })
  }

  return pool
}

/**
 * Execute a SQL query with parameters
 */
export async function query<T extends QueryResultRow = any>(
  sql: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const pool = getPool()
  return pool.query<T>(sql, params)
}

/**
 * Execute a SQL query with a specific client (for transactions)
 */
export async function queryWithClient<T extends QueryResultRow = any>(
  client: PoolClient,
  sql: string,
  params?: any[]
): Promise<QueryResult<T>> {
  return client.query<T>(sql, params)
}

/**
 * Get a client from the pool (for transactions)
 */
export async function getClient(): Promise<PoolClient> {
  const pool = getPool()
  return pool.connect()
}

/**
 * Execute a function within a transaction
 */
export async function transaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await getClient()
  try {
    await client.query('BEGIN')
    const result = await fn(client)
    await client.query('COMMIT')
    return result
  } catch (error: any) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

/**
 * Close the pool (for graceful shutdown)
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}

/**
 * Parse PostgreSQL error into a structured format
 */
export function parsePostgresError(error: any): {
  code: string
  message: string
  error: string
  formattedError: string
  file?: string
  line?: string
  position?: string
  routine?: string
  severity?: string
} {
  const pgError = error as any

  return {
    code: pgError.code || 'UNKNOWN',
    message: pgError.message || 'Unknown database error',
    error: pgError.message || 'Unknown database error',
    formattedError: formatPostgresError(pgError),
    file: pgError.file,
    line: pgError.line,
    position: pgError.position,
    routine: pgError.routine,
    severity: pgError.severity,
  }
}

/**
 * Format PostgreSQL error for display
 */
function formatPostgresError(error: any): string {
  let formatted = error.message || 'Unknown error'

  if (error.detail) {
    formatted += `\nDetail: ${error.detail}`
  }

  if (error.hint) {
    formatted += `\nHint: ${error.hint}`
  }

  if (error.position) {
    formatted += `\nPosition: ${error.position}`
  }

  return formatted
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const result = await query('SELECT 1 as test')
    return result.rows.length === 1 && result.rows[0].test === 1
  } catch (error: any) {
    console.error('Database connection test failed:', error)
    return false
  }
}
