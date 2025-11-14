/**
 * LayoutSidebarProvider stub for Open Studio
 * Sidebar state management and key constants
 */

import React, { createContext, useContext, useState } from 'react'

export const SIDEBAR_KEYS = {
  SQL_EDITOR: 'sql-editor',
  TABLE_EDITOR: 'table-editor',
  DATABASE: 'database',
  EXTENSIONS: 'extensions',
  INTEGRATIONS: 'integrations',
  MIGRATIONS: 'migrations',
  FUNCTIONS: 'functions',
  TRIGGERS: 'triggers',
  HOOKS: 'hooks',
  PUBLICATIONS: 'publications',
  INDEXES: 'indexes',
  SETTINGS: 'settings',
  AI_ASSISTANT: 'ai-assistant',
  EDITOR_PANEL: 'editor-panel',
} as const

export type SidebarKey = (typeof SIDEBAR_KEYS)[keyof typeof SIDEBAR_KEYS]

interface LayoutSidebarContextValue {
  activeKey: SidebarKey | null
  setActiveKey: (key: SidebarKey | null) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const LayoutSidebarContext = createContext<LayoutSidebarContextValue | undefined>(undefined)

export interface LayoutSidebarProviderProps {
  children: React.ReactNode
  defaultKey?: SidebarKey | null
}

export const LayoutSidebarProvider: React.FC<LayoutSidebarProviderProps> = ({
  children,
  defaultKey = null,
}) => {
  const [activeKey, setActiveKey] = useState<SidebarKey | null>(defaultKey)
  const [isOpen, setIsOpen] = useState(true)

  return (
    <LayoutSidebarContext.Provider
      value={{
        activeKey,
        setActiveKey,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </LayoutSidebarContext.Provider>
  )
}

export const useLayoutSidebar = () => {
  const context = useContext(LayoutSidebarContext)
  if (!context) {
    throw new Error('useLayoutSidebar must be used within LayoutSidebarProvider')
  }
  return context
}

export default LayoutSidebarProvider
