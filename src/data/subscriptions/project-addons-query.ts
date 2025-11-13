/**
 * Project addons query for Open Studio
 * Cloud-only addon management
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export interface ProjectAddon {
  id: string
  type: string
  variant: string
  enabled: boolean
}

export interface ProjectAddonsVariables {
  projectRef?: string
}

export async function getProjectAddons({
  projectRef,
}: ProjectAddonsVariables): Promise<ProjectAddon[]> {
  // Stub: no addons in local mode
  return []
}

export function useProjectAddonsQuery(
  variables: ProjectAddonsVariables,
  options?: UseQueryOptions<ProjectAddon[], Error>
) {
  return useQuery({
    queryKey: ['project-addons', variables.projectRef],
    queryFn: () => getProjectAddons(variables),
    enabled: Boolean(variables.projectRef),
    ...options,
  })
}
