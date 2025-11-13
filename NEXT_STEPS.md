# Phase 18: TypeScript Error Reduction - Continuation Prompt

## Project Context

**Open Studio** is a PostgreSQL-only database management GUI (like pgAdmin, DBeaver, TablePlus).
- **NOT** a Supabase platform clone
- Focus: PostgreSQL database features only
- See `claude.md` for full project vision and documentation

## Current Status

**Branch:** `claude/git-history-cleanup-011CV45Prut1MkfSDoLJPwvg`

**Error Count:** 952 TypeScript errors (down from 1,353 at start - 29.6% reduction)

**Recent Phases Completed:**
- Phase 11-12: Reduced 1,086 → 1,004 errors (package installs, stubs)
- Phase 13: 1,004 → 1,011 errors (backward compat aliases)
- Phase 14: 1,011 → 947 errors (deleted cloud features)
- Phase 15: 947 → 911 errors (deleted platform features)
- Phase 16: 911 → 901 errors (export fixes, types)
- Phase 17: 901 → 952 errors (docs + imports - exposed new issues)

## Major Remaining Error Categories

From `npx tsc --noEmit` analysis:

1. **FormLayout property issues** (~10 errors)
   - Components passing unknown props to FormLayout
   - Missing: `label`, `nonBoxInput`, `size`, etc.

2. **Size type conflicts** (~8 errors)
   - HTML size attribute (number) vs component size ('small' | 'medium' | etc)
   - Affects: Input, Select, Listbox, InputNumber

3. **ShadcnInput ref issues** (~3 errors)
   - ui-patterns/Input passing ref to component without ref support

4. **cn() type issue** (~2 errors)
   - ClassValue doesn't accept bigint (0n)
   - Related to icon && 'pl-10' evaluations

5. **chart.tsx dataKey** (~1 error)
   - Payload type missing dataKey property

6. **Type annotations** (392 TS2339 errors)
   - "Property does not exist on type"
   - Many implicit any types

## Detailed Step-by-Step Execution Plan

**IMPORTANT:** Execute all steps sequentially. Mark each todo as completed after finishing. Commit at the end.

### Step 1: Setup and Analysis (5 minutes)

1.1. Read `/home/user/open-studio/claude.md` to understand project vision
1.2. Run `npx tsc --noEmit 2>&1 | tee /tmp/tsc-start.txt` to capture baseline
1.3. Count errors: `grep "error TS" /tmp/tsc-start.txt | wc -l`
1.4. Create todo list with all steps from this plan
1.5. Analyze top error patterns: `grep "error TS" /tmp/tsc-start.txt | sed 's/.*error TS/TS/' | sed 's/:.*//' | sort | uniq -c | sort -rn | head -20`

### Step 2: Fix FormLayout Property Issues (15 minutes)

2.1. Read `src/lib/Layout/FormLayout/FormLayout.tsx` to see FormLayoutProps interface
2.2. Search for FormLayout usage: `grep -rn "FormLayout" src/lib/ui/ --include="*.tsx" | head -20`
2.3. Add missing properties to FormLayoutProps interface:
   - `label?: ReactNode`
   - `labelOptional?: string`
   - `nonBoxInput?: boolean`
   - `size?: Size`
   - All other props being passed by Radio, Select, Listbox, Toggle
2.4. Test: `npx tsc --noEmit 2>&1 | grep "FormLayout" | wc -l` (should be 0)
2.5. Mark step complete in todo

### Step 3: Fix Size Type Conflicts (20 minutes)

3.1. Read `src/lib/ui/Input/Input.tsx` to understand current size implementation
3.2. Find all components with size conflicts:
   ```bash
   grep -rn "Type 'string' is not assignable to type 'number'" /tmp/tsc-start.txt
   ```
3.3. For each component (Input, Select, Listbox, InputNumber):
   - Use `Omit<React.InputHTMLAttributes, 'size'>` pattern
   - Define component-specific size prop as string literals
   - Example already done in `src/ui-patterns/DataInputs/Input.tsx`
3.4. Fix `src/lib/ui/Input/Input.tsx`:
   ```typescript
   export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
     size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge'
     // ... other props
   }
   ```
