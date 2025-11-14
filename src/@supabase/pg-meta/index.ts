/**
 * Alias for @supabase/postgres-meta package
 * The monorepo uses @supabase/pg-meta but the npm package is @supabase/postgres-meta
 */

import * as pgMeta from '@supabase/postgres-meta'

// Stub generator functions for compatibility with Supabase Studio monorepo API
const createStubGenerator = (entityName: string) => ({
  create: (payload: any, options?: any) => ({
    sql: `-- Stub SQL for ${entityName}.create`,
    zod: {} as any,
  }),
  update: (id: any, payload: any, options?: any) => ({
    sql: `-- Stub SQL for ${entityName}.update`,
    zod: {} as any,
  }),
  remove: (id: any, options?: any) => ({
    sql: `-- Stub SQL for ${entityName}.remove`,
    zod: {} as any,
  }),
  retrieve: (id: any, options?: any) => ({
    sql: `-- Stub SQL for ${entityName}.retrieve`,
    zod: {} as any,
  }),
  list: (options?: any) => ({
    sql: `-- Stub SQL for ${entityName}.list`,
    zod: {} as any,
  }),
  pgFunctionCreateZod: {} as any,
})

// Add stub generator properties for compatibility
const pgMetaWithGenerators = {
  ...pgMeta,
  functions: createStubGenerator('functions'),
  tables: createStubGenerator('tables'),
  extensions: createStubGenerator('extensions'),
  triggers: createStubGenerator('triggers'),
  policies: createStubGenerator('policies'),
  roles: createStubGenerator('roles'),
  columns: createStubGenerator('columns'),
  publications: createStubGenerator('publications'),
  schemas: createStubGenerator('schemas'),
}

export default pgMetaWithGenerators
export * from '@supabase/postgres-meta'
