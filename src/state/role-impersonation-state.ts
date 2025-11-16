/**
 * Role Impersonation State for Open Studio
 * Minimal implementation - role impersonation is optional for local PostgreSQL
 */

import React from 'react'
import { proxy, useSnapshot } from 'valtio'
import type { ImpersonationRole } from 'lib/role-impersonation'

export type RoleImpersonationState = {
  role?: ImpersonationRole
  claims?: Record<string, any>
}

// Create a simple valtio state
export const roleImpersonationState = proxy<RoleImpersonationState>({
  role: undefined,
  claims: undefined,
})

// Export type alias for compatibility with lib/role-impersonation.ts
export type ValtioRoleImpersonationState = RoleImpersonationState

export const useRoleImpersonationStateSnapshot = (
  options?: Parameters<typeof useSnapshot>[1]
) => {
  return useSnapshot(roleImpersonationState, options)
}

export const isRoleImpersonationEnabled = (role?: string | ImpersonationRole): boolean => {
  // For local PostgreSQL, role impersonation is optional
  // Return false by default to keep things simple
  if (!role) return false
  if (typeof role === 'string') return role.length > 0
  return true
}

export const useGetImpersonatedRoleState = () => {
  // Return a function that gets the current role state from the proxy directly
  return () => roleImpersonationState.role
}

export const setRoleImpersonation = (role?: ImpersonationRole, claims?: Record<string, any>) => {
  roleImpersonationState.role = role
  roleImpersonationState.claims = claims
}

export const clearRoleImpersonation = () => {
  roleImpersonationState.role = undefined
  roleImpersonationState.claims = undefined
}

// Subscribe to impersonated role changes
export const useSubscribeToImpersonatedRole = (callback: (role?: ImpersonationRole) => void) => {
  const snap = useRoleImpersonationStateSnapshot()

  // Call callback when role changes
  React.useEffect(() => {
    callback(snap.role)
  }, [snap.role, callback])
}
