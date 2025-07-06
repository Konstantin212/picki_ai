import { createClient } from '@/lib/supabase';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default async function ResultsPage() {
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
    <main className="flex min-h-screen flex-col bg-gray-900 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <Typography variant="h1" className="mb-4" tKey="results.title" />
          <Typography
            variant="body1"
            color="secondary"
            className="mx-auto max-w-2xl"
            tKey="results.description"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Sample recommendation cards */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <Typography variant="h3" className="mb-2" tKey={`results.item${item}.title`} />
              <Typography
                variant="body2"
                color="secondary"
                className="mb-4"
                tKey={`results.item${item}.description`}
              />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="body2" tKey="results.score" />
                  <Typography variant="body2" tKey={`results.item${item}.score`} />
                </div>
                <div className="flex justify-between">
                  <Typography variant="body2" tKey="results.price" />
                  <Typography variant="body2" tKey={`results.item${item}.price`} />
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Typography component="span" tKey="results.details" />
                </Button>
                <Button size="sm" className="flex-1">
                  <Typography component="span" tKey="results.select" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            <Typography component="span" tKey="results.newRecommendation" />
          </Button>
        </div>
      </div>
    </main>
  );
}
