/**
 * Content ID query stub for Open Studio
 * Fetches content by ID
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface Content {
  id: string
  name: string
  type: 'sql' | 'report' | 'chart'
  content: {
    content_id: string
    sql: string
    schema?: string
    favorite?: boolean
    chart?: any
  }
  created_at: string
  updated_at: string
  title?: string
  chart?: any
}

export const contentKeys = {
  detail: (projectRef: string | undefined, id: string | undefined) =>
    ['projects', projectRef, 'content', id].filter(Boolean) as const,
}

export interface ContentByIdVariables {
  projectRef?: string
  id?: string
}

export async function getContentById({ projectRef, id }: ContentByIdVariables) {
  if (!projectRef || !id) throw new Error('projectRef and id are required')

  // Stub: return null for local mode
  return null as Content | null
}

export function useContentByIdQuery<TData = Content | null>(
  { projectRef, id }: ContentByIdVariables,
  options?: UseQueryOptions<Content | null, Error, TData>
) {
  return useQuery({
    queryKey: contentKeys.detail(projectRef, id),
    queryFn: () => getContentById({ projectRef, id }),
    enabled: Boolean(projectRef && id),
    ...options,
  })
}
