# Phase 49+: TypeScript Error Reduction - Continue

## Project Context

**Open Studio** is a PostgreSQL-only database management GUI (like pgAdmin, DBeaver, TablePlus).
- **NOT** a Supabase platform clone
- Focus: PostgreSQL database features only
- See `claude.md` for full project vision and documentation

## Current Status

**Branch:** `claude/typescript-phase-48-final-0124rVftpFEgdeutE5Nvmsaz`

**Error Count:** 240 TypeScript errors (down from 1,353 at start - **82.3% reduction**)

**Recent Work (Phase 48):** Fixed 30 errors (11.1% reduction)

## Phase 48 Accomplishments

### Part 1: ES2018 Target & Regex Fixes (28 errors fixed)
- ✅ Updated `tsconfig.json` target from ES5 to ES2020
- ✅ Added `downlevelIteration` flag for modern JavaScript iteration
- ✅ Refactored `src/lib/sql-event-parser.ts` to use indexed regex groups
- ✅ Cleared TypeScript build caches

**Errors Eliminated:**
- ✅ TS1503: 18 errors (named capturing groups) → 0
- ✅ TS1501: 3 errors (regex flags) → 0
- ✅ TS2802: 7 errors (iteration) → 0

### Part 2: Module Export Fixes (2 net errors, 37 issues resolved)
- ✅ Fixed 18 incorrect import names (TS2724)
- ✅ Added 7 missing exports (TS2305)
- ✅ Converted Query from interface to class (TS2693 - 12 errors)

**Errors Eliminated:**
- ✅ TS2724: 18 errors → 0 (wrong import names)
- ✅ TS2305: 7 errors → 0 (missing exports)
- ✅ TS2693: 12 errors → 0 (type-only imports)

## Remaining Errors (240 total)

### Error Distribution
1. **TS2769**: 38 errors - No overload matches (query hooks)
2. **TS2353**: 31 errors - Unknown object literal properties
3. **TS2339**: 25 errors - Property does not exist
4. **TS2554**: 19 errors - Argument count mismatch
5. **TS2345**: 18 errors - Type assignment errors
6. **TS2349**: 15 errors - Expression not callable
7. **TS2722**: 13 errors - Possibly undefined
8. **TS18048**: 12 errors - Possibly undefined (strict)
9. **TS2322**: 11 errors - Type not assignable
10. **TS2614**: 8 errors - Module errors
11. **TS2304**: 7 errors - Cannot find name
12. **TS1355**: 7 errors - Modifiers errors
13. **TS2551**: 6 errors - Property name typos
14. **Others**: 30 errors

### Top Files with Errors
1. `src/components/interfaces/Database/Privileges/Privileges.utils.ts` - 10 errors
2. `src/data/database-queues/database-queue-messages-infinite-query.ts` - 8 errors
3. `src/lib/ui/Button/Button.test.tsx` - 11 errors (test file)
4. `src/lib/ui/Alert/Alert.test.tsx` - 6 errors (test file)
5. `src/components/interfaces/SQLEditor/OngoingQueriesPanel.tsx` - 7 errors

## Next Steps for Phase 49

### Priority 1: Query Hook Overload Errors (TS2769 - 38 errors)
**Impact:** High - Affects data fetching throughout the app

Pattern: `useQuery` and `useInfiniteQuery` calls with type mismatches

Example locations:
- `src/data/database-cron-jobs/*` (6 files)
- `src/data/database-extensions/database-extensions-query.ts`
- `src/data/database-functions/database-functions-query.ts`
- `src/data/database-indexes/indexes-query.ts`
- `src/data/database-queues/*`

Common issue: Object literal properties in wrong position or spreading conflicts

**Fix Strategy:**
1. Examine useQuery/useInfiniteQuery call signatures
2. Ensure options object structure matches TanStack Query v5 types
3. Check for property conflicts in spread operators
4. May need to update custom query option types in `types/index.ts`

### Priority 2: Object Literal Properties (TS2353 - 31 errors)
**Impact:** Medium - Type safety issues

Common patterns:
- Missing `title` property in React components
- Missing `reveal` in ApiKeysVariables
- Missing `sqlSnippets`, `grants`, `revokes` in various interfaces
- Missing `utcTimestamp` in Date objects

