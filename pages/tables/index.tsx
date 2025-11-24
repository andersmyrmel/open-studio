import { TableGridEditor } from '@/components/interfaces/TableGridEditor/TableGridEditor'
import { DatabaseLayout } from '@/components/layouts/DatabaseLayout'

export default function TableEditorPage() {
  return (
    <DatabaseLayout page="tables">
      <TableGridEditor />
    </DatabaseLayout>
  )
}

// Disable static generation since this page uses router hooks
export const getServerSideProps = async () => {
  return {
    props: {},
  }
}
