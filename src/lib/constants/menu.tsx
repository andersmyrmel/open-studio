import { Database, FileCode, Grid3x3, Zap, AlertCircle, Users, Package, Shield } from 'lucide-react'
import type { ProductMenuGroup } from '@/components/ui/ProductMenu/ProductMenu.types'

export const DATABASE_MENU: ProductMenuGroup[] = [
  {
    title: 'EDITOR',
    key: 'editor',
    items: [
      {
        name: 'SQL Editor',
        key: 'sql-editor',
        url: '/sql',
        icon: <FileCode className="h-4 w-4" />,
        pages: ['sql', 'sql-editor'],
      },
    ],
  },
  {
    title: 'DATABASE',
    key: 'database',
    items: [
      {
        name: 'Tables',
        key: 'tables',
        url: '/tables',
        icon: <Database className="h-4 w-4" />,
        pages: ['tables', 'table-editor'],
      },
      {
        name: 'Schemas',
        key: 'schemas',
        url: '/database/schemas',
        icon: <Grid3x3 className="h-4 w-4" />,
        pages: ['database-schemas'],
      },
      {
        name: 'Functions',
        key: 'functions',
        url: '/database/functions',
        icon: <Zap className="h-4 w-4" />,
        pages: ['database-functions'],
      },
      {
        name: 'Triggers',
        key: 'triggers',
        url: '/database/triggers',
        icon: <AlertCircle className="h-4 w-4" />,
        pages: ['database-triggers'],
      },
      {
        name: 'Extensions',
        key: 'extensions',
        url: '/database/extensions',
        icon: <Package className="h-4 w-4" />,
        pages: ['database-extensions'],
      },
      {
        name: 'Roles',
        key: 'roles',
        url: '/database/roles',
        icon: <Users className="h-4 w-4" />,
        pages: ['database-roles'],
      },
      {
        name: 'Policies',
        key: 'policies',
        url: '/database/policies',
        icon: <Shield className="h-4 w-4" />,
        pages: ['database-policies'],
      },
    ],
  },
]
