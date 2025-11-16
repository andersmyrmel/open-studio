import { QueryKey, useQuery } from '@tanstack/react-query'

import { DEFAULT_PLATFORM_APPLICATION_NAME } from '@supabase/pg-meta/src/constants'
import { handleError as handleErrorFetchers, post } from 'data/fetchers'
import { useSelectedProjectQuery } from '@/lib/common'
import { MB, PROJECT_STATUS } from 'lib/constants'
import {
  ROLE_IMPERSONATION_NO_RESULTS,
  ROLE_IMPERSONATION_SQL_LINE_COUNT,
} from 'lib/role-impersonation'
import type { ResponseError, UseCustomQueryOptions } from 'types'
import { sqlKeys } from './keys'

export type ExecuteSqlVariables = {
  projectRef?: string
  connectionString?: string | null
  sql: string
  queryKey?: QueryKey
  handleError?: (error: ResponseError) => { result: any }
  isRoleImpersonationEnabled?: boolean
  isStatementTimeoutDisabled?: boolean
  autoLimit?: number
  contextualInvalidation?: boolean
}

export async function executeSql<T = any>(
  {
    projectRef,
    connectionString,
    sql,
    queryKey,
    handleError,
    isRoleImpersonationEnabled = false,
    isStatementTimeoutDisabled = false,
  }: Pick<
    ExecuteSqlVariables,
    | 'projectRef'
    | 'connectionString'
    | 'sql'
    | 'queryKey'
    | 'handleError'
    | 'isRoleImpersonationEnabled'
    | 'isStatementTimeoutDisabled'
  >,
  signal?: AbortSignal,
  headersInit?: HeadersInit,
  fetcherOverride?: (options: {
    query: string
    headers?: HeadersInit
  }) => Promise<{ data: T } | { error: ResponseError }>
): Promise<{ result: T }> {
  // Note: projectRef and connectionString are kept for compatibility but not used in standalone mode

  const sqlSize = new Blob([sql]).size
  // [Joshen] I think the limit is around 1MB from testing, but its not exactly 1MB it seems
  if (sqlSize > 0.98 * MB) {
    throw new Error('Query is too large to be run via the SQL Editor')
  }

  let headers = new Headers(headersInit)

  let data
  let error

  if (fetcherOverride) {
    const result = await fetcherOverride({ query: sql, headers })
    if ('data' in result) {
      data = result.data
    } else {
      error = result.error
    }
  } else {
    // Use local API route instead of Supabase platform API
    const result = await post('/api/pg-meta/query', {
      signal,
      params: {
        header: {},
        query: {
          key:
            queryKey
              ?.filter((seg) => typeof seg === 'string' || typeof seg === 'number')
              .join('-') ?? '',
        },
      },
      body: { query: sql, disable_statement_timeout: isStatementTimeoutDisabled },
      headers,
    })

    data = result.data
    error = result.error
  }

  if (error) {
    if (
      isRoleImpersonationEnabled &&
      typeof error === 'object' &&
      error !== null &&
      'error' in error &&
      'formattedError' in error
    ) {
      let updatedError = error as { error: string; formattedError: string }

      const regex = /LINE (\d+):/im
      const [, lineNumberStr] = regex.exec(updatedError.error) ?? []
      const lineNumber = Number(lineNumberStr)
      if (!isNaN(lineNumber)) {
        updatedError = {
          ...updatedError,
          error: updatedError.error.replace(
            regex,
            `LINE ${lineNumber - ROLE_IMPERSONATION_SQL_LINE_COUNT}:`
          ),
          formattedError: updatedError.formattedError.replace(
            regex,
            `LINE ${lineNumber - ROLE_IMPERSONATION_SQL_LINE_COUNT}:`
          ),
        }
      }

      error = updatedError as any
    }

    if (handleError !== undefined) return handleError(error as any)
    else handleErrorFetchers(error)
  }

  if (
    isRoleImpersonationEnabled &&
    Array.isArray(data) &&
    data?.[0]?.[ROLE_IMPERSONATION_NO_RESULTS] === 1
  ) {
    return { result: [] as T }
  }

  return { result: data as T }
}

export type ExecuteSqlData = Awaited<ReturnType<typeof executeSql<any[]>>>
export type ExecuteSqlError = ResponseError

/**
 * @deprecated Use the regular useQuery with a function that calls executeSql() instead
 */
export const useExecuteSqlQuery = <TData = ExecuteSqlData>(
  {
    projectRef,
    connectionString,
    sql,
    queryKey,
    handleError,
    isRoleImpersonationEnabled,
  }: ExecuteSqlVariables,
  { enabled = true, ...options }: UseCustomQueryOptions<ExecuteSqlData, ExecuteSqlError, TData> = {}
) => {
  // Note: In standalone mode, we don't need to check project status
  // as we're always connected to a local database
  return useQuery<ExecuteSqlData, ExecuteSqlError, TData>({
    queryKey: sqlKeys.query(projectRef, queryKey ?? [btoa(sql)]),
    queryFn: ({ signal }: { signal?: AbortSignal }) =>
      executeSql(
        { projectRef, connectionString, sql, queryKey, handleError, isRoleImpersonationEnabled },
        signal
      ),
    enabled: enabled,
    staleTime: 0,
    ...options,
 } as any)
}
