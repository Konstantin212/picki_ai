import { createClient } from '@/lib/supabase-server';

export async function SupabaseConnection() {
  try {
    const supabaseClient = await createClient();

    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Attempting to query 'test' table...");

    const { data, error } = await supabaseClient.from('test_data_table').select('*');

    if (error) {
      console.error('Supabase error:', error);
      return {
        isConnected: false,
        error: error?.message,
      };
    }

    console.log('Query successful, data:', data);
    return {
      isConnected: true,
      data,
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      isConnected: false,
      error: err instanceof Error ? err.message : 'Unknown error occurred',
    };
  }
}
