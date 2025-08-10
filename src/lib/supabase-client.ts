import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client for client-side operations
 *
 * @returns Configured Supabase client instance
 * @throws Error if Supabase environment variables are missing
 *
 * @example
 * ```typescript
 * const supabase = createBrowserSupabaseClient();
 * const { data } = await supabase.from('users').select('*');
 * ```
 */
export const createBrowserSupabaseClient = (): SupabaseClient => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};
