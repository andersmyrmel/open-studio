import { useQuery } from '@tanstack/react-query'
import { get, handleError } from 'data/fetchers'
import { useSelectedProjectQuery } from '@/lib/common'
import { PROJECT_STATUS } from 'lib/constants'
import type { ResponseError, UseCustomQueryOptions } from 'types'
import { databasePoliciesKeys } from './keys'

export type DatabasePoliciesVariables = {
  projectRef?: string
  connectionString?: string | null
  schema?: string
}

export async function getDatabasePolicies(
  { projectRef, connectionString, schema }: DatabasePoliciesVariables,
  signal?: AbortSignal,
  headersInit?: HeadersInit
) {
  if (!projectRef) throw new Error('projectRef is required')

  let headers = new Headers(headersInit)
  if (connectionString) headers.set('x-connection-encrypted', connectionString)

  const { data, error } = await get('/api/pg-meta/policies', {
    params: {
      header: {} as any,
      query: {
        included_schemas: schema || '',
      } as any,
    },
    headers,
    signal,
  })

  if (error) handleError(error)
  return data
}

export type DatabasePoliciesData = Awaited<ReturnType<typeof getDatabasePolicies>>
export type DatabasePoliciesError = ResponseError

export const useDatabasePoliciesQuery = <TData = DatabasePoliciesData>(
  { projectRef, connectionString, schema }: DatabasePoliciesVariables,
  {
    enabled = true,
    ...options
  }: UseCustomQueryOptions<DatabasePoliciesData, DatabasePoliciesError, TData> = {}
) => {
  const { data: project } = useSelectedProjectQuery()
  const isActive = project?.status === PROJECT_STATUS.ACTIVE_HEALTHY

  return useQuery<DatabasePoliciesData, DatabasePoliciesError, TData>({
    queryKey: databasePoliciesKeys.list(projectRef, schema),
    queryFn: ({ signal }) => getDatabasePolicies({ projectRef, connectionString, schema }, signal),
    enabled: enabled && typeof projectRef !== 'undefined' && isActive,
    ...options,
  })
}
