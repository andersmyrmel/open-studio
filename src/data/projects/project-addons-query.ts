/**
 * Project addons query for Open Studio
 * Fetches installed addons/extensions for a project
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export interface ProjectAddon {
  id: string
  name: string
  type: 'extension' | 'integration' | 'wrapper'
  enabled: boolean
  version: string
  settings?: Record<string, any>
}

export interface ProjectAddonsVariables {
  projectRef?: string
}

export async function getProjectAddons({ projectRef }: ProjectAddonsVariables) {
  if (!projectRef) {
    throw new Error('projectRef is required')
  }

  // Stub implementation - in production, this would query project addons
  // For local development, we might want to show common extensions
  return [] as ProjectAddon[]
}

export const projectAddonsKeys = {
  addons: (projectRef: string | undefined) => ['projects', projectRef, 'addons'] as const,
}

export function useProjectAddonsQuery<TData = ProjectAddon[]>(
  { projectRef }: ProjectAddonsVariables,
  options: UseQueryOptions<ProjectAddon[], Error, TData> = {}
) {
  return useQuery<ProjectAddon[], Error, TData>({
    queryKey: projectAddonsKeys.addons(projectRef),
    queryFn: () => getProjectAddons({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
