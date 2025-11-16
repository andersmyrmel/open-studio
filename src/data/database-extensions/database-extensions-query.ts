import { useQuery } from '@tanstack/react-query'
import { get, handleError } from 'data/fetchers'
import { useSelectedProjectQuery } from '@/lib/common'
import { PROJECT_STATUS } from 'lib/constants'
import type { ResponseError, UseCustomQueryOptions } from 'types'
import { databaseExtensionsKeys } from './keys'

export interface DatabaseExtension {
  name: string
  schema: string | null
  default_version: string
  installed_version: string | null
  comment: string | null
}

export type DatabaseExtensionsVariables = {
  projectRef?: string
  connectionString?: string | null
}

export async function getDatabaseExtensions(
  { projectRef, connectionString }: DatabaseExtensionsVariables,
  signal?: AbortSignal,
  headersInit?: HeadersInit
) {
  if (!projectRef) throw new Error('projectRef is required')

  let headers = new Headers(headersInit)
  if (connectionString) headers.set('x-connection-encrypted', connectionString)

  const { data, error } = await get('/api/pg-meta/extensions', {
    params: {
      header: {} as any,
      query: {} as any,
    },
    headers,
    signal,
  })

  if (error) handleError(error)
  return data as DatabaseExtension[]
}

export type DatabaseExtensionsData = Awaited<ReturnType<typeof getDatabaseExtensions>>
export type DatabaseExtensionsError = ResponseError

export const useDatabaseExtensionsQuery = <TData = DatabaseExtensionsData>(
  { projectRef, connectionString }: DatabaseExtensionsVariables,
  {
    enabled = true,
    ...options
  }: UseCustomQueryOptions<DatabaseExtensionsData, DatabaseExtensionsError, TData> = {}
) => {
  const { data: project } = useSelectedProjectQuery()
  const isActive = project?.status === PROJECT_STATUS.ACTIVE_HEALTHY

  return useQuery<DatabaseExtensionsData, DatabaseExtensionsError, TData>({
    queryKey: databaseExtensionsKeys.list(projectRef),
    queryFn: ({ signal }: { signal?: AbortSignal }) => getDatabaseExtensions({ projectRef, connectionString }, signal),
    enabled: enabled && typeof projectRef !== 'undefined' && isActive,
    ...options,
 } as any)
}
