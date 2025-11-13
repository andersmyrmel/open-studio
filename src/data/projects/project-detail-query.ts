/**
 * Project detail query for Open Studio
 * Fetches detailed project information including metadata and configuration
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export interface ProjectDetail {
  id: string
  ref: string
  name: string
  organization_id: string
  region: string
  status: 'active' | 'inactive' | 'paused'
  database_version: string
  created_at: string
  updated_at: string
  metadata: {
    cloud_provider: string
    db_host: string
    db_name: string
    db_port: number
    db_user: string
  }
  settings: {
    db_ssl: boolean
    auto_api_service: boolean
  }
}

export interface ProjectDetailVariables {
  projectRef?: string
}

export async function getProjectDetail({ projectRef }: ProjectDetailVariables) {
  if (!projectRef) {
    throw new Error('projectRef is required')
  }

  // Stub implementation - in production, this would fetch from cloud API
  return {
    id: projectRef,
    ref: projectRef,
    name: 'Open Studio Project',
    organization_id: 'local-org',
    region: 'local',
    status: 'active',
    database_version: '15.1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    metadata: {
      cloud_provider: 'local',
      db_host: 'localhost',
      db_name: 'postgres',
      db_port: 5432,
      db_user: 'postgres',
    },
    settings: {
      db_ssl: false,
      auto_api_service: true,
    },
  } as ProjectDetail
}

export const projectDetailKeys = {
  detail: (projectRef: string | undefined) => ['projects', projectRef, 'detail'] as const,
}

export function useProjectDetailQuery<TData = ProjectDetail>(
  { projectRef }: ProjectDetailVariables,
  options: UseQueryOptions<ProjectDetail, Error, TData> = {}
) {
  return useQuery<ProjectDetail, Error, TData>({
    queryKey: projectDetailKeys.detail(projectRef),
    queryFn: () => getProjectDetail({ projectRef }),
    enabled: Boolean(projectRef),
    ...options,
  })
}
