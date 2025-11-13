# Open Studio - PostgreSQL Database Management GUI

## Project Vision

**Open Studio is a PostgreSQL-only database management tool** - similar to pgAdmin, DBeaver, or TablePlus.

This is a **focused PostgreSQL GUI**, NOT a Supabase platform clone. We manage PostgreSQL databases through a web interface, providing tools for:
- SQL query editing and execution
- Table/schema browsing and editing
- Database functions, triggers, and extensions management
- Visual query builders and data exploration

## What This Project Is NOT

❌ **Not a Supabase platform** - We do NOT support:
- Edge Functions (serverless TypeScript functions)
- Authentication services (Auth.js, Supabase Auth)
- File Storage services (S3-compatible storage)
- Realtime subscriptions (WebSocket services)
- API auto-generation
- Cloud hosting/deployment features
- Organizations, billing, subscriptions
- Infrastructure management, monitoring
- Read replicas, connection pooling services

## What We Keep: PostgreSQL Core Features

✅ **Database Management:**
- Tables, views, materialized views
- Schemas (public, custom schemas)
- Indexes, foreign keys, constraints
- Database roles and privileges
- Row-level security (RLS) policies
- Extensions (pg_stat_statements, pgcrypto, etc.)

✅ **Query Tools:**
- SQL Editor with syntax highlighting
- Query execution and results viewing
- Query history and saved snippets
- Visual table/data browsers

✅ **Database Functions & Triggers:**
- PostgreSQL stored procedures (PL/pgSQL functions)
- Database triggers (BEFORE/AFTER INSERT/UPDATE/DELETE)
- Event triggers
- Function editor with parameter management

✅ **Webhooks (HTTP-only):**
- Database Hooks can call HTTP endpoints
- Standard webhook functionality (POST requests with headers/params)
- NOT Supabase Edge Functions integration

✅ **Logs & Monitoring:**
- PostgreSQL logs viewing
- Query performance logs
- Connection logs
- Local database monitoring only

## Directory Structure Guide

### ✅ KEEP - Core Database Features

**SQL Editor:**
- `src/components/interfaces/SQLEditor/` - Query editor, results panel
- `src/state/sql-editor-v2.ts` - SQL editor state management

**Database Management:**
- `src/components/interfaces/Database/` - All database UI components
  - `Database/Tables/` - Table browser and editor
  - `Database/Functions/` - PostgreSQL function editor
  - `Database/Triggers/` - Trigger management
  - `Database/Hooks/` - Database webhooks (HTTP requests only)
  - `Database/Extensions/` - Extension management
  - `Database/Roles/` - Role/privilege management
  - `Database/Policies/` - RLS policy editor
  - `Database/Publications/` - Logical replication
  - `Database/Indexes/` - Index management
  - `Database/Schemas/` - Schema browser

**Table Grid Editor:**
- `src/components/interfaces/TableGridEditor/` - Visual table/data editor
- `src/components/grid/` - Grid component library

**Data Layer (PostgreSQL queries):**
- `src/data/database-*/` - All `database-*` directories
- `src/data/tables/` - Table queries
- `src/data/views/` - View queries
- `src/data/materialized-views/` - Materialized view queries
- `src/data/enumerated-types/` - Enum type queries
- `src/data/foreign-tables/` - Foreign data wrapper queries
- `src/data/fdw/` - Foreign data wrapper management
- `src/data/privileges/` - Role/privilege queries
- `src/data/vault/` - PostgreSQL vault extension queries

**UI Library:**
- `src/lib/ui/` - All UI components (shadcn/ui, custom components)
- `src/ui-patterns/` - Reusable UI patterns

### ❌ DELETE - Supabase Platform Features (Already Removed)

**Cloud Business Features (Deleted in Phase 14):**
- ~~`src/components/interfaces/Billing/`~~ ❌ Deleted
- ~~`src/components/interfaces/Settings/Infrastructure/`~~ ❌ Deleted
- ~~`src/components/interfaces/LogDrains/`~~ ❌ Deleted
- ~~`src/components/interfaces/App/FeaturePreview/`~~ ❌ Deleted
- ~~`src/components/interfaces/UnifiedLogs/`~~ ❌ Deleted
- ~~`src/data/subscriptions/`~~ ❌ Deleted
- ~~`src/data/organizations/`~~ ❌ Deleted
- ~~`src/data/deployments/`~~ ❌ Deleted
- ~~`src/data/read-replicas/`~~ ❌ Deleted
- ~~`src/components/interfaces/Reports/`~~ ❌ Deleted (kept Reports.constants.ts stub only)

