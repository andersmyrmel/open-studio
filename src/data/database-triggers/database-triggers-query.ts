import { useQuery } from '@tanstack/react-query'
import { get, handleError } from 'data/fetchers'
import type { ResponseError, UseCustomQueryOptions } from 'types'
import { databaseTriggerKeys } from './keys'

export type DatabaseTriggersVariables = {
  projectRef?: string
  connectionString?: string | null
}

export async function getDatabaseTriggers(
  { projectRef, connectionString }: DatabaseTriggersVariables,
  signal?: AbortSignal,
  headersInit?: HeadersInit
) {
  if (!projectRef) throw new Error('projectRef is required')

  const headers = new Headers(headersInit)
  if (connectionString) headers.set('x-connection-encrypted', connectionString)

  const { data, error } = await get('/api/pg-meta/triggers', {
    params: {
      header: {} as any,
      query: {} as any,
    },
    headers,
    signal,
  })

  if (error) handleError(error)
  return data
}

export type DatabaseTriggersData = Awaited<ReturnType<typeof getDatabaseTriggers>>
export type DatabaseTriggersError = ResponseError

export const useDatabaseHooksQuery = <TData = DatabaseTriggersData>(
  { projectRef, connectionString }: DatabaseTriggersVariables,
  {
    enabled = true,
    ...options
  }: UseCustomQueryOptions<DatabaseTriggersData, DatabaseTriggersError, TData> = {}
) =>
  useQuery<DatabaseTriggersData, DatabaseTriggersError, TData>({
    queryKey: databaseTriggerKeys.list(projectRef),
    queryFn: ({ signal }) => getDatabaseTriggers({ projectRef, connectionString }, signal),
    select: (data) => {
      return data.filter((trigger: any) => {
        return (
          trigger.function_schema === 'supabase_functions' &&
          (trigger.schema !== 'net' || trigger.function_args.length === 0)
        )
      }) as any
    },
    enabled: enabled && typeof projectRef !== 'undefined',
    ...options,
  })

export const useDatabaseTriggersQuery = <TData = DatabaseTriggersData>(
  { projectRef, connectionString }: DatabaseTriggersVariables,
  {
    enabled = true,
    ...options
  }: UseCustomQueryOptions<DatabaseTriggersData, DatabaseTriggersError, TData> = {}
) =>
  useQuery<DatabaseTriggersData, DatabaseTriggersError, TData>({
    queryKey: databaseTriggerKeys.list(projectRef),
    queryFn: ({ signal }) => getDatabaseTriggers({ projectRef, connectionString }, signal),
    enabled: enabled && typeof projectRef !== 'undefined',
    ...options,
  })
