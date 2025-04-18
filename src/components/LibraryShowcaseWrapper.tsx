import { LibraryShowcase } from "./LibraryShowcase";
import { SupabaseConnection } from "./SupabaseConnection";

export async function LibraryShowcaseWrapper() {
  const supabaseResult = await SupabaseConnection();

  return (
    <div className="space-y-8">
      <LibraryShowcase />

      {/* Supabase Status */}
      <div className="p-8 space-y-2">
        <h2 className="text-xl font-semibold">Supabase Connection Status</h2>
        {supabaseResult.isConnected ? (
          <>
            <p className="text-green-500">Connected to Supabase</p>
            {supabaseResult.data?.map((d) => (
              <p className="text-amber-400" key={d.name}>
                {d.name}
              </p>
            ))}
          </>
        ) : (
          <p className="text-red-500">
            Not connected to Supabase: {supabaseResult.error}
          </p>
        )}
      </div>
    </div>
  );
}
