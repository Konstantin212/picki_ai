import { createClient } from '@/lib/supabase';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default async function StartPage() {
  const supabase = await createClient();

  // Get session for auth state
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Typography variant="h1" className="mb-6" tKey="start.title" />
        <Typography variant="body1" color="secondary" className="mb-8" tKey="start.description" />

        <div className="space-y-4">
          <Button size="lg" className="w-full sm:w-auto">
            <Typography component="span" tKey="start.beginSetup" />
          </Button>
        </div>
      </div>
    </main>
  );
}
