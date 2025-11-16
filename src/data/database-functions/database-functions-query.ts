import { useQuery } from '@tanstack/react-query'
import { databaseKeys } from 'data/database/keys'
import { get, handleError } from 'data/fetchers'
import type { ResponseError, UseCustomQueryOptions } from 'types'

export type DatabaseFunctionsVariables = {
  projectRef?: string
  connectionString?: string | null
}

export interface DatabaseFunction {
  id: number
  schema: string
  name: string
  language: string
  definition: string
  argument_types: string
  return_type: string
  security_definer: boolean
  config_params: Record<string, string> | null
  args?: Array<{ name: string; type?: string; mode?: string }>
  behavior?: 'IMMUTABLE' | 'STABLE' | 'VOLATILE'
  complete_statement?: string
}

export async function getDatabaseFunctions(
  { projectRef, connectionString }: DatabaseFunctionsVariables,
  signal?: AbortSignal,
  headersInit?: HeadersInit
) {
  if (!projectRef) throw new Error('projectRef is required')

  let headers = new Headers(headersInit)
  if (connectionString) headers.set('x-connection-encrypted', connectionString)

  const { data, error } = await get('/api/pg-meta/functions', {
    params: {
      header: {} as any,
      query: {} as any,
    },
    headers,
    signal,
  })

  if (error) handleError(error)
  return data as DatabaseFunction[]
}

export type DatabaseFunctionsData = DatabaseFunction[]
export type DatabaseFunctionsError = ResponseError

export const useDatabaseFunctionsQuery = <TData = DatabaseFunctionsData>(
  { projectRef, connectionString }: DatabaseFunctionsVariables,
  {
    enabled = true,
    ...options
  }: UseCustomQueryOptions<DatabaseFunctionsData, DatabaseFunctionsError, TData> = {}
) =>
  useQuery<DatabaseFunctionsData, DatabaseFunctionsError, TData>({
    queryKey: databaseKeys.databaseFunctions(projectRef),
    queryFn: ({ signal }: { signal?: AbortSignal }) => getDatabaseFunctions({ projectRef, connectionString }, signal),
    enabled: enabled && typeof projectRef !== 'undefined',
    ...options,
 } as any)
