import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Dictionary, getDictionary } from '@/app/[lang]/dictionaries';
import { SupportedLang } from '@/lib/translations';
import Link from 'next/link';
import ResultsLayout from '@/components/Results/ResultsLayout';
import { Navbar } from '@/components/Navbar';
import { createClient } from '@/lib/supabase-server';
import { ListFilter, Sparkles } from 'lucide-react';
import { PageHeader, ControlsRow } from '@/components/ui';

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ lang: SupportedLang }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const resultsDict = dict.results as Dictionary['results'];
  // Get session for authentication state (for navbar)
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <head>
        <title>Picki AI — Results</title>
      </head>
      <Navbar dict={dict} lang={lang} session={session} />
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-12">
        <div className="mx-auto w-full max-w-7xl">
          <PageHeader title={resultsDict.title} description={resultsDict.description} />

          {/* Controls row: tabs and filter (visual only) */}
          <ControlsRow
            leftContent={
              <>
                <Button variant="filter-pill-active" size="sm" className="gap-1.5">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  Best Match
                </Button>
                <Button variant="filter-pill" size="sm">
                  Animated List
                </Button>
              </>
            }
            rightContent={
              <Button variant="filter-button" size="sm" className="gap-2">
                <ListFilter className="h-4 w-4 text-gray-300" />
                Filter
              </Button>
            }
          />

          <ResultsLayout />

          <div className="mt-8 text-center">
            <Link href={`/${lang}/start`}>
              <Button variant="outline" size="lg">
                <Typography component="span">{resultsDict.newRecommendation}</Typography>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
