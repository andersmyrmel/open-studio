# Open Studio - Missing Code Extraction Plan

## Overview
This document catalogs all missing dependencies from the Supabase monorepo that need to be extracted for Open Studio to function properly.

**Source Repository:** https://github.com/supabase/supabase
**Studio Location:** apps/studio/
**Packages Location:** packages/

---

## Current Status

### What We Have ✅
- Next.js App Router structure (`/app`)
- Basic application code (`/src`)
- Core data queries for:
  - `src/data/database/` (schemas, functions, triggers, extensions, roles, policies)
  - `src/data/tables/` (table CRUD operations)
  - `src/data/sql/` (SQL execution)
- Grid components (`src/components/grid/`)
- SQL Editor & Table Editor UI components
- PostgreSQL metadata APIs

### What's Missing ❌
- **1,353 TypeScript module errors**
- **26 files** importing from `data/table-editor/*`
- **46 files** importing from `ui-patterns` package
- **16 files** importing from `data/table-rows/*`
- Plus many other data layer, lib, hooks, state, and component imports

---

## Extraction Categories

## 1. CRITICAL - Core Data Layer (HIGH PRIORITY)

### 1.1 Table Editor Data Layer
**Location:** `apps/studio/data/table-editor/`
**Files Needed:**
- `keys.ts`
- `table-editor-query-sql.ts`
- `table-editor-query.ts`
- `table-editor-types.ts`

**Used By:** 26 files
**Impact:** Table editing functionality completely broken

### 1.2 Table Rows Data Layer
**Location:** `apps/studio/data/table-rows/`
**Files Needed:**
- `get-cell-value-mutation.ts`
- `keys.ts`
- `table-row-create-mutation.ts`
- `table-row-delete-all-mutation.ts`
- `table-row-delete-mutation.tsx`
- `table-row-truncate-mutation.ts`
- `table-row-update-mutation.ts`
- `table-rows-count-query.ts`
- `table-rows-query.ts`
- `utils.ts`

**Used By:** 16 files
**Impact:** Cannot read/write table data

### 1.3 SQL Execution
**Location:** `apps/studio/data/sql/`
**Files Needed:**
- `execute-sql-query.ts` (62 imports!)
- `execute-sql-mutation.ts`
- `ongoing-queries-query.ts`
- `abort-query-mutation.ts`
- `utils/transaction.ts`

**Used By:** 62+ files
**Impact:** SQL Editor non-functional

---

## 2. HIGH PRIORITY - UI Packages

### 2.1 UI Patterns Package
**Location:** `packages/ui-patterns/`
**Type:** Full npm package
**Used By:** 46+ files