**Supabase Platform Features (Deleted in Phase 15):**
- ~~`src/components/interfaces/Functions/`~~ ❌ Deleted (Edge Functions UI)
- ~~`src/components/ui/EdgeFunctionBlock/`~~ ❌ Deleted
- ~~`src/components/ui/ProjectSettings/DisplayApiSettings.tsx`~~ ❌ Deleted
- ~~`src/data/edge-functions/`~~ ⚠️ Stubbed (returns empty array, disabled)

**Never Existed (or already removed):**
- ~~Auth UI components~~ ❌ Never existed
- ~~Storage UI components~~ ❌ Never existed
- ~~Realtime UI components~~ ❌ Never existed
- ~~API auto-generation UI~~ ❌ Never existed

### ⚠️ STUBS - Compatibility Shims

These files exist ONLY for backwards compatibility, returning empty/stub data:

**Data Layer Stubs:**
- `src/data/edge-functions/edge-functions-query.ts` - Returns `[]`, `enabled: false`
- `src/data/content/keys.ts` - React Query keys for SQL snippets
- `src/data/content/sql-folder-update-mutation.ts` - Folder management stub

**UI Stubs:**
- `src/components/interfaces/Reports/Reports.constants.ts` - Date range helpers for logs
- `src/hooks/misc/useSelectedOrganization.ts` - Returns `undefined`
- `src/lib/common/stubs/feature-flags.ts` - All features enabled by default

**Constants:**
- `src/lib/constants.ts` - `IS_PLATFORM = false` (standalone mode)

## Key Configuration

**Environment:**
- `IS_PLATFORM = false` - We are NOT the Supabase cloud platform
- Standalone mode: Direct PostgreSQL connections via connection strings
- No Supabase API integration

**Database Hooks:**
- Supports HTTP webhooks (POST to any URL)
- Edge Functions option hidden when `IS_PLATFORM = false`
- See `src/components/interfaces/Database/Hooks/Hooks.constants.ts:28-37`

## Development Guidelines

### When Adding Features:
1. ✅ **PostgreSQL features** - Always implement
2. ❌ **Cloud/platform features** - Always reject
3. ⚠️ **Unsure?** Check if it requires:
   - Supabase API calls → ❌ Delete
   - Cloud infrastructure → ❌ Delete
   - Direct PostgreSQL queries → ✅ Keep

### Testing Features:
- Run `npm run build` to check TypeScript errors
- Run `npx tsc --noEmit` for detailed error analysis
- Build should only fail on Google Fonts fetch (expected in sandbox)

## Current Status (Phase 16 Complete)

**Error Count:** 901 TypeScript errors (down from 1,353 at start)
- Phase 11-12: 1,086 → 1,004 errors
- Phase 13: 1,004 → 1,011 errors (exposed type issues)
- Phase 14: 1,011 → 947 errors (deleted cloud features)
- Phase 15: 947 → 911 errors (deleted platform features)
- Phase 16: 911 → 901 errors (fixed exports/types)

**Major Error Categories:**
- TS2339 (392): Property does not exist on type
- TS7006 (82): Parameter implicitly has 'any' type
- TS2322 (76): Type assignment errors
- TS2554 (62): Argument count mismatches

## Examples of PostgreSQL vs Platform Features

### ✅ PostgreSQL Database Function (KEEP)
```sql
CREATE FUNCTION calculate_total(price DECIMAL, quantity INT)
RETURNS DECIMAL AS $$
BEGIN
  RETURN price * quantity;
END;
$$ LANGUAGE plpgsql;
```
UI: `src/components/interfaces/Database/Functions/` ✅

### ❌ Supabase Edge Function (DELETE)
```typescript
// Serverless TypeScript function deployed to Supabase cloud
Deno.serve(async (req) => {
  return new Response("Hello from Edge Function")
})
```
UI: ~~`src/components/interfaces/Functions/`~~ ❌ Deleted

### ✅ Database Webhook (KEEP)
```sql
CREATE TRIGGER send_webhook
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION http_request('POST', 'https://api.example.com/webhook');
```
UI: `src/components/interfaces/Database/Hooks/` ✅

### ❌ Supabase Organization/Billing (DELETE)
- Organization management
- Subscription plans
- Usage billing
UI: ~~`src/components/interfaces/Billing/`~~ ❌ Deleted

## Auth Schema Tables

The `auth.*` schema tables (users, sessions, etc.) ARE part of PostgreSQL and can be managed through the standard table editor. We do NOT need special Auth UI - users can:
- View auth.users table through Table Browser
- Edit/query auth tables through SQL Editor
- Manage like any other PostgreSQL table

## Next Steps

Continue reducing TypeScript errors by:
1. Fixing remaining module export mismatches
2. Adding missing type definitions
3. Resolving property access errors
4. Adding explicit type annotations where needed

## Git Branch

Active development branch: `claude/git-history-cleanup-011CV45Prut1MkfSDoLJPwvg`

All commits should go to this branch with clear, descriptive messages documenting what was changed and why.
