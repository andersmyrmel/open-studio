/**
 * Replicas utilities for Open Studio
 * Helper functions for database replica management
 */

export interface Replica {
  id: string
  identifier: string
  region: string
  status: 'active' | 'provisioning' | 'failed' | 'offline'
  size: string
  inserted_at: string
}

export type ReplicaStatus = Replica['status']

export const REPLICA_STATUS_LABELS: Record<ReplicaStatus, string> = {
  active: 'Active',
  provisioning: 'Provisioning',
  failed: 'Failed',
  offline: 'Offline',
}

export const REPLICA_STATUS_COLORS: Record<
  ReplicaStatus,
  'green' | 'yellow' | 'red' | 'gray'
> = {
  active: 'green',
  provisioning: 'yellow',
  failed: 'red',
  offline: 'gray',
}

export function getReplicaStatusLabel(status: ReplicaStatus): string {
  return REPLICA_STATUS_LABELS[status] ?? status
}

export function getReplicaStatusColor(status: ReplicaStatus): string {
  return REPLICA_STATUS_COLORS[status] ?? 'gray'
}

export function isReplicaReady(replica: Replica): boolean {
  return replica.status === 'active'
}

export function getReplicaConnectionString(replica: Replica, password: string): string {
  // Stub implementation - in production, this would generate proper connection string
  return `postgresql://postgres:${password}@${replica.identifier}.supabase.co:5432/postgres`
}

export function sortReplicasByStatus(replicas: Replica[]): Replica[] {
  const statusOrder: Record<ReplicaStatus, number> = {
    active: 0,
    provisioning: 1,
    offline: 2,
    failed: 3,
  }

  return [...replicas].sort((a, b) => {
    const orderDiff = statusOrder[a.status] - statusOrder[b.status]
    if (orderDiff !== 0) return orderDiff
    return new Date(b.inserted_at).getTime() - new Date(a.inserted_at).getTime()
  })
}
