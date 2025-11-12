import type { PostgresTable } from '@supabase/postgres-meta'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { sortBy } from 'lodash'
import { useCallback } from 'react'

import { DEFAULT_PLATFORM_APPLICATION_NAME } from '@supabase/pg-meta/src/constants'
import { get, handleError } from 'data/fetchers'
import type { ResponseError, UseCustomQueryOptions } from 'types'
import { tableKeys } from './keys'

export type TablesVariables = {
  projectRef?: string
  connectionString?: string | null
  schema?: string
  /**
   * Defaults to false
   */
  includeColumns?: boolean
  sortByProperty?: keyof PostgresTable
}

export async function getTables(
  {
    projectRef,
    connectionString,
    schema,
    includeColumns = false,
    sortByProperty = 'name',
  }: TablesVariables,
  signal?: AbortSignal
) {
  // Note: projectRef and connectionString are kept for compatibility but not used in standalone mode

  let headers = new Headers()

  let queryParams: Record<string, string> = {
    //include_columns is a string, even though it's true or false
    include_columns: `${includeColumns}`,
  }
  if (schema) {
    queryParams.included_schemas = schema
  }

  // Use local API route instead of Supabase platform API
  const { data, error } = await get('/api/pg-meta/tables', {
    params: {
      header: {},
      query: queryParams as any,
    },
    headers,
    signal,
  })

  if (!Array.isArray(data) && error) handleError(error)

  // Sort the data if the sortByName option is true
  if (Array.isArray(data) && sortByProperty) {
    return sortBy(data, (t) => t[sortByProperty]) as PostgresTable[]
  }

  return data as Omit<PostgresTable, 'columns'>[]
}

export type TablesData = Awaited<ReturnType<typeof getTables>>
export type TablesError = ResponseError

export const useTablesQuery = <TData = TablesData>(
  { projectRef, connectionString, schema, includeColumns }: TablesVariables,
  { enabled = true, ...options }: UseCustomQueryOptions<TablesData, TablesError, TData> = {}
) => {
  // Note: In standalone mode, we don't need projectRef validation
  return useQuery<TablesData, TablesError, TData>({
    queryKey: tableKeys.list(projectRef, schema, includeColumns),
    queryFn: ({ signal }) =>
      getTables({ projectRef, connectionString, schema, includeColumns }, signal),
    enabled: enabled,
    ...options,
  })
}

/**
 * useGetTables
 * Tries to get tables from the react-query cache, or loads it from the server if it's not cached.
 */
export function useGetTables({
  projectRef,
  connectionString,
}: Pick<TablesVariables, 'projectRef' | 'connectionString'>) {
  const queryClient = useQueryClient()

  return useCallback(
    (schema?: TablesVariables['schema'], includeColumns?: TablesVariables['includeColumns']) => {
      return queryClient.fetchQuery({
        queryKey: tableKeys.list(projectRef, schema, includeColumns),
        queryFn: ({ signal }) =>
          getTables({ projectRef, connectionString, schema, includeColumns }, signal),
      })
    },
    [connectionString, projectRef, queryClient]
  )
}

export function usePrefetchTables({
  projectRef,
  connectionString,
}: Pick<TablesVariables, 'projectRef' | 'connectionString'>) {
  const queryClient = useQueryClient()

  return useCallback(
    (schema?: TablesVariables['schema'], includeColumns?: TablesVariables['includeColumns']) => {
      return queryClient.prefetchQuery({
        queryKey: tableKeys.list(projectRef, schema, includeColumns),
        queryFn: ({ signal }) =>
          getTables({ projectRef, connectionString, schema, includeColumns }, signal),
      })
    },
    [connectionString, projectRef, queryClient]
  )
}
