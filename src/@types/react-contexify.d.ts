/**
 * Type declarations for react-contexify
 */
declare module 'react-contexify' {
  import { ReactNode } from 'react'

  export interface ItemParams<TData = any> {
    id: string | number
    event: MouseEvent | TouchEvent
    props?: TData
    data?: TData
    triggerEvent: MouseEvent | TouchEvent
  }

  export interface MenuProps<TData = any> {
    id: string | number
    children: ReactNode
    animation?: string | false
    theme?: 'light' | 'dark'
  }

  export interface ItemProps<TData = any> {
    id?: string
    children: ReactNode
    onClick?: (args: ItemParams<TData>) => void
    disabled?: boolean | ((args: ItemParams<TData>) => boolean)
    hidden?: boolean | ((args: ItemParams<TData>) => boolean)
    className?: string
  }

  export const Menu: React.FC<MenuProps>
  export const Item: React.FC<ItemProps>
  export const Separator: React.FC
  export const Submenu: React.FC<{ label: ReactNode; children: ReactNode }>

  export function useContextMenu<TData = any>(config?: {
    id: string | number
  }): {
    show: (event: React.MouseEvent | React.TouchEvent, options?: { props?: TData }) => void
    hideAll: () => void
  }
}