3.5. Fix `src/lib/ui/Select/Select.tsx` - same pattern
3.6. Fix `src/lib/ui/Listbox/Listbox2.tsx` - same pattern
3.7. Fix InputIconContainer if it has size prop
3.8. Test: `npx tsc --noEmit 2>&1 | grep "Type 'string' is not assignable to type 'number'" | wc -l`
3.9. Mark step complete in todo

### Step 4: Fix ShadcnInput Ref Issues (15 minutes)

4.1. Read error details:
   ```bash
   grep -A 3 "Property 'ref' does not exist" /tmp/tsc-start.txt
   ```
4.2. The issue is in `src/ui-patterns/DataInputs/Input.tsx`
4.3. ShadcnInput doesn't accept ref prop in its Props type
4.4. Solution: Don't pass ref to ShadcnInput, handle it differently:
   ```typescript
   <div ref={ref}>
     <ShadcnInput {...props} />
   </div>
   ```
   OR investigate if ShadcnInput needs to be forwardRef component
4.5. Test the fix
4.6. Mark step complete in todo

### Step 5: Fix cn() ClassValue Type Issue (10 minutes)

5.1. Read the error:
   ```bash
   grep -A 2 "Type '0n' is not assignable to type 'ClassValue'" /tmp/tsc-start.txt
   ```
5.2. The issue: `icon && 'pl-10'` when icon is falsy becomes 0n (bigint)
5.3. Fix in `src/ui-patterns/DataInputs/Input.tsx` line 61:
   ```typescript
   // BEFORE:
   className={cn(sizeClasses[size], icon && 'pl-10', error && 'border-destructive', className)}

   // AFTER:
   className={cn(sizeClasses[size], icon ? 'pl-10' : '', error ? 'border-destructive' : '', className)}
   ```
5.4. Search for similar patterns:
   ```bash
   grep -rn "&&.*'pl-" src/ --include="*.tsx"
   ```
5.5. Fix all occurrences using ternary operator instead
5.6. Test: `npx tsc --noEmit 2>&1 | grep "0n" | wc -l`
5.7. Mark step complete in todo

### Step 6: Fix chart.tsx Payload Type (10 minutes)

6.1. Read `src/lib/ui/shadcn/ui/chart.tsx` line 270
6.2. Find the Payload type definition
6.3. Add `dataKey?: string` to Payload interface, or
6.4. Add type guard: `if ('dataKey' in item)` before accessing
6.5. Or cast: `(item as any).dataKey`
6.6. Test: `npx tsc --noEmit 2>&1 | grep "chart.tsx" | wc -l`
6.7. Mark step complete in todo

### Step 7: Fix InputNumber Component (10 minutes)

7.1. Read `src/lib/ui/InputNumber/index.tsx`
7.2. Fix ref passing issue (same as Step 4)
7.3. Ensure Input component properly accepts type="number"
7.4. Test the component
7.5. Mark step complete in todo

### Step 8: Intermediate Testing (10 minutes)

8.1. Run full TypeScript check: `npx tsc --noEmit 2>&1 | tee /tmp/tsc-mid.txt`
8.2. Count errors: `grep "error TS" /tmp/tsc-mid.txt | wc -l`
8.3. Compare to baseline: calculate reduction
8.4. Analyze remaining top errors:
   ```bash
   grep "error TS" /tmp/tsc-mid.txt | sed 's/.*error TS/TS/' | sed 's/:.*//' | sort | uniq -c | sort -rn | head -10
   ```
8.5. Update todo with progress
8.6. Mark step complete in todo

### Step 9: Fix Top TS2339 Errors (30 minutes)

9.1. Get list of most common property errors:
   ```bash
   grep "TS2339" /tmp/tsc-mid.txt | sed "s/.*Property '\([^']*\)'.*/\1/" | sort | uniq -c | sort -rn | head -20
   ```
9.2. For top 5 most common property errors:
   - Identify which interface/type needs the property
   - Add the property with correct type
   - Or add type assertion where property doesn't belong
9.3. Common fixes:
   - Add missing properties to interfaces
   - Add `| undefined` to optional properties
   - Use optional chaining `?.` where appropriate
9.4. Test after each group of 5 fixes
9.5. Mark step complete in todo

### Step 10: Fix TS7006 Implicit Any Errors (20 minutes)

