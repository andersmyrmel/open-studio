import { QueryClient, useQuery } from '@tanstack/react-query'
import { get, handleError } from 'data/fetchers'
import type { ResponseError, UseCustomQueryOptions } from 'types'
import { databaseRoleKeys } from './keys'

export type DatabaseRolesVariables = {
  projectRef?: string
  connectionString?: string | null
}

export interface PgRole {
  id: number
  name: string
  is_superuser: boolean
  can_create_db: boolean
  can_create_role: boolean
  inherit_role: boolean
  can_login: boolean
  is_replication_role: boolean
  can_bypass_rls: boolean
  connection_limit: number
  password: string | null
  valid_until: string | null
  config: string[] | null
  activeConnections?: number
}

export async function getDatabaseRoles(
  { projectRef, connectionString }: DatabaseRolesVariables,
  signal?: AbortSignal,
  headersInit?: HeadersInit
) {
  if (!projectRef) throw new Error('projectRef is required')

  let headers = new Headers(headersInit)
  if (connectionString) headers.set('x-connection-encrypted', connectionString)

  const { data, error } = await get('/api/pg-meta/roles', {
    params: {
      header: {} as any,
      query: {} as any,
    },
    headers,
    signal,
  })

  if (error) handleError(error)
  return data as PgRole[]
}

export type DatabaseRolesData = PgRole[]
export type DatabaseRolesError = ResponseError

export const useDatabaseRolesQuery = <TData = DatabaseRolesData>(
  { projectRef, connectionString }: DatabaseRolesVariables,
  {
    enabled = true,
    ...options
  }: UseCustomQueryOptions<DatabaseRolesData, DatabaseRolesError, TData> = {}
) =>
  useQuery<DatabaseRolesData, DatabaseRolesError, TData>({
    queryKey: databaseRoleKeys.databaseRoles(projectRef),
    queryFn: ({ signal }) => getDatabaseRoles({ projectRef, connectionString }, signal),
    enabled: enabled && typeof projectRef !== 'undefined',
    ...options,
  })

export function invalidateRolesQuery(client: QueryClient, projectRef: string | undefined) {
  return client.invalidateQueries({ queryKey: databaseRoleKeys.databaseRoles(projectRef) })
}