**Structure:**
```
packages/ui-patterns/
├── src/
│   ├── Dialogs/
│   │   ├── ConfirmationModal/
│   │   ├── TextConfirmModal/
│   │   └── ConfirmDialog/
│   ├── DataInputs/
│   │   └── Input/
│   ├── form/
│   │   ├── FormItemLayout/
│   │   └── Layout/FormLayout/
│   ├── ShimmeringLoader/
│   ├── ComputeBadge/
│   ├── MultiSelectDeprecated/
│   ├── info-tooltip.tsx
│   └── admonition.tsx
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

**Most Used Components:**
- `ConfirmationModal` (16 imports)
- `Input` (6 imports)
- `FormItemLayout/FormLayout` (5 imports)
- `TextConfirmModal` (4 imports)
- `ShimmeringLoader` (4 imports)
- `admonition` (base component)
- `info-tooltip`

### 2.2 Base UI Package
**Location:** `packages/ui/`
**Type:** Full npm package
**Dependency:** Required by ui-patterns

**Structure:**
```
packages/ui/src/
├── components/
│   ├── shadcn/ui/
│   │   ├── table/
│   │   ├── hover-card/
│   │   ├── badge/
│   │   └── tooltip/
│   ├── Button/
│   ├── Modal/
│   └── CodeBlock/
├── layout/
├── lib/
└── types/
```

**Status:** May already be using shadcn/ui via our own @/lib/ui - needs verification

---

## 3. MEDIUM PRIORITY - Component Dependencies

### 3.1 Custom UI Components
**Location:** `apps/studio/components/ui/`

**Files Needed (24+ imports):**
- `ButtonTooltip.tsx` (24 imports)
- `ShimmeringLoader.tsx` (19 imports)
- `AlertError.tsx` (13 imports)
- `DocsButton.tsx` (9 imports)
- `SchemaSelector.tsx` (8 imports)
- `FilterPopover.tsx`
- `SqlWarningAdmonition.tsx`
- `ErrorBoundary/ClientSideExceptionHandler.tsx`
- `QueryBlock/QueryBlock.tsx`
- `EditorPanel/EditorPanel.tsx`
- `ProjectSettings/` (multiple files)
- `OrganizationProjectSelector.tsx`
- `TwoOptionToggle.tsx`
- `InformationBox.tsx`
- `CodeEditor/CodeEditor.tsx`
- `NoSearchResults.tsx`
- `DatabaseSelector.tsx`
- `CopyButton.tsx`
- `DropdownMenuItemTooltip.tsx`
- `GridFooter.tsx`
- `InlineLink.tsx`
- `Charts/` (BarChart, AreaChart, ChartHeader, NoDataPlaceholder)

### 3.2 Grid Components
**Location:** `apps/studio/components/grid/`

**Missing:**
- `hooks/useTableSort.ts` (5 imports)
- `hooks/useTableFilter.ts` (5 imports)
- `constants.ts` (5 imports)
- `utils/gridColumns.ts` (3 imports)
- `utils/column.ts` (1 import)

---

## 4. MEDIUM PRIORITY - State Management

### 4.1 State Files
**Location:** `apps/studio/state/`

**Files Needed:**
- `table-editor-table.tsx` (21 imports)
- `sql-editor-v2.ts` (17 imports)
- `table-editor.tsx` (12 imports)
- `role-impersonation-state.ts` (10 imports)
- `sidebar-manager-state.ts` (8 imports)
- `database-selector.ts` (6 imports)
- `ai-assistant-state.ts` (6 imports)
- `tabs.ts` (5 imports)
- `app-state.ts`
- `editor-panel-state.ts`

**Note:** Most state management uses Valtio (already installed)

---

## 5. MEDIUM PRIORITY - Library Utilities

### 5.1 Core Lib Files
**Location:** `apps/studio/lib/`

**Files Needed:**
- `constants.ts` (43 imports!)
- `helpers.ts` (28 imports)
- `profile.ts` (8 imports)
- `role-impersonation.ts` (6 imports)
- `formatSql.ts` (5 imports)
- `void.ts` (3 imports)
- `cloudprovider-utils.ts`
- `pg-format.ts`
- `semver.ts`
- `sql-event-parser.ts`
- `telemetry/track.ts`
- `constants/infrastructure.ts`

### 5.2 Lib UI Files
**Location:** `apps/studio/lib/ui/`

**Files Needed:**
- `Input/Input.tsx`
- Other UI utilities

### 5.3 Lib Utilities
**Location:** `apps/studio/lib/utils/`

**Files Needed:**
- `cn.ts` (40+ imports for classname utilities)
- `randomIdGenerator.ts`

### 5.4 Lib Layout
**Location:** `apps/studio/lib/Layout/`

**Files Needed:**
- `FormLayout/FormLayout.tsx`
- `InputIconContainer.tsx`
- `InputErrorIcon.tsx`

### 5.5 Lib Theme
**Location:** `apps/studio/lib/theme/`

**Files Needed:**
- `styleHandler.ts` (15 imports)
- `defaultTheme.ts`

---

## 6. LOW PRIORITY - Additional Data Queries

### 6.1 Missing Data Queries
**Location:** `apps/studio/data/`

**Directories/Files:**
- `entity-types/` (keys.ts, entity-type-constants.ts, entity-types-infinite-query.ts)
- `enumerated-types/` (CRUD mutations)
- `foreign-tables/` (keys.ts, foreign-tables-query.ts)
- `fdw/` (fdws-query.ts)
- `views/` (keys.ts, views-query.ts)
- `materialized-views/` (materialized-views-query.ts)
- `privileges/` (column/table privilege queries and mutations)
- `content/` (SQL snippets and folders)
- `lint/` (keys.ts, lint-query.ts)
- `telemetry/` (send-event-mutation.ts)
- `config/` (various project config queries)
- `auth/` (users-infinite-query.ts)
- `api-keys/` (API key queries and mutations)
- `analytics/` (usage and monitoring queries)
- `read-replicas/` (replicas-query.ts, utils)
- `organizations/` (organizations-query.ts)
- `projects/` (project-detail-query.ts, keys.ts)
- `subscriptions/` (billing-related queries)
- `oauth/` (authorized-apps-query.ts)
- `integrations/` (Vercel, AWS redirects)
- `edge-functions/` (edge-functions-query.ts)
- `logs/` (unified-logs-facet-count-query.ts)
- `usage/` (resource-warnings, org-usage)
- `jwt-signing-keys/` (legacy-jwt-signing-key-query.ts)
- `vault/` (keys.ts)
- `ai/` (sql-title-mutation.ts)
- `utils/` (error-check.ts, deployment-commit-query.ts)
- `query-client.ts` (2 imports - may already exist)
- `api.d.ts` (TypeScript definitions for API)

---

## 7. LOW PRIORITY - Hooks

### 7.1 Custom Hooks
**Location:** `apps/studio/hooks/`

**Files Needed:**
- `useProtectedSchemas.ts` (15 imports)
- `ui/useUrlState.ts` (5 imports)
- `ui/useHotKey.ts` (5 imports)
- `ui/useCsvFileDrop.ts`
- `ui/useCopyToClipboard.ts`
- `ui/useClickedOutside.ts`
- `analytics/useLogsQuery.ts`
- `custom-content/useCustomContent.ts`

---

## 8. LOW PRIORITY - Additional Components

### 8.1 Interface Components
**Location:** `apps/studio/components/interfaces/`

**Directories Needed:**
- `Support/SupportLink.tsx` (8 imports)
- `Integrations/Queues/` (utils, components)
- `Integrations/Wrappers/` (types, utils, constants)
- `Settings/Logs/` (multiple files, DatePickers, UpgradePrompt, types, constants)
- `Settings/Infrastructure/`
- `TableGridEditor/` (partial - many missing utils and types)
- `SQLEditor/` (partial - missing hooks, utils, types, components)
- `Database/` (partial - some components missing)
- `Reports/` (v2 filters, blocks, constants)
- `Billing/Subscription/` (utils)
- `RoleImpersonationSelector/`
- `Functions/CommandRender.tsx`
- `Connect/DatabaseSettings.utils.ts`
- `App/FeaturePreview/`
- `Account/Preferences/`
- `UnifiedLogs/` (types)
- `Markdown/`
- `AIAssistantPanel/`
- `AIEditor/`

### 8.2 Layout Components
**Location:** `apps/studio/components/layouts/`

**Files Needed:**
- `ProjectLayout/LayoutSidebar/LayoutSidebarProvider.tsx` (9 imports)
- `Tabs/ActionCard.tsx`

### 8.3 To-Be-Cleaned Components
**Location:** `apps/studio/components/to-be-cleaned/`

**Files Needed:**
- `Table/` (6 imports)
- `NoSearchResults.tsx` (2 imports)
- `ProductEmptyState.tsx` (3 imports)

---

## 9. OPTIONAL - Cloud-Only Features (Can Skip)

### 9.1 Cloud Services
**Remove/Stub These:**
- Sentry error reporting (`@sentry/nextjs` - 4 imports)
- AI features (OpenAI, assistant chat)
- Telemetry/analytics
- Billing/subscriptions
- OAuth integrations
- Edge functions
- Vercel/AWS integrations
- Read replicas
- Usage monitoring
- Organization management

---

## 10. EXTERNAL NPM PACKAGES

### 10.1 Missing Packages to Install
```json
{
  "dependencies": {
    "nuqs": "^1.x",
    "react-dnd": "^16.x",
    "react-dnd-html5-backend": "^16.x",
    "awesome-debounce-promise": "^2.x",
    "recharts": "^2.x",
    "date-fns": "^2.x",
    "react-beautiful-dnd": "^13.x",
    "react-day-picker": "^8.x",
    "react-syntax-highlighter": "^15.x",
    "react-contexify": "^6.x",
    "react-inlinesvg": "^4.x",
    "react-accessible-treeview": "^2.x",
    "reactflow": "^11.x",
    "prism-react-renderer": "^2.x",
    "remark-gfm": "^3.x",
    "pg-minify": "^1.x",
    "input-otp": "^1.x",
    "html-to-image": "^1.x",
    "http-status": "^1.x",
    "mime-db": "^1.x",
    "markdown-table": "^3.x",
    "common-tags": "^1.x",
    "formik": "^2.x",
    "@hookform/resolvers": "^3.x",
    "@dagrejs/dagre": "^1.x",
    "@number-flow/react": "^0.x"
  },
  "devDependencies": {
    "vitest": "^1.x",
    "@testing-library/react": "^14.x"
  }
}
```

---

## Extraction Strategy

### Phase 1: Core Functionality (Days 1-2)
**Goal:** Get basic table viewing and SQL execution working

1. **Data Layer - Table Operations**
   - Extract `data/table-editor/` (4 files)
   - Extract `data/table-rows/` (11 files)
   - Extract `data/sql/execute-sql-query.ts`

2. **Essential Libraries**
   - Extract `lib/constants.ts`
   - Extract `lib/helpers.ts`
   - Extract `lib/utils/cn.ts`

3. **Missing npm packages**
   - Install: `nuqs`, `awesome-debounce-promise`

### Phase 2: UI Components (Days 3-4)
**Goal:** Get UI rendering properly

1. **UI Patterns Package**
   - Extract entire `packages/ui-patterns/` package
   - Set up as local package in `src/packages/ui-patterns/`
   - Focus on: Dialogs, DataInputs, ShimmeringLoader, admonition

2. **Custom UI Components**
   - Extract `components/ui/ButtonTooltip.tsx`
   - Extract `components/ui/ShimmeringLoader.tsx`
   - Extract `components/ui/AlertError.tsx`
   - Extract grid utilities (hooks, constants)

3. **Missing npm packages**
   - Install: `react-dnd`, `react-dnd-html5-backend`

### Phase 3: State Management (Day 5)
**Goal:** Get interactive features working

1. **State Files**
   - Extract `state/table-editor-table.tsx`
   - Extract `state/sql-editor-v2.ts`
   - Extract `state/table-editor.tsx`
   - Extract `state/tabs.ts`

2. **Lib Files**
   - Extract `lib/formatSql.ts`
   - Extract `lib/profile.ts` (stub cloud features)
   - Extract `lib/theme/styleHandler.ts`

### Phase 4: Polish & Complete (Days 6-7)
**Goal:** Fill remaining gaps

1. **Additional Queries**
   - Extract entity-types, enumerated-types, views, fdw
   - Extract constraints, privileges queries

2. **Hooks**
   - Extract useProtectedSchemas, useUrlState, useHotKey

3. **Component Cleanup**
   - Fix remaining import errors
   - Stub out cloud-only features

### Phase 5: Testing & Cleanup (Day 8)
**Goal:** Verify everything works

1. Run typecheck - should have 0 errors
2. Test SQL Editor fully functional
3. Test Table Editor fully functional
4. Remove dead code and unused imports
5. Document what was extracted vs stubbed

---

## File Count Estimates

| Category | Files | Lines of Code (est) |
|----------|-------|---------------------|
| Data Layer | ~80 | ~8,000 |
| UI Patterns Package | ~40 | ~5,000 |
| Custom UI Components | ~35 | ~3,500 |
| State Management | ~10 | ~1,500 |
| Library Utilities | ~20 | ~2,500 |
| Hooks | ~10 | ~1,000 |
| Additional Components | ~30 | ~3,000 |
| **TOTAL** | **~225** | **~24,500** |

---

## Risk Assessment

### High Risk (Blocker if not done)
- ✅ `data/table-editor/` - 26 files depend on it
- ✅ `data/table-rows/` - 16 files depend on it
- ✅ `data/sql/execute-sql-query.ts` - 62 files depend on it
- ✅ `ui-patterns` package - 46 files depend on it
- ✅ `lib/constants.ts` - 43 files depend on it

### Medium Risk (Errors but may be non-blocking)
- `lib/helpers.ts` - 28 files
- `state/table-editor-table.tsx` - 21 files
- `ui-patterns` specific components

### Low Risk (Can stub or skip)
- Cloud-only features (AI, billing, telemetry)
- Admin features (user management, org settings)
- Advanced monitoring and logs

---

## Notes

1. **Package Strategy**: Extract `ui-patterns` as a local package in `src/packages/ui-patterns/` rather than copying files directly
2. **Cloud Features**: Many imports are for cloud-only features (billing, AI, telemetry) - these can be stubbed with empty implementations
3. **Auth/Permissions**: All permission checks can be stubbed to return `true` for local use
4. **Type Safety**: Priority is getting code running, then fixing types iteratively
5. **Testing**: Extract test files only if needed for understanding component behavior

---

## Success Criteria

✅ **Project Compiles** - `npm run typecheck` passes with 0 errors
✅ **SQL Editor Works** - Can write and execute SQL queries
✅ **Table Editor Works** - Can view, edit, add, delete rows
✅ **Navigation Works** - Sidebar navigation between database features
✅ **Dev Server Runs** - `npm run dev` starts without errors
✅ **No Missing Modules** - All imports resolve correctly

---

## Timeline Estimate

**Optimistic:** 5-6 days (if files extract cleanly)
**Realistic:** 8-10 days (accounting for dependency issues)
**Pessimistic:** 12-15 days (if significant refactoring needed)

---

*Document created: 2025-11-13*
*Last updated: 2025-11-13*
