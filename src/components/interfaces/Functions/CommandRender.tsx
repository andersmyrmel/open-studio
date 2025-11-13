/**
 * CommandRender stub for Open Studio
 * Renders shell commands for documentation
 */

import React from 'react'
import { cn } from '@/lib/utils'

export interface CommandRenderProps {
  command?: string
  commands?: string[]
  className?: string
}

export const CommandRender: React.FC<CommandRenderProps> = ({
  command,
  commands,
  className,
}) => {
  const cmds = commands || (command ? [command] : [])

  return (
    <div className={cn('rounded-md bg-muted p-4 font-mono text-sm', className)}>
      {cmds.map((cmd, index) => (
        <div key={index} className="text-foreground">
          <span className="text-foreground-lighter select-none">$ </span>
          {cmd}
        </div>
      ))}
    </div>
  )
}

export default CommandRender
