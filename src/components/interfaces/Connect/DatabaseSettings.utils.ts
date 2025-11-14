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

export interface ConnectionInfo {
  connectionString: string
  host: string
  port: number
  database: string
  user: string
  psql?: string
}

export function getConnectionStrings(project: any, readReplicas: any[] = []): {
  primary: ConnectionInfo
  replicas: ConnectionInfo[]
  direct: ConnectionInfo & { psql: string }
} {
  // Stub implementation - return primary connection from project
  const primary: ConnectionInfo = {
    connectionString: project.connectionString || 'postgresql://postgres@localhost:5432/postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
  }

  // Map read replicas if provided
  const replicas: ConnectionInfo[] = readReplicas.map((replica: any) => ({
    connectionString: replica.connectionString || primary.connectionString,
    host: replica.host || primary.host,
    port: replica.port || primary.port,
    database: replica.database || primary.database,
    user: replica.user || primary.user,
  }))

  // Direct connection with psql command
  const direct = {
    ...primary,
    psql: `psql ${primary.connectionString}`,
  }

  return { primary, replicas, direct }
}
