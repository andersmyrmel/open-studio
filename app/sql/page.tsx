'use client'

import { SQLEditor } from '@/components/interfaces/SQLEditor/SQLEditor'
import { DatabaseLayout } from '@/components/layouts/DatabaseLayout'

export default function SQLEditorPage() {
  return (
    <DatabaseLayout page="sql-editor">
      <SQLEditor />
    </DatabaseLayout>
  )
}
