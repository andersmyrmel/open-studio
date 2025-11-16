/**
 * Type declarations for react-contexify
 */

declare module 'react-contexify' {
  export interface UseContextMenuResult {
    show: (event: any, options?: any) => void
    hideAll: () => void
  }

  export function useContextMenu(options?: any): UseContextMenuResult

  export type TriggerEvent = MouseEvent | TouchEvent | any

  export interface MenuProps {
    id: string
    children: React.ReactNode
    [key: string]: any
  }

  export function Menu(props: MenuProps): JSX.Element
  export function Item(props: any): JSX.Element
  export function Separator(props?: any): JSX.Element
  export function Submenu(props: any): JSX.Element
}
