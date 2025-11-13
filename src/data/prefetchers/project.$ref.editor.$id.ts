/**
 * Prefetcher for project editor route
 * Pre-loads data for the editor view
 */

import type { QueryClient } from '@tanstack/react-query'
import { prefetchTableEditor } from 'data/table-editor/table-editor-query'

export interface EditorPrefetchParams {
  projectRef: string
  connectionString?: string
  id: number
}

export async function prefetchEditorData(
  queryClient: QueryClient,
  { projectRef, connectionString, id }: EditorPrefetchParams
) {
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
