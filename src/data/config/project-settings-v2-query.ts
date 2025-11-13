/**
 * Project settings query stub for Open Studio
 */

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'

export interface ProjectSettings {
  projectRef: string
  [key: string]: any
}

export const projectSettingsKeys = {
  projectSettings: (projectRef: string) => ['project-settings', projectRef] as const,
}

export interface ProjectSettingsVariables {
  projectRef?: string
}

export async function getProjectSettings({ projectRef }: ProjectSettingsVariables) {
  if (!projectRef) throw new Error('projectRef is required')

  // Stub: return empty settings for local mode
  return {} as ProjectSettings
}

export function useProjectSettingsQuery<TData = ProjectSettings>(
  { projectRef }: ProjectSettingsVariables,
  options?: UseQueryOptions<ProjectSettings, Error, TData>
) {
  return useQuery({
    queryKey: projectSettingsKeys.projectSettings(projectRef!),
    queryFn: () => getProjectSettings({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
