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

export default prefetchEditorData
