# Supabase Monorepo Extraction Analysis for Open-Studio

**Date:** 2025-11-13
**Project:** Open-Studio - Lightweight PostgreSQL UI
**Source:** Supabase Monorepo (https://github.com/supabase/supabase)

This document provides a comprehensive analysis of the Supabase monorepo and identifies all files required to extract the database editor and query interface for Open-Studio.

---

## Table of Contents

1. [Overview](#overview)
2. [Supabase Monorepo Structure](#supabase-monorepo-structure)
3. [Core Studio Application Files](#i-core-studio-application-files)
4. [Data Layer & API Integration](#ii-data-layer--api-integration)
5. [Shared Packages from Monorepo](#iii-shared-packages-from-monorepo)
6. [State Management](#iv-state-management)
7. [Custom Hooks](#v-custom-hooks)
8. [Utility Libraries](#vi-utility-libraries)
9. [UI Components](#vii-ui-components)
10. [Layouts](#viii-layouts)
11. [Type Definitions](#ix-type-definitions)
12. [Pages & Routing](#x-pages--routing)
13. [API Routes](#xi-api-routes)
14. [Configuration Files](#xii-configuration-files)
15. [Styling](#xiii-styling)
16. [Static Assets](#xiv-static-assets)
17. [Docker Configuration](#xv-docker-configuration)
18. [Documentation & Metadata](#xvi-documentation--metadata)
19. [Files to Exclude](#files-to-exclude-supabase-cloud-dependencies)
20. [Replacement Requirements](#replacement-requirements)
21. [Estimated File Counts](#estimated-file-counts)
22. [Extraction Workflow](#extraction-workflow-recommendation)

---

## Overview

Open-Studio aims to extract and refactor Supabase Studio's database editor and query interface into a standalone local web application. This requires:

- **Retaining:** Database editor and query interface components
- **Configuring:** Docker-based local hosting
- **Replacing:** Supabase backend with lightweight Node.js/pg layer
- **Removing:** Authentication, storage, and cloud dependencies

---

## Supabase Monorepo Structure

The Supabase repository is a **pnpm monorepo** with the following structure:

### Root-Level Directories:
- **apps/** - Application projects (6 main applications)
- **packages/** - Reusable packages and libraries (13 packages)
- **blocks/vue/** - Vue component blocks
- **docker/** - Docker configuration files
- **e2e/studio/** - End-to-end tests for Studio
- **examples/** - Example projects
- **i18n/** - Internationalization files
- **scripts/** - Utility and build scripts
- **supabase/** - Core Supabase configuration

### Supabase Studio Location

**Location:** `/apps/studio`

**Main Directories:**
- **components/** - React UI components
- **data/** - Data layer and API handling (85 subdirectories)
- **pages/** - Next.js page routes
- **hooks/** - Custom React hooks
- **lib/** - Utility libraries and helpers
- **state/** - State management (18 state files)
- **types/** - TypeScript type definitions
- **public/** - Static assets
- **styles/** - CSS and styling
- **fonts/** - Custom font files

**Technology Stack:**
- TypeScript (66.3%), MDX (29.1%), JavaScript (3.4%)
- Framework: Next.js with React
- Build Tool: Turbopack (dev), Webpack (production)
- Styling: Tailwind CSS with CSS variables
- State: TanStack Query (React Query)
- Editor: Monaco Editor
- Dev Server: Port 8082

---

## I. CORE STUDIO APPLICATION FILES

### A. SQL Editor Interface

**Source:** `/apps/studio/components/interfaces/SQLEditor/`

**All Files Required:**
- `SQLEditor.tsx` - Main SQL editor component
- `MonacoEditor.tsx` - Monaco editor integration
- `InlineWidget.tsx` - Inline editing features
- `AskAIWidget.tsx` - AI assistance (optional)
- `OngoingQueriesPanel.tsx` - Active query tracking
- `SQLEditor.constants.ts` - Configuration constants
- `SQLEditor.queries.ts` - TanStack Query hooks
- `SQLEditor.types.ts` - TypeScript definitions
- `SQLEditor.utils.ts` - Helper functions
- `hooks.ts` - Custom React hooks
- `useAddDefinitions.ts` - Schema definition hooks

**Modals/Dialogs:**
- `DownloadSnippetModal.tsx`
- `MoveQueryModal.tsx`
- `RenameQueryModal.tsx`
- `RunQueryWarningModal.tsx`

**Subdirectories (Complete):**
- `SQLTemplates/` - SQL query templates
- `UtilityPanel/` - Utility panel with results display

---

### B. Table/Grid Editor Interface

**Source:** `/apps/studio/components/interfaces/TableGridEditor/`

**All Files Required:**
- `TableGridEditor.tsx` - Main grid editor component
- `GridHeaderActions.tsx` - Toolbar and actions
- `TableDefinition.tsx` - Table structure display
- `DeleteConfirmationDialogs.tsx` - Safety confirmations
- `ViewEntityAutofixSecurityModal.tsx` - Security validation
- `TableEntity.utils.ts` - Entity manipulation logic
- `TableEntity.utils.test.ts` - Unit tests

**Subdirectories (Complete):**
- `SidePanelEditor/` - Side panel editing functionality

---

### C. Database Schema Browser

**Source:** `/apps/studio/components/interfaces/Database/`

**Required Subdirectories (for database management):**
- `Schemas/` - Schema management
- `Tables/` - Table management
  - `ColumnList.tsx`
  - `TableList.tsx`
  - `Tables.utils.ts`
- `Functions/` - Stored procedures
- `Triggers/` - Database triggers
- `Indexes/` - Index management
- `Views/` - View management
- `Extensions/` - PostgreSQL extensions
- `Roles/` - Database roles
- `Privileges/` - Permission management
- `EnumeratedTypes/` - Custom enum types
- `Hooks/` - Database hooks
- `Migrations/` - Migration tools
- `Publications/` - Replication publications

**Optional (Advanced Features):**
- `ETL/` - Extract, Transform, Load
- `Backups/` - Backup management

**Key Files:**
- `ProtectedSchemaWarning.tsx`

**Related Component:**

**Source:** `/apps/studio/components/interfaces/SchemaVisualizer/`
- `index.tsx` - Visual schema diagram

---

### D. Data Grid Component

**Source:** `/apps/studio/components/grid/`

**Core Files (All Required):**
- `SupabaseGrid.tsx` - Primary grid component
- `SupabaseGrid.utils.ts` - Grid utilities
- `MsSqlValidation.tsx` - SQL validation
- `constants.ts` - Grid constants

**Subdirectories (Complete):**

1. **components/** - All grid UI subcomponents
   - `common/` - Shared utilities
   - `editor/` - Cell editors
     - `TextEditor.tsx`
     - `NumberEditor.tsx`
     - `BooleanEditor.tsx`
     - `DateTimeEditor.tsx`
     - `JsonEditor.tsx`
     - `SelectEditor.tsx`
     - `TimeEditor.tsx`
   - `footer/` - Pagination and footer
   - `formatter/` - Data formatters
     - `DefaultFormatter.tsx`
     - `JsonFormatter.tsx`
     - `BooleanFormatter.tsx`
     - `ForeignKeyFormatter.tsx`
     - `BinaryFormatter.tsx`
     - `ReferenceRecordPeek.tsx`
   - `grid/` - Core grid rendering
   - `header/` - Column headers and filtering
   - `menu/` - Context menus

2. **hooks/** - Custom hooks
   - `useTableFilter.ts` - Filter management (URL-based)
   - `useTableSort.ts` - Sort management (URL-based)

3. **types/** - TypeScript definitions

4. **utils/** - Utility functions
   - `column.ts` - Column utilities
   - `common.ts` - Shared helpers
   - `gridColumns.tsx` - Column configuration
   - `types.ts` - Type definitions

---

## II. DATA LAYER & API INTEGRATION

### A. Data Fetching Infrastructure

**Source:** `/apps/studio/data/`

**Core Files (Required):**
- `fetchers.ts` - OpenAPI fetch client with middleware
- `api.d.ts` - TypeScript API type definitions
- `query-client.ts` - React Query client configuration

**Architecture:**
- Uses `openapi-fetch` for type-safe API calls
- TanStack Query for state management & caching
- Retry logic with exponential backoff
- Rate limit awareness (Retry-After header support)

---

### B. Database-Related Data Modules

**Source:** `/apps/studio/data/` (subdirectories)

**Required Directories (Complete Extraction):**
- `sql/` - SQL query execution
- `tables/` - Table metadata & CRUD
- `table-rows/` - Row-level operations
- `table-editor/` - Table editor logic
- `database/` - Database metadata
- `database-columns/` - Column metadata
- `database-functions/` - Function metadata
- `database-triggers/` - Trigger metadata
- `database-policies/` - RLS policies
- `database-roles/` - Database roles
- `database-extensions/` - Extensions
- `database-indexes/` - Index management
- `database-publications/` - Publications
- `database-cron-jobs/` - Scheduled jobs (optional)
- `database-queues/` - Job queues (optional)
- `views/` - View management
- `materialized-views/` - Materialized views
- `foreign-tables/` - Foreign data wrappers
- `fdw/` - Foreign data wrapper utilities
- `enumerated-types/` - Custom types
- `entity-types/` - Entity type definitions
- `lint/` - SQL linting

**Each directory typically contains:**
- Query hooks (`*-query.ts`)
- Mutation hooks (`*-mutation.ts`)
- Cache keys (`keys.ts`)
- Utilities (`utils.ts`)

**TanStack Query Configuration:**
- Stale time: 60 seconds
- Retry strategy: 3 attempts max
- Automatic retry on 5xx errors
- Skip retries on 4xx errors (except 429 rate limits)
- Exponential backoff: 1s, 2s, 4s (max 30s)

---

## III. SHARED PACKAGES FROM MONOREPO

### A. PostgreSQL Metadata Package

**Source:** `/packages/pg-meta/`

**Extract Complete Package:**

**All TypeScript Modules:**
- `pg-meta-tables.ts` - Table metadata
- `pg-meta-columns.ts` - Column metadata
- `pg-meta-schemas.ts` - Schema management
- `pg-meta-roles.ts` - Role data
- `pg-meta-functions.ts` - Function metadata
- `pg-meta-indexes.ts` - Index operations
- `pg-meta-views.ts` - View handling
- `pg-meta-materialized-views.ts` - Materialized views
- `pg-meta-triggers.ts` - Trigger management
- `pg-meta-policies.ts` - Policy metadata
- `pg-meta-extensions.ts` - Extension info
- `pg-meta-types.ts` - Type definitions
- `pg-meta-privileges.ts` - Permissions

**Subdirectories:**
- `pg-format/` - Formatting utilities
- `query/` - Query functionality
- `sql/` - SQL operations

**Dependencies:**
- `pg` - PostgreSQL client
- `postgres-array` - Array utilities
- `zod` - Schema validation

**Critical:** This package enables direct PostgreSQL metadata access without cloud dependencies.

---

### B. UI Component Library

**Source:** `/packages/ui/`

**Extract Complete Package (45+ Components):**

**Form & Input:**
- Accordion
- Alert
- Button
- Card
- Checkbox
- Input
- InputNumber
- Radio
- Select
- Toggle

**Layout:**
- Breadcrumb
- Collapsible
- Modal
- Popover
- SidePanel
- Tabs
- TreeView
- Typography

**Navigation:**
- Menu
- NavMenu
- TextLink

**Data Display:**
- AnimatedCounter
- CodeBlock
- Loading
- LoadingLine
- LogoLoader

**Specialized:**
- Form
- Icon
- Image
- KeyboardShortcut
- Listbox
- PrePostTab
- ShadowScrollArea
- SimpleCodeBlock
- Space
- ThemeProvider

**Subdirectory:**
- `shadcn/` - Community components

**Build Files:**
- `build/css/` - Compiled CSS
- `package.json` - Component dependencies

---

### C. UI Patterns (Selective)

**Source:** `/packages/ui-patterns/`

**Required Components:**
- `PrivacySettings/` (if needed)
- Any composite patterns used by database interfaces

**Note:** No barrel file - import from specific paths

---

### D. Icons Package

**Source:** `/packages/icons/`

**Extract Complete Package:**
- All icon assets
- Icon components
- `package.json`

---

### E. Utility Packages

**Source:** `/packages/`

**Required Packages (Complete):**
- `common/` - Shared utilities
- `shared-data/` - Shared data structures
- `api-types/` - TypeScript API types
- `config/` - Configuration management
- `tsconfig/` - TypeScript configs
- `eslint-config-supabase/` - Linting standards

**Optional:**
- `generator/` - Code generation tools
- `ai-commands/` - AI-related utilities
- `build-icons/` - Icon building tools

---

## IV. STATE MANAGEMENT

**Source:** `/apps/studio/state/`

**Framework:** Valtio (lightweight reactive state)

**Required State Files:**
- `app-state.ts` (2.3KB) - Core application state
- `sql-editor-v2.ts` (12.7KB) - SQL editor state
  - Query text & execution
  - Query history
  - Results view
  - Editor preferences
- `table-editor.tsx` (6.6KB) - Table editor state
  - Table definition
  - Column editing
  - Row editing
  - Filter & sort
- `table-editor-table.tsx` (7.7KB) - Grid-specific state
  - Selection state
  - Pagination state
- `database-selector.tsx` - Database selection & switching
- `database-settings.tsx` - Database settings & preferences
- `tabs.tsx` (15.2KB) - Tab management
  - Open tabs
  - Tab switching
  - Tab history
- `sidebar-manager-state.tsx` (4.5KB) - Sidebar management
  - Expand/collapse
  - Navigation state
- `side-panels.ts` - Side panel visibility
- `editor-panel-state.tsx` - Editor panel state

---

## V. CUSTOM HOOKS

### A. Data Fetching Hooks

**Source:** `/apps/studio/data/`

Each feature directory contains TanStack Query hooks:
- Query hooks (READ operations)
- Mutation hooks (CREATE, UPDATE, DELETE operations)
- `keys.ts` files for query key management

### B. UI Hooks

**Source:** `/apps/studio/hooks/ui/`

**Common Hooks to Extract:**
- `useHotKey.ts` - Keyboard shortcuts
- `useClickedOutside.ts` - Click outside detection
- `useUrlState.ts` - URL-based state management
- `useCsvFileDrop.ts` - CSV file drag & drop
- `useCopyToClipboard.ts` - Clipboard operations

### C. Miscellaneous Hooks

**Source:** `/apps/studio/hooks/misc/`

**Important Hooks:**
- `useLocalStorage.ts` - Local storage state
- `useDashboardHistory.ts` - Navigation history
- `useLints.ts` - SQL linting
- `useHideSidebar.ts` - Sidebar toggle
- `useTableEditorFiltersSort.ts` - Grid filtering/sorting
- `useSchemasForAi.ts` - Schema extraction for AI
- `useSchemaQueryState.ts` - Schema query state
- `useStateTransition.ts` - Async state transitions

### D. Database-Specific Hooks

**Source:** `/apps/studio/hooks/`

**Individual Hooks:**
- `useProtectedSchemas.ts` - Protected schema detection
- `use-check-latest-deploy.tsx`
- `useSupabaseClientQuery.ts` (may need adaptation)

---

## VI. UTILITY LIBRARIES

**Source:** `/apps/studio/lib/`

### Core Utilities (All Required)

**Database & SQL:**
- `formatSql.ts` (0.4KB) - SQL formatting
- `sql-parameters.ts` (3.4KB) - SQL parameter handling
- `sql-event-parser.ts` (3.8KB) - SQL event parsing
- `pg-format.ts` (1.8KB) - PostgreSQL formatting
- `pingPostgrest.ts` (0.9KB) - Connection testing

**Data Processing:**
- `helpers.ts` (10.5KB) - General helper functions
- `type-helpers.ts` - TypeScript helper types
- `base64url.ts` (7.4KB) - Base64 URL encoding
- `sanitize.ts` (6.4KB) - Input sanitization
- `semver.ts` (3.3KB) - Version comparison
- `mime.ts` (0.5KB) - MIME type utilities
- `isNonNullable.ts` (0.5KB) - Null checks

**Infrastructure:**
- `error-reporting.ts` (3.3KB) - Error handling
- `http-status-codes.ts` (0.7KB) - HTTP status constants
- `ringBuffer.ts` (2KB) - Ring buffer implementation
- `role-impersonation.ts` (5.3KB) - Role switching
- `void.ts` - No-op utilities
- `breadcrumbs.ts` - Navigation helpers

### Subdirectories

**Source:** `/apps/studio/lib/`

**Required:**
- `constants/` - All constant definitions
  - UI components
  - Database features
  - Configuration values
  - Feature flags
- `common/` - Common business logic utilities
- `ui/` - UI-specific helper functions
- `config/` - Application configuration
- `icons/` - Icon library and helpers

**Optional (Cloud-Dependent):**
- `api/` - API communications (adapt for local use)
- `auth.tsx` - Authentication (remove or replace)
- `gotrue.ts` - GoTrue client (remove)
- `cloudprovider-utils.ts` - Cloud provider integration (remove)
- `integration-utils.ts` - Third-party integrations (remove)
- `posthog.ts` - Analytics (remove)
- `telemetry/` - Monitoring (remove)
- `upload.ts` - File uploads (adapt if needed)

---

## VII. UI COMPONENTS

**Source:** `/apps/studio/components/ui/`

**79 Reusable Components**

### Required Directories (Complete Extraction)

**Data Visualization:**
- `Charts/` - Chart components
  - `AreaChart/`
  - `BarChart/`
  - `ComposedChart/`
  - `StackedAreaChart/`
- `SingleStat/` - Single statistic display
- `SparkBar/` - Sparkline bar chart

**Code & Editing:**
- `CodeEditor/` - Code editor with syntax highlighting
- `SqlEditor/` - SQL editor utilities
- `DiffViewer/` - Diff viewer

**Data Display:**
- `DataTable/` - Advanced table component suite
- `VirtualizedTable/` - Virtualized table for large datasets
- `InfiniteList/` - Infinite scrolling list

**Forms & Input:**
- `Forms/` - Form components
- `DatePicker/` - Date/time picker
- `FilterPopover/` - Filter popover
- `PasswordStrengthBar/` - Password strength indicator

**Selection & Navigation:**
- `DatabaseSelector/` - Database selection
- `SchemaSelector/` - Schema selection
- `SchemaComboBox/` - Schema combo box
- `OrganizationProjectSelector/` - Project selector (adapt/remove)

**Layout & Structure:**
- `Panel/` - Panel components
- `ActionCard/` - Action cards
- `CardButton/` - Card buttons
- `FeaturePreviewSidebarPanel/` - Feature preview panel

**Utility Components:**
- `CopyButton/` - Copy to clipboard button
- `ErrorBoundary/` - Error handling
- `EmptyListState/` - Empty state display
- `Logs/` - Log viewer

**Project-Specific (may need adaptation):**
- `ProjectSettings/` - Settings components
- `Resource/` - Resource components
- `AIAssistantPanel/` - AI assistant (optional)
- `AIEditor/` - AI editor (optional)

---

## VIII. LAYOUTS

**Source:** `/apps/studio/components/layouts/`

**Required:**
- `DatabaseLayout.tsx` - Main database application layout
- Any other relevant layout components that structure the database interface

---

## IX. TYPE DEFINITIONS

**Source:** `/apps/studio/types/`

**All Files Required (7 Files):**
- `base.ts` - Foundation types
- `form.ts` - Form types
- `index.ts` - Main exports
- `next.ts` - Next.js types
- `react-query.ts` - React Query types
- `ui.ts` - UI component types
- `userContent.ts` - User content types

**Additional Type Files:**
- `/apps/studio/components/grid/types/` - Grid-specific types

---

## X. PAGES & ROUTING

**Source:** `/apps/studio/pages/` (if using Pages Router)

**Required Pages:**
- `project/[ref]/sql/` - SQL editor page
- `project/[ref]/editor/` - Table editor page
- `project/[ref]/database/` - Database management pages
  - `tables/` - Tables page
  - `functions/` - Functions page
  - `triggers/` - Triggers page
  - `extensions/` - Extensions page
  - `roles/` - Roles page
  - `publications/` - Publications page
  - `indexes/` - Indexes page
  - `types/` - Types page
- `_app.tsx` - App component (if using Pages Router)
- `_document.tsx` - Document component (if using Pages Router)

**Note:** If using Next.js App Router (`/app/` directory), these would be restructured:
- `/app/sql/page.tsx` - SQL editor
- `/app/tables/page.tsx` - Table editor
- `/app/database/*/page.tsx` - Database pages
- `/app/layout.tsx` - Root layout
- `/app/page.tsx` - Landing page

---

## XI. API ROUTES

**Source:** `/apps/studio/pages/api/` or `/app/api/`

### Database-Related API Routes

**Note:** Most Supabase API routes connect to cloud services and would need to be **replaced** with custom Next.js API routes that use `pg` library directly.

**Create Custom Routes:**
```
/app/api/pg-meta/
├── query/route.ts          # Execute SQL queries
├── schemas/route.ts        # List schemas
├── tables/route.ts         # List/manage tables
├── functions/route.ts      # List/manage functions
├── triggers/route.ts       # List/manage triggers
├── extensions/route.ts     # List extensions
├── roles/route.ts          # List roles
└── policies/route.ts       # List RLS policies
```

**Query Execution API Example:**
**Endpoint:** `POST /api/pg-meta/query`

**Request:**
```typescript
{
  query: string;
  disable_statement_timeout?: boolean;
}
```

**Response:**
```typescript
{
  success: boolean;
  data?: any[];
  rowCount?: number;
  error?: string;
}
```

---

## XII. CONFIGURATION FILES

### A. Next.js Configuration

**Source:** `/apps/studio/next.config.js`

**Required Settings to Extract:**
- Standalone output configuration
- Security headers (X-Frame-Options, CSP, HSTS)
- Monaco Editor tree-shaking config
- Image optimization settings
- Webpack/Turbopack configuration
- TypeScript/ESLint settings

**Remove:**
- Sentry integration
- Supabase-specific redirects
- Cloud-specific settings
- Platform deployment configs

**Example Configuration:**
```javascript
module.exports = {
  output: 'standalone',          // Docker optimization
  telemetry: { disabled: true }, // No tracking
  reactStrictMode: true,
  swcMinify: true,              // Minification
  // Monaco Editor optimization
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },
};
```

---

### B. Tailwind CSS Configuration

**Source:** `/apps/studio/tailwind.config.js`

**Complete File Required:**

**Key Features:**
- Custom colors (CSS variable-based theming)
- Custom font sizes (`grid: 13px`)
- Custom animations (shimmer, sway)
- Plugins (`@tailwindcss/container-queries`)
- Content paths (update for standalone structure)

**Example:**
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // CSS variable-based colors
      },
      fontSize: {
        grid: '13px',
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        sway: 'sway 3s infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
};
```

---

### C. TypeScript Configuration

**Source:**
- `/apps/studio/tsconfig.json`
- `/packages/tsconfig/`

**Required:**
- Complete TypeScript configuration
- Path aliases configuration (`@/*` mapping)
- Compiler options
- Include/exclude patterns

**Example:**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

### D. Package Configuration

**Source:** `/apps/studio/package.json`

**Dependencies to Extract (Database-Focused):**

**Core Framework:**
```json
{
  "next": "15.3.1",
  "react": "18.3.1",
  "react-dom": "18.3.1",
  "typescript": "5.6.3"
}
```

**Database & Queries:**
```json
{
  "pg": "8.13.1",
  "@tanstack/react-query": "4.35.7",
  "@tanstack/react-query-devtools": "4.35.7",
  "@tanstack/react-table": "8.21.3",
  "@tanstack/react-virtual": "3.13.12",
  "openapi-fetch": "0.12.5"
}
```

**Editor:**
```json
{
  "@monaco-editor/react": "4.6.0",
  "monaco-editor": "0.52.2",
  "sql-formatter": "15.0.0"
}
```

**UI & Styling:**
```json
{
  "tailwindcss": "3.4.1",
  "@radix-ui/react-accordion": "*",
  "@radix-ui/react-dialog": "*",
  "@radix-ui/react-dropdown-menu": "*",
  "@radix-ui/react-tooltip": "*",
  "lucide-react": "0.436.0",
  "@heroicons/react": "2.1.3",
  "sonner": "1.5.0",
  "framer-motion": "11.11.17",
  "@headlessui/react": "1.7.17"
}
```

**Grid:**
```json
{
  "react-data-grid": "7.0.0-beta.41"
}
```

**Forms & Validation:**
```json
{
  "react-hook-form": "7.45.0",
  "zod": "3.23.8",
  "yup": "1.4.0"
}
```

**State Management:**
```json
{
  "valtio": "2.0.0",
  "use-debounce": "7.0.1",
  "next-themes": "0.3.0"
}
```

**Utilities:**
```json
{
  "lodash": "4.17.21",
  "uuid": "9.0.1",
  "dayjs": "1.11.10",
  "papaparse": "5.3.1",
  "file-saver": "2.0.5",
  "react-markdown": "8.0.3",
  "immutability-helper": "3.1.1",
  "clsx": "1.2.1",
  "tailwind-merge": "1.13.2",
  "class-variance-authority": "0.6.1"
}
```

**Drag & Drop:**
```json
{
  "@dnd-kit/core": "6.3.0",
  "@dnd-kit/sortable": "8.0.0",
  "@dnd-kit/modifiers": "9.0.0",
  "@dnd-kit/utilities": "3.2.2"
}
```

**Other:**
```json
{
  "react-error-boundary": "4.0.13",
  "react-intersection-observer": "9.5.3",
  "@uidotdev/usehooks": "2.4.1",
  "react-use": "17.5.0"
}
```

**Development:**
```json
{
  "eslint": "8.57.1",
  "prettier": "3.0.0",
  "vitest": "*"
}
```

**Remove (Supabase-Specific):**
- `@supabase/supabase-js`
- `@supabase/auth-helpers-*`
- `stripe`
- `@ai-sdk/openai`
- `@ai-sdk/amazon-bedrock`
- `posthog-js`
- `@sentry/nextjs`

---

### E. ESLint Configuration

**Source:**
- `/apps/studio/.eslintrc.json`
- `/packages/eslint-config-supabase/`

**Required:**
- ESLint configuration
- Supabase ESLint config (adapt for standalone)

**Example:**
```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "@next/next/no-html-link-for-pages": "off"
  }
}
```

---

### F. Prettier Configuration

**Source:** `/apps/studio/.prettierrc`

**Complete File Required**

**Example:**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

### G. PostCSS Configuration

**Source:** `/apps/studio/postcss.config.js`

**Complete File Required:**

**Example:**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## XIII. STYLING

### Style Files

**Source:** `/apps/studio/styles/`

**All Style Files Required:**
- Global styles
- Component-specific styles
- CSS variables for theming
- Tailwind CSS customizations

### Font Files

**Source:** `/apps/studio/fonts/`

**All Font Files Required:**
- Custom font files (if any)
- Font face declarations

---

## XIV. STATIC ASSETS

**Source:** `/apps/studio/public/`

**Required:**
- Images
- Icons
- Logos
- Favicons
- Any other static assets used by database interfaces

**Note:** Remove cloud-specific assets, marketing materials, etc.

---

## XV. DOCKER CONFIGURATION

### Dockerfile

**Create Custom Dockerfile:**

**Multi-Stage Build Example:**
```dockerfile
# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

### Docker Compose

**Create docker-compose.yml:**

```yaml
version: '3.8'

services:
  open-studio:
    build: .
    ports:
      - "8080:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3000
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Include PostgreSQL for testing
  # postgres:
  #   image: postgres:15
  #   environment:
  #     - POSTGRES_PASSWORD=postgres
  #   ports:
  #     - "5432:5432"
  #   volumes:
  #     - postgres_data:/var/lib/postgresql/data

# volumes:
#   postgres_data:
```

### .dockerignore

**Create .dockerignore:**
```
node_modules
.next
.git
.env
.env.local
README.md
```

---

## XVI. DOCUMENTATION & METADATA

**Files to Create/Adapt:**

1. **README.md** - Project overview, quick start, features
2. **ARCHITECTURE.md** - Technical architecture details
3. **SETUP.md** - Setup and deployment guide
4. **CONTRIBUTING.md** - Contribution guidelines
5. **SECURITY.md** - Security considerations
6. **ROADMAP.md** - Development roadmap (optional)
7. **PLAN.md** - Implementation plan (optional)
8. **LICENSE** - Apache 2.0 license
9. **.gitignore** - Git ignore patterns
10. **.env.example** - Environment variable template

**Environment Variables (.env.example):**
```env
# Database Connection
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Server Configuration
PORT=3000
NODE_ENV=development

# Optional
NEXT_TELEMETRY_DISABLED=1
HOST_PORT=8080
```

---

## FILES TO EXCLUDE (Supabase Cloud Dependencies)

### A. Authentication & Access Control

**Remove:**
- `/apps/studio/data/auth/`
- `/apps/studio/data/access-tokens/`
- `/apps/studio/data/api-keys/`
- `/apps/studio/data/api-authorization/`
- `/apps/studio/data/jwt-signing-keys/`
- `/apps/studio/data/oauth/`
- `/apps/studio/data/oauth-secrets/`
- `/apps/studio/data/oauth-server-apps/`
- `/apps/studio/data/sso/`
- `/apps/studio/data/third-party-auth/`
- `/apps/studio/lib/auth.tsx`
- `/apps/studio/lib/gotrue.ts`

### B. Cloud Platform Management

**Remove:**
- `/apps/studio/data/projects/`
- `/apps/studio/data/organizations/`
- `/apps/studio/data/organization-members/`
- `/apps/studio/data/branches/`
- `/apps/studio/data/read-replicas/`
- `/apps/studio/data/custom-domains/`
- `/apps/studio/data/network-restrictions/`
- `/apps/studio/data/ssl-enforcement/`
- `/apps/studio/lib/cloudprovider-utils.ts`

### C. Storage Service

**Remove:**
- `/apps/studio/data/storage/`
- `/apps/studio/hooks/storage/`
- `/apps/studio/components/interfaces/Storage/`

### D. Realtime Service

**Remove:**
- `/apps/studio/data/realtime/`
- `/apps/studio/components/interfaces/Realtime/`

### E. Edge Functions

**Remove:**
- `/apps/studio/data/edge-functions/`
- `/apps/studio/pages/api/edge-functions/`
- `/apps/studio/components/interfaces/EdgeFunctions/`

### F. GraphQL (Optional - Can Include)

**Remove (unless keeping GraphQL):**
- `/apps/studio/data/graphql/`
- `/apps/studio/components/interfaces/GraphQL/`

### G. Billing & Subscriptions

**Remove:**
- `/apps/studio/data/invoices/`
- `/apps/studio/data/subscriptions/`
- `/apps/studio/data/stripe/`
- `/apps/studio/components/interfaces/Billing/`

### H. Analytics & Telemetry

**Remove:**
- `/apps/studio/lib/posthog.ts`
- `/apps/studio/lib/telemetry/`
- `/apps/studio/data/analytics/`

### I. Integration Platform

**Remove:**
- `/apps/studio/data/integrations/`
- `/apps/studio/pages/integrations/`
- `/apps/studio/static-data/integrations/`
- `/apps/studio/lib/integration-utils.ts`

### J. Vault & Secrets

**Remove:**
- `/apps/studio/data/vault/`
- `/apps/studio/data/secrets/`

### K. Support & Feedback

**Remove:**
- `/apps/studio/data/support/`
- `/apps/studio/data/feedback/`
- `/apps/studio/data/reports/`

### L. User Management

**Remove:**
- `/apps/studio/data/profile/`
- `/apps/studio/data/permissions/` (except database permissions)
- `/apps/studio/data/entitlements/`

### M. Logs & Monitoring (Cloud-Based)

**Remove:**
- `/apps/studio/data/logs/` (cloud log aggregation)
- `/apps/studio/data/log-drains/`

---

## REPLACEMENT REQUIREMENTS

### 1. Database Connection Layer

**Replace:** Supabase Management API + PostgREST
**With:** Direct PostgreSQL connection using `pg` library

**Create:**
- `/src/lib/db.ts` - Connection pooling and query execution

**Example:**
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

export async function query<T>(text: string, params?: any[]): Promise<T> {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T;
  } finally {
    client.release();
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}

export async function closePool(): Promise<void> {
  await pool.end();
}
```

---

### 2. Query Execution API

**Replace:** PostgREST SQL execution endpoint
**With:** Custom Next.js API route

**Create:** `/app/api/pg-meta/query/route.ts`

**Example:**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query: sqlQuery, disable_statement_timeout } = body;

    // Validate query
    if (!sqlQuery || typeof sqlQuery !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid query' },
        { status: 400 }
      );
    }

    // Set statement timeout (10 seconds default)
    if (!disable_statement_timeout) {
      await query('SET statement_timeout = 10000');
    }

    // Execute query
    const result = await query(sqlQuery);

    return NextResponse.json({
      success: true,
      data: result,
      rowCount: result.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Query execution failed',
      },
      { status: 500 }
    );
  }
}
```

---

### 3. Metadata API Routes

**Create Additional Routes:**

- `/app/api/pg-meta/schemas/route.ts` - List schemas
- `/app/api/pg-meta/tables/route.ts` - List tables
- `/app/api/pg-meta/functions/route.ts` - List functions
- `/app/api/pg-meta/triggers/route.ts` - List triggers
- `/app/api/pg-meta/extensions/route.ts` - List extensions
- `/app/api/pg-meta/roles/route.ts` - List roles
- `/app/api/pg-meta/policies/route.ts` - List RLS policies

**Use @supabase/postgres-meta package** (extracted as local package) for metadata queries.

---

### 4. Authentication (Optional for Local Use)

**Replace:** Supabase Auth/GoTrue
**With:**

**Option A:** No authentication (local-only, trusted environment)

**Option B:** Simple password protection
```typescript
// Middleware or API route protection
const APP_PASSWORD = process.env.APP_PASSWORD;

export function authenticate(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${APP_PASSWORD}`) {
    return false;
  }
  return true;
}
```

**Option C:** Basic HTTP authentication

---

### 5. API Client Updates

**Update:** `/src/data/fetchers.ts`

**Replace:** Supabase Management API endpoint
**With:** Local API endpoints (`/api/pg-meta/*`)

**Example:**
```typescript
import createClient from 'openapi-fetch';
import type { paths } from './api';

export const client = createClient<paths>({
  baseUrl: '/api/pg-meta',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

---

## ESTIMATED FILE COUNTS

### By Category

- **SQL Editor:** ~25 files
- **Table/Grid Editor:** ~50 files
- **Database Schema Browser:** ~80 files
- **Data Grid Component:** ~60 files
- **Data Layer:** ~150 files (85 directories × ~2 files avg)
- **State Management:** 10 files
- **Custom Hooks:** ~30 files
- **Utility Libraries:** ~40 files
- **UI Components:** ~100 files
- **Shared Packages:** ~200 files
- **Configuration:** ~15 files
- **Type Definitions:** ~20 files

**Total Estimated Files: 780-850 files**

### Size Distribution

- **Components:** ~2.1MB
- **Utilities:** ~906KB
- **Data Layer:** ~409KB
- **State Management:** ~59KB
- **Hooks:** ~57KB

**Total Estimated Size: ~3.5MB**

---

## EXTRACTION WORKFLOW RECOMMENDATION

### Phase 1: Foundation (Week 1)

1. **Extract shared packages**
   - [ ] pg-meta (complete package)
   - [ ] ui (complete package)
   - [ ] icons (complete package)
   - [ ] common, shared-data, api-types
   - [ ] config, tsconfig, eslint-config-supabase

2. **Extract configuration files**
   - [ ] next.config.js
   - [ ] tailwind.config.js
   - [ ] tsconfig.json
   - [ ] package.json (adapt dependencies)
   - [ ] .eslintrc.json
   - [ ] .prettierrc
   - [ ] postcss.config.js

3. **Set up project structure**
   - [ ] Create Next.js App Router structure (`/app/`)
   - [ ] Create source directory (`/src/`)
   - [ ] Set up Docker configuration

4. **Extract type definitions**
   - [ ] All files from `/apps/studio/types/`
   - [ ] Grid types
   - [ ] Component types

---

### Phase 2: Data Layer (Week 2-3)

1. **Extract data fetching infrastructure**
   - [ ] fetchers.ts
   - [ ] api.d.ts
   - [ ] query-client.ts

2. **Extract database-related data modules**
   - [ ] sql/
   - [ ] tables/
   - [ ] table-rows/
   - [ ] table-editor/
   - [ ] database/
   - [ ] database-columns/
   - [ ] database-functions/
   - [ ] database-triggers/
   - [ ] database-policies/
   - [ ] database-roles/
   - [ ] database-extensions/
   - [ ] database-indexes/
   - [ ] views/
   - [ ] materialized-views/
   - [ ] enumerated-types/
   - [ ] entity-types/
   - [ ] foreign-tables/
   - [ ] fdw/
   - [ ] lint/

3. **Create custom API routes**
   - [ ] /api/pg-meta/query/route.ts
   - [ ] /api/pg-meta/schemas/route.ts
   - [ ] /api/pg-meta/tables/route.ts
   - [ ] /api/pg-meta/functions/route.ts
   - [ ] /api/pg-meta/triggers/route.ts
   - [ ] /api/pg-meta/extensions/route.ts
   - [ ] /api/pg-meta/roles/route.ts
   - [ ] /api/pg-meta/policies/route.ts

4. **Implement PostgreSQL connection layer**
   - [ ] /src/lib/db.ts
   - [ ] Connection pooling
   - [ ] Error handling
   - [ ] Connection testing

---

### Phase 3: Components (Week 4-5)

1. **Extract data grid component**
   - [ ] SupabaseGrid.tsx and utilities
   - [ ] Grid subcomponents (editor, formatter, header, footer, menu)
   - [ ] Grid hooks
   - [ ] Grid types and utilities

2. **Extract SQL editor interface**
   - [ ] SQLEditor.tsx and related files
   - [ ] MonacoEditor.tsx
   - [ ] SQL templates
   - [ ] Utility panel
   - [ ] Modals and dialogs

3. **Extract table/grid editor interface**
   - [ ] TableGridEditor.tsx
   - [ ] GridHeaderActions.tsx
   - [ ] TableDefinition.tsx
   - [ ] Side panel editor
   - [ ] Confirmation dialogs

4. **Extract database schema browser**
   - [ ] Database interface components
   - [ ] Tables, Functions, Triggers, etc.
   - [ ] Schema visualizer
   - [ ] Protected schema warning

5. **Extract UI components**
   - [ ] Charts
   - [ ] CodeEditor
   - [ ] DataTable
   - [ ] DatePicker
   - [ ] Forms
   - [ ] ErrorBoundary
   - [ ] All other UI components (79 total)

---

### Phase 4: Integration (Week 6)

1. **Extract state management**
   - [ ] app-state.ts
   - [ ] sql-editor-v2.ts
   - [ ] table-editor.tsx
   - [ ] table-editor-table.tsx
   - [ ] database-selector.tsx
   - [ ] database-settings.tsx
   - [ ] tabs.tsx
   - [ ] sidebar-manager-state.tsx
   - [ ] side-panels.ts
   - [ ] editor-panel-state.tsx

2. **Extract custom hooks**
   - [ ] UI hooks
   - [ ] Misc hooks
   - [ ] Database-specific hooks

3. **Extract utility libraries**
   - [ ] Core utilities (helpers, formatters, parsers)
   - [ ] Constants
   - [ ] Common utilities
   - [ ] UI utilities
   - [ ] Config utilities

4. **Wire up components with data layer**
   - [ ] Update API endpoints in data hooks
   - [ ] Test query execution
   - [ ] Test table operations
   - [ ] Test metadata fetching

---

### Phase 5: Polish (Week 7)

1. **Extract styling**
   - [ ] Global styles
   - [ ] Component styles
   - [ ] Font files
   - [ ] CSS variables

2. **Extract static assets**
   - [ ] Images
   - [ ] Icons
   - [ ] Logos
   - [ ] Favicons

3. **Create Docker configuration**
   - [ ] Dockerfile
   - [ ] docker-compose.yml
   - [ ] .dockerignore
   - [ ] Health checks

4. **Write documentation**
   - [ ] README.md
   - [ ] ARCHITECTURE.md
   - [ ] SETUP.md
   - [ ] CONTRIBUTING.md
   - [ ] SECURITY.md
   - [ ] LICENSE

5. **Testing & debugging**
   - [ ] Test all features
   - [ ] Fix bugs
   - [ ] Optimize performance
   - [ ] Security review

---

## SUMMARY

### What to Extract

**Core Database Features:**
- ✅ SQL Editor with Monaco Editor
- ✅ Table/Grid Editor with inline editing
- ✅ Database Schema Browser
- ✅ Query execution and management
- ✅ Metadata viewing and management

**Supporting Infrastructure:**
- ✅ pg-meta package (PostgreSQL metadata)
- ✅ UI component library (45+ components)
- ✅ Data layer (TanStack Query hooks)
- ✅ State management (Valtio)
- ✅ Utilities and helpers
- ✅ Type definitions

**Total:** ~780-850 files, ~3.5MB of code

---

### What to Replace

**Cloud Dependencies:**
- ❌ Supabase Management API → Custom Next.js API routes
- ❌ PostgREST → Direct pg library connection
- ❌ Supabase Auth → No auth or simple password
- ❌ Storage Service → Not needed
- ❌ Realtime → Not needed
- ❌ Edge Functions → Not needed

---

### What to Remove

**Supabase-Specific:**
- ❌ Authentication & SSO
- ❌ Platform management
- ❌ Storage service
- ❌ Realtime subscriptions
- ❌ Edge functions
- ❌ Billing & subscriptions
- ❌ Integration platform
- ❌ Cloud analytics
- ❌ Vault & secrets

---

## Result

**Open-Studio** will be a lightweight, self-hosted PostgreSQL UI with:

1. **Modern Stack:** Next.js 15, React 18, TailwindCSS, Radix UI
2. **Smart Data Management:** TanStack Query with caching & retry logic
3. **Clean Architecture:** Separation of concerns (app/ for routing, src/ for logic)
4. **Comprehensive UI:** 749+ TypeScript components
5. **Production Ready:** Docker-ready, health checks, error handling, security
6. **Extensible Design:** Clear patterns for adding new features

All extracted from Supabase Studio without cloud dependencies.

---

**End of Document**
