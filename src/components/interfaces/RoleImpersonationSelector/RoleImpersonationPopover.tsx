/**
 * RoleImpersonationPopover stub for Open Studio
 * UI for switching PostgreSQL roles
 */

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, Button } from '@/lib/ui'

export interface RoleImpersonationPopoverProps {
  serviceRoleLabel?: string
  children?: React.ReactNode
  variant?: string
}

export const RoleImpersonationPopover: React.FC<RoleImpersonationPopoverProps> = ({
  serviceRoleLabel = 'Service Role',
  children,
}) => {
  const defaultButton = <Button variant="outline" as any>Switch Role</Button>
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children || defaultButton}
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Role Impersonation</p>
          <p className="text-xs text-foreground-light">
            Switch between PostgreSQL roles to test permissions
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default RoleImpersonationPopover
