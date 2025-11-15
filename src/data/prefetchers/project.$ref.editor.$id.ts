/**
 * Prefetcher for project editor route
 * Pre-loads data for the editor view
 */

import type { QueryClient } from '@tanstack/react-query'
import { prefetchTableEditor } from 'data/table-editor/table-editor-query'

export interface EditorPrefetchParams {
  queryClient: QueryClient
  projectRef: string
  connectionString?: string
  id: number
}

export async function prefetchEditorData(
  params: EditorPrefetchParams
): Promise<void>
export async function prefetchEditorData(
  queryClient: QueryClient,
  params: { projectRef: string; connectionString?: string; id: number }
): Promise<void>
export async function prefetchEditorData(
  queryClientOrParams: QueryClient | EditorPrefetchParams,
  paramsOrUndefined?: { projectRef: string; connectionString?: string; id: number }
) {
  // Support both calling conventions
  let queryClient: QueryClient
  let projectRef: string
  let connectionString: string | undefined
  let id: number

  if (paramsOrUndefined) {
    // Called as: prefetchEditorData(queryClient, { projectRef, connectionString, id })
    queryClient = queryClientOrParams as QueryClient
    projectRef = paramsOrUndefined.projectRef
    connectionString = paramsOrUndefined.connectionString
    id = paramsOrUndefined.id
  } else {
    // Called as: prefetchEditorData({ queryClient, projectRef, connectionString, id })
    const params = queryClientOrParams as EditorPrefetchParams
    queryClient = params.queryClient
    projectRef = params.projectRef
    connectionString = params.connectionString
    id = params.id
  }

  // Prefetch table editor data for faster loading
  await prefetchTableEditor(queryClient, {
    projectRef,
    connectionString,
    id,
  })
}

// Link generator for editor table pages
export interface EditorTablePageLinkParams {
  projectRef: string
  id: number
  schema?: string
  table?: string
  href?: string
  children?: React.ReactNode
  filters?: Array<{ column: string; operator: string; value: string }>
}

export function EditorTablePageLink({
  projectRef,
  id,
  schema,
  table,
}: EditorTablePageLinkParams): string {
  let path = `/project/${projectRef}/editor/${id}`
  if (schema && table) {
    path += `?schema=${encodeURIComponent(schema)}&table=${encodeURIComponent(table)}`
  }
  return path
}

export default prefetchEditorData

// Alias for backwards compatibility
export const prefetchEditorTablePage = prefetchEditorData
