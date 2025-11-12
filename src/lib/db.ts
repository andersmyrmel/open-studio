/**
 * Database Connection Helper
 *
 * This module provides a PostgreSQL connection pool and query helpers
 * for Open-Studio. It uses node-postgres (pg) for database connectivity.
 */

import { Pool, QueryResult, QueryResultRow } from 'pg';

// Validate that DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is not set. ' +
    'Please set it in your .env file or environment.'
  );
}

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 5000, // Timeout for acquiring a connection
  // Enable SSL for production environments
  ssl: process.env.NODE_ENV === 'production' && process.env.DATABASE_URL.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : undefined,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

/**
 * Execute a parameterized SQL query
 *
 * @param text - The SQL query string with $1, $2, etc. placeholders
 * @param params - Array of parameters to bind to the query
 * @returns Query result with rows and metadata
 *
 * @example
 * const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
 * console.log(result.rows);
 */
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();

  try {
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;

    // Log queries in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', {
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        duration: `${duration}ms`,
        rows: result.rowCount,
      });
    }

    return result;
  } catch (error) {
    const duration = Date.now() - start;

    // Log errors
    console.error('Query error', {
      text: text.substring(0, 100),
      duration: `${duration}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    throw error;
  }
}

/**
 * Get a client from the pool for transactions
 * Remember to release the client when done!
 *
 * @example
 * const client = await getClient();
 * try {
 *   await client.query('BEGIN');
 *   await client.query('INSERT INTO ...');
 *   await client.query('COMMIT');
 * } catch (e) {
 *   await client.query('ROLLBACK');
 *   throw e;
 * } finally {
 *   client.release();
 * }
 */
export async function getClient() {
  return await pool.connect();
}

/**
 * Test the database connection
 * Useful for health checks
 *
 * @returns true if connection is successful, false otherwise
 */
export async function testConnection(): Promise<boolean> {
  try {
    const result = await query('SELECT 1 as test');
    return result.rows.length > 0;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

/**
 * Close all connections in the pool
 * Call this when shutting down the application
 */
export async function closePool(): Promise<void> {
  await pool.end();
}

// Export the pool for advanced use cases
export default pool;
