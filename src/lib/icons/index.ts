/**
 * Icon exports using lucide-react as replacement for custom icons package
 *
 * This module maps Supabase Studio's custom icons to lucide-react equivalents
 * for use in the standalone database UI.
 */

// Re-export lucide-react icons with Supabase naming
export {
  User,
  Database,
  Table as TableEditor,
  FileCode as SqlEditor,
  Settings,
  Home,
  Code as InsertCode,
  Replace as ReplaceCode,
  FileText as Logs,
  BarChart as Reports,
  Plug as Integrations,
  AlertCircle as Sentry,
  Activity as Datadog,
  PieChart as Grafana,
  Server as Postgres,
} from 'lucide-react'

// For any other icon needs, re-export the entire lucide-react library
export * from 'lucide-react'
