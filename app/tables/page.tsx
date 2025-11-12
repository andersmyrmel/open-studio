'use client'

import { TableGridEditor } from '@/components/interfaces/TableGridEditor/TableGridEditor'
import { DatabaseLayout } from '@/components/layouts/DatabaseLayout'

export default function TableEditorPage() {
  return (
    <DatabaseLayout page="tables">
      <TableGridEditor />
    </DatabaseLayout>
  )
}
