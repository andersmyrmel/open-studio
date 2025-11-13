/**
 * Table stub for Open Studio
 * Legacy table component (to be replaced with modern table components)
 */

import React from 'react'
import { cn } from '@/lib/utils'

interface TableProps {
  className?: string
  head?: React.ReactNode[]
  body?: React.ReactNode[]
  children?: React.ReactNode
  bordered?: boolean
  borderless?: boolean
}

interface TableSubComponentProps {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  colSpan?: number
  rowSpan?: number
  align?: 'left' | 'center' | 'right'
  style?: React.CSSProperties
}

const TableHead: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <thead className="bg-muted/50">{children}</thead>
}

const TableBody: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>
}

const TableRow: React.FC<TableSubComponentProps> = ({ className, children, onClick, style }) => {
  return (
    <tr
      className={cn(
        'border-b transition-colors hover:bg-muted/50',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </tr>
  )
}

const TableHeaderCell: React.FC<TableSubComponentProps> = ({
  className,
  children,
  colSpan,
  rowSpan,
  align = 'left',
  style,
}) => {
  return (
    <th
      className={cn(
        'h-10 px-4 text-left align-middle font-medium text-muted-foreground',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={style}
    >
      {children}
    </th>
  )
}

const TableDataCell: React.FC<TableSubComponentProps> = ({
  className,
  children,
  colSpan,
  rowSpan,
  align = 'left',
  style,
}) => {
  return (
    <td
      className={cn(
        'p-4 align-middle',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={style}
    >
      {children}
    </td>
  )
}

const Table: React.FC<TableProps> & {
  th: typeof TableHeaderCell
  tr: typeof TableRow
  td: typeof TableDataCell
  thead: typeof TableHead
  tbody: typeof TableBody
} = ({ className, head, body, children, bordered = true, borderless = false }) => {
  return (
    <div className="w-full overflow-auto">
      <table
        className={cn(
          'w-full caption-bottom text-sm',
          bordered && !borderless && 'border',
          className
        )}
      >
        {head && head.length > 0 && (
          <TableHead>
            <TableRow>{head}</TableRow>
          </TableHead>
        )}
        {body && body.length > 0 && <TableBody>{body}</TableBody>}
        {children}
      </table>
    </div>
  )
}

Table.th = TableHeaderCell
Table.tr = TableRow
Table.td = TableDataCell
Table.thead = TableHead
Table.tbody = TableBody

export default Table
