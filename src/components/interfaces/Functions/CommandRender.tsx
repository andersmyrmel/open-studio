/**
 * CommandRender stub for Open Studio
 */

import React from 'react'

export interface CommandRenderProps {
  command?: string
  description?: string
}

export const CommandRender: React.FC<CommandRenderProps> = ({ command, description }) => {
  return (
    <div className="font-mono text-sm">
      <div>{command}</div>
      {description && <div className="text-gray-500">{description}</div>}
    </div>
  )
}

export default CommandRender