**Fix Strategy:**
1. Extend interfaces with missing properties
2. For component props, check if using wrong prop type
3. For API variables, add optional properties where appropriate

Example fixes needed:
```typescript
// Add to ApiKeysVariables
interface ApiKeysVariables {
  reveal?: boolean
  // ... existing properties
}

// Add to mutation variables
interface TablePrivilegeGrantVariables {
  grants?: Grant[]
  // ... existing properties
}
```

### Priority 3: Property Access Errors (TS2339 - 25 errors)
**Impact:** Medium - Runtime safety

**Fix Strategy:**
1. Add missing properties to interfaces
2. Use optional chaining where appropriate
3. Add type guards for union types

### Priority 4: Test File Errors (TS2554 - subset of 19)
**Impact:** Low - Only affects test files

Files:
- `src/lib/ui/Button/Button.test.tsx` (11 errors)
- `src/lib/ui/Alert/Alert.test.tsx` (6 errors)

Common issue: `fireEvent` API usage

**Fix Strategy:**
1. Update `@testing-library/react` type declarations
2. Fix `fireEvent.click` calls to match v14+ API
3. Consider creating a `@testing-library/react.d.ts` stub

### Priority 5: Remaining Errors (167 errors)
Work through remaining error types systematically:
- TS2345 (18) - Type assignments
- TS2349 (15) - Not callable
- TS2722 (13) - Possibly undefined
- TS18048 (12) - Possibly undefined
- TS2322 (11) - Type not assignable
- Others (98)

## Execution Strategy

### Session 1: Query Hooks (2-3 hours)
Fix all TS2769 errors in query hooks
- Expected reduction: ~38 errors
- Target: 240 → 202 errors

### Session 2: Object Literals & Properties (2-3 hours)
Fix TS2353 and major TS2339 errors
- Expected reduction: ~50 errors
- Target: 202 → 152 errors

### Session 3: Test Files & Misc (2-3 hours)
Fix test file errors and remaining issues
- Expected reduction: ~50 errors
- Target: 152 → 102 errors

### Session 4: Final Push (2-3 hours)
Fix all remaining errors
- Expected reduction: ~102 errors
- **Target: 0 errors ✅**

## Important Commands

```bash
# Baseline check
npx tsc --noEmit 2>&1 | tee /tmp/tsc-current.txt
grep "error TS" /tmp/tsc-current.txt | wc -l

# Error distribution
grep "error TS" /tmp/tsc-current.txt | sed 's/.*error TS/TS/' | sed 's/:.*//' | sort | uniq -c | sort -rn

# Top files with errors
grep "error TS" /tmp/tsc-current.txt | cut -d'(' -f1 | sort | uniq -c | sort -rn | head -20

# Specific error type
grep "TS2769" /tmp/tsc-current.txt

# Clear caches (after tsconfig changes)
find . -name "*.tsbuildinfo" -delete
rm -rf .next
```

## Patterns Established (Phase 48)

1. **Always use TypeScript's suggested names** for TS2724 errors
2. **Create stub implementations** for missing exports rather than ignoring
3. **Convert interfaces to classes** when used as constructors
4. **Target ES2020** for modern JavaScript features
5. **Clear caches** after tsconfig.json changes

## Git History

### Phase 48 Commits
1. `55a738b` - Phase 48 Part 1: ES2018 regex and iteration fixes (-28 errors)
2. `053f5dc` - Phase 48 Part 2: Module export fixes (-2 net, 37 issues resolved)

### Previous Phases
- Phase 18-47: 1,353 → 270 errors (80% reduction)
- Phase 48: 270 → 240 errors (11.1% reduction)
- **Total: 82.3% error reduction**

## Success Metrics

**Current Goal:** < 100 errors (92.6% total reduction)

**Stretch Goal:** 0 errors (100% reduction) ✅

**Next Milestone:** 200 errors (85.2% reduction) - Achievable in 1 session

## Notes for Next Session

1. **Cache Issues:** Always clear `.tsbuildinfo` and `.next` after config changes
2. **Test Files:** Consider handling separately or excluding from strict checks
3. **Query Hooks:** May need to review TanStack Query v5 migration guide
4. **Stub Quality:** Query class stub may need enhancement for complex queries
