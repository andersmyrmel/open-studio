/**
 * Deployment commit query for Open Studio
 * Fetches commit information for deployments
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { executeSql } from 'data/sql/execute-sql-query'

export interface DeploymentCommit {
  id: string
  commit_sha: string
  commit_message: string
  branch: string
  author: string
  created_at: string
}

export interface DeploymentCommitVariables {
  projectRef?: string
  connectionString?: string
  deploymentId?: string
}

export async function getDeploymentCommit({
  projectRef,
  connectionString,
  deploymentId,
}: DeploymentCommitVariables) {
  if (!deploymentId) {
    throw new Error('deploymentId is required')
  }

  // Stub implementation - in production, this would query deployment metadata
  return {
    id: deploymentId,
    commit_sha: 'stub-sha',
    commit_message: 'Stub deployment',
    branch: 'main',
    author: 'stub-author',
    created_at: new Date().toISOString(),
  } as DeploymentCommit
}

export const deploymentCommitKeys = {
  deploymentCommit: (projectRef: string | undefined, deploymentId: string | undefined) =>
    ['projects', projectRef, 'deployments', deploymentId, 'commit'] as const,
}

export function useDeploymentCommitQuery<TData = DeploymentCommit>(
  { projectRef, connectionString, deploymentId }: DeploymentCommitVariables,
  options: UseQueryOptions<DeploymentCommit, Error, TData> = {}
) {
  return useQuery<DeploymentCommit, Error, TData>({
    queryKey: deploymentCommitKeys.deploymentCommit(projectRef, deploymentId),
    queryFn: () => getDeploymentCommit({ projectRef, connectionString, deploymentId }),
    enabled: Boolean(projectRef && deploymentId),
    ...options,
  })
}