10.1. Get files with most implicit any errors:
   ```bash
   grep "TS7006" /tmp/tsc-mid.txt | cut -d':' -f1 | sort | uniq -c | sort -rn | head -10
   ```
10.2. For top 3 files:
   - Add explicit parameter types
   - Common pattern: `(x: any)` → `(x: SomeType)`
10.3. Focus on parameters in callbacks and event handlers
10.4. Test: `grep "TS7006" /tmp/tsc-mid.txt | wc -l`
10.5. Mark step complete in todo

### Step 11: Final Testing and Analysis (10 minutes)

11.1. Run full TypeScript check: `npx tsc --noEmit 2>&1 | tee /tmp/tsc-final.txt`
11.2. Count final errors: `grep "error TS" /tmp/tsc-final.txt | wc -l`
11.3. Calculate total reduction: baseline - final
11.4. Create error reduction summary:
   ```bash
   echo "Baseline: $(grep 'error TS' /tmp/tsc-start.txt | wc -l) errors"
   echo "Final: $(grep 'error TS' /tmp/tsc-final.txt | wc -l) errors"
   echo "Reduced: $(($(grep 'error TS' /tmp/tsc-start.txt | wc -l) - $(grep 'error TS' /tmp/tsc-final.txt | wc -l))) errors"
   ```
11.5. Document remaining error categories
11.6. Mark step complete in todo

### Step 12: Commit and Push (5 minutes)

12.1. Stage all changes: `git add -A`
12.2. Review changes: `git status`
12.3. Create detailed commit message following this template:
   ```
   Phase 18: Fix FormLayout props and size type conflicts

   Fixed component property issues:
   1. Added missing props to FormLayoutProps
      - label, labelOptional, nonBoxInput, size
      - Fixes TS2322 errors in Radio, Select, Listbox, Toggle

   2. Fixed size type conflicts (string vs number)
      - Used Omit<HTMLAttributes, 'size'> pattern
      - Applied to Input, Select, Listbox, InputNumber

   3. Fixed ShadcnInput ref issues
      - [Describe solution]

   4. Fixed cn() ClassValue bigint issue
      - Changed && to ternary operators
      - Prevents 0n type errors

   5. Fixed chart.tsx Payload type
      - [Describe solution]

   6. Fixed [X] TS2339 property errors
   7. Fixed [X] TS7006 implicit any errors

   Result:
   - Reduced from [baseline] to [final] errors (-[X] errors)
   - [X]% total reduction from initial 1,353 errors

   Files modified: [count]
   ```
12.4. Commit: `git commit -m "[message]"`
12.5. Push: `git push -u origin claude/git-history-cleanup-011CV45Prut1MkfSDoLJPwvg`
12.6. Mark step complete in todo

### Step 13: Summary Report (5 minutes)

13.1. Create summary of work completed
13.2. List files modified with line counts
13.3. Show before/after error counts by category
13.4. Identify next highest-priority errors for Phase 19
13.5. Mark all todos as complete

## Expected Outcomes

**Target:** Reduce errors by 50-100 (from 952 to ~850-900)

**Key Fixes:**
- ✅ FormLayout accepts all necessary props
- ✅ No size type conflicts between HTML and component props
- ✅ No ref prop errors
- ✅ No ClassValue bigint errors
- ✅ Payload has dataKey property
- ✅ Reduced TS2339 property errors by at least 20
- ✅ Reduced TS7006 implicit any errors by at least 10

## Important Notes

1. **DO NOT delete any files** - Only modify existing files
2. **Focus on type fixes** - Not behavioral changes
3. **Test incrementally** - Run tsc after each major step
4. **Use existing patterns** - Follow patterns from Phase 16-17
5. **Commit once** - At the end with comprehensive message
6. **Update todos** - Mark each step complete as you go

## Reference Files

- Project vision: `/home/user/open-studio/claude.md`
- Current errors: `npx tsc --noEmit`
- Git branch: `claude/git-history-cleanup-011CV45Prut1MkfSDoLJPwvg`

## Starting Command

```bash
cd /home/user/open-studio
npx tsc --noEmit 2>&1 | tee /tmp/tsc-phase18-start.txt
grep "error TS" /tmp/tsc-phase18-start.txt | wc -l
```

Execute all steps sequentially without asking for continuation. Report progress with todo updates.
