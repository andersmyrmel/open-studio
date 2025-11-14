/**
 * Type declaration stub for @supabase/supabase-js
 */

declare module '@supabase/supabase-js' {
  export interface SupabaseClient {
    auth: any
    from: (table: string) => any
  }
  
  export function createClient(url: string, key: string): SupabaseClient
}
