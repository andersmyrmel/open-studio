/**
 * Database settings utilities stub for Open Studio
 */

export function formatConnectionString(params: {
  host: string
  port: number
  database: string
  user: string
  password: string
}): string {
  const { host, port, database, user, password } = params
  return `postgresql://${user}:${password}@${host}:${port}/${database}`
}

export function parseConnectionString(connectionString: string): {
  host: string
  port: number
  database: string
  user: string
  password: string
} | null {
  // Simple postgres URL parser
  const match = connectionString.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

  if (!match) return null

  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: parseInt(match[4]),
    database: match[5],
  }
}
