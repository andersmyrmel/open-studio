import { QueryClient, useQuery } from '@tanstack/react-query'
import { get, handleError } from 'data/fetchers'
import type { ResponseError, UseCustomQueryOptions } from 'types'
import { databaseKeys } from './keys'

export type SchemasVariables = {
  projectRef?: string
  connectionString?: string | null
}

export interface Schema {
  id: number
  name: string
  owner: string
}

export type SchemasData = Schema[]
export type SchemasError = ResponseError

export async function getSchemas(
  { projectRef, connectionString }: SchemasVariables,
  signal?: AbortSignal,
  headersInit?: HeadersInit
) {
  if (!projectRef) throw new Error('projectRef is required')

  let headers = new Headers(headersInit)
  if (connectionString) headers.set('x-connection-encrypted', connectionString)

  const { data, error } = await get('/api/pg-meta/schemas', {
    params: {
      header: {} as any,
      query: {} as any,
    },
    headers,
    signal,
  })

  if (error) handleError(error)
  return data as Schema[]
}

export const useSchemasQuery = <TData = SchemasData>(
  { projectRef, connectionString }: SchemasVariables,
  { enabled = true, ...options }: UseCustomQueryOptions<SchemasData, SchemasError, TData> = {}
) =>
  useQuery<SchemasData, SchemasError, TData>({
    queryKey: databaseKeys.schemas(projectRef),
    queryFn: ({ signal }) => getSchemas({ projectRef, connectionString }, signal),
    enabled: enabled && typeof projectRef !== 'undefined',
    ...options,
  })

export function invalidateSchemasQuery(client: QueryClient, projectRef: string | undefined) {
  return client.invalidateQueries({ queryKey: databaseKeys.schemas(projectRef) })
}

export function prefetchSchemas(
  client: QueryClient,
  { projectRef, connectionString }: SchemasVariables
) {
  return client.fetchQuery({
    queryKey: databaseKeys.schemas(projectRef),
    queryFn: ({ signal }) => getSchemas({ projectRef, connectionString }, signal),
  })
}
