import { createClient } from '@/lib/supabase';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { Dictionary, getDictionary } from '@/app/[lang]/dictionaries';
import { SupportedLang } from '@/lib/translations';

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ lang: SupportedLang }>;
}) {
  const { lang } = await params;
  const supabase = await createClient();
  const dict = await getDictionary(lang);
  const resultsDict = dict.results as Dictionary['results'];

  // Get session for auth state
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect(`/${lang}/login`);
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-900 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <Typography variant="h1" className="mb-4">
            {resultsDict.title}
          </Typography>
          <Typography variant="body1" color="secondary" className="mx-auto max-w-2xl">
            {resultsDict.description}
          </Typography>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Sample recommendation cards */}
          {[1, 2, 3].map((item) => {
            const itemData = resultsDict[`item${item}` as keyof Dictionary['results']] as
              | Dictionary['results']
              | undefined;
            return (
              <div key={item} className="rounded-lg bg-gray-800 p-6 shadow-lg">
                <Typography variant="h3" className="mb-2">
                  {itemData?.title || `Item ${item}`}
                </Typography>
                <Typography variant="body2" color="secondary" className="mb-4">
                  {itemData?.description || `Description for item ${item}`}
                </Typography>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Typography variant="body2">{resultsDict.score}</Typography>
                    <Typography variant="body2">{itemData?.score || 'N/A'}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="body2">{resultsDict.price}</Typography>
                    <Typography variant="body2">{itemData?.price || 'N/A'}</Typography>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Typography component="span">{resultsDict.details}</Typography>
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Typography component="span">{resultsDict.select}</Typography>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            <Typography component="span">{resultsDict.newRecommendation}</Typography>
          </Button>
        </div>
      </div>
    </main>
  );
}
