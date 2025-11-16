/**
 * Sidebar Manager State for Open Studio
 * Manages sidebar visibility and active panels
 */

import { proxy, useSnapshot } from 'valtio'

export type SidebarKey = string

export type SidebarManagerState = {
  activeSidebar: SidebarKey | null
  isOpen: boolean
}

// Create a simple valtio state
export const sidebarManagerState = proxy<SidebarManagerState>({
  activeSidebar: null,
  isOpen: false,
})

export const useSidebarManagerSnapshot = (
  options?: Parameters<typeof useSnapshot>[1]
) => {
  const snap = useSnapshot(sidebarManagerState, options)

  return {
    ...snap,
    openSidebar: (key: SidebarKey) => {
      sidebarManagerState.activeSidebar = key
      sidebarManagerState.isOpen = true
    },
    closeSidebar: (key?: SidebarKey) => {
      sidebarManagerState.isOpen = false
      sidebarManagerState.activeSidebar = null
    },
    toggleSidebar: (key?: SidebarKey) => {
      if (key && sidebarManagerState.activeSidebar === key) {
        sidebarManagerState.isOpen = !sidebarManagerState.isOpen
      } else if (key) {
        sidebarManagerState.activeSidebar = key
        sidebarManagerState.isOpen = true
      } else {
        sidebarManagerState.isOpen = !sidebarManagerState.isOpen
      }
    },
  }
}
