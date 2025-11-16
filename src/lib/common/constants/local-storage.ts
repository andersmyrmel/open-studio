/**
 * Local Storage Keys for Open-Studio
 * Simplified from Supabase Studio - removed project/org refs for standalone app
 */

export const LOCAL_STORAGE_KEYS = {
  // Sidebar
  SIDEBAR_BEHAVIOR: 'supabase-sidebar-behavior',
  EXPAND_NAVIGATION_PANEL: 'supabase-expand-navigation-panel',
  EDITOR_PANEL_STATE: 'supabase-editor-panel-state',

  // SQL Editor
  SQL_EDITOR_INTELLISENSE: 'supabase_sql-editor-intellisense-enabled',
  SQL_EDITOR_SPLIT_SIZE: 'supabase_sql-editor-split-size',
  SQL_EDITOR_AI_OPEN: 'supabase_sql-editor-ai-open',
  SQL_EDITOR_AI_SCHEMA: (projectRef: string) => `supabase_sql-editor-ai-schema-${projectRef}`,
  SQL_EDITOR_LAST_SELECTED_DB: (projectRef: string) => `sql-editor-last-selected-db-${projectRef}`,
  SQL_EDITOR_SECTION_STATE: 'sql-editor-section-state',
  SQL_EDITOR_SORT: 'sql-editor-sort',
  SQL_EDITOR_SQL_BLOCK_ACKNOWLEDGED: (projectRef: string) => `sql-editor-sql-block-acknowledged-${projectRef}`,

  // Table Editor
  LAST_SELECTED_SCHEMA: (projectRef: string) => `last-selected-schema-${projectRef}`,
  TABLE_QUICKSTART_DISMISSED: 'table-quickstart-dismissed',

  // Schema Visualizer
  SCHEMA_VISUALIZER_POSITIONS: (projectRef: string, schemaId: number) =>
    `schema-visualizer-positions-${projectRef}-${schemaId}`,

  // Log Explorer
  LOG_EXPLORER_SPLIT_SIZE: 'supabase_log-explorer-split-size',

  // Query Performance
  QUERY_PERF_SHOW_BOTTOM_SECTION: 'supabase-query-perf-show-bottom-section',

  // Linter
  LINTER_SHOW_FOOTER: 'supabase-linter-show-footer',

  // Warnings/Dismissals
  GRAPHIQL_RLS_BYPASS_WARNING: 'graphiql-rls-bypass-warning-dismissed',
  CLS_DIFF_WARNING: 'cls-diff-warning-dismissed',
  CLS_SELECT_STAR_WARNING: 'cls-select-star-warning-dismissed',

  // Theme
  TELEMETRY_CONSENT: 'supabase-consent-ph',
  TELEMETRY_DATA: 'supabase-telemetry-data',

  // UI Previews
  UI_PREVIEW_API_SIDE_PANEL: 'supabase-ui-api-side-panel',
  UI_PREVIEW_INLINE_EDITOR: 'supabase-ui-preview-inline-editor',
  UI_PREVIEW_CLS: 'supabase-ui-cls',
  UI_PREVIEW_UNIFIED_LOGS: 'supabase-ui-preview-unified-logs',

  // Command menu
  HOTKEY_COMMAND_MENU: 'supabase-dashboard-hotkey-command-menu',
  HOTKEY_SIDEBAR: (sidebarId: string) => `supabase-dashboard-hotkey-sidebar-${sidebarId}`,

  // Dashboard
  DASHBOARD_HISTORY: (projectRef: string) => `dashboard-history-${projectRef}`,

  // Tabs
  TABS_INTERFACE_ACKNOWLEDGED: 'tabs-interface-acknowledge',
} as const

export type LocalStorageKey = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS]

// Keys that should not be cleared
const LOCAL_STORAGE_KEYS_ALLOWLIST = [
  'graphiql:theme',
  'theme',
  'supabaseDarkMode',
  LOCAL_STORAGE_KEYS.TELEMETRY_CONSENT,
  LOCAL_STORAGE_KEYS.UI_PREVIEW_API_SIDE_PANEL,
  LOCAL_STORAGE_KEYS.UI_PREVIEW_INLINE_EDITOR,
  LOCAL_STORAGE_KEYS.UI_PREVIEW_CLS,
  LOCAL_STORAGE_KEYS.UI_PREVIEW_UNIFIED_LOGS,
  LOCAL_STORAGE_KEYS.LINTER_SHOW_FOOTER,
  LOCAL_STORAGE_KEYS.TABLE_QUICKSTART_DISMISSED,
]

export function clearLocalStorage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    for (const key in localStorage) {
      if (!LOCAL_STORAGE_KEYS_ALLOWLIST.includes(key)) {
        localStorage.removeItem(key)
      }
    }
  }
}
