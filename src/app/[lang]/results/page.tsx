import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Dictionary, getDictionary } from '@/app/[lang]/dictionaries';
import { SupportedLang } from '@/lib/translations';
import Link from 'next/link';
import ResultsViewer from '@/components/ResultsViewer';

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ lang: SupportedLang }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const resultsDict = dict.results as Dictionary['results'];

  return (
    <>
      <head>
        <title>Picki AI — Results</title>
      </head>
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

          <div className="rounded-2xl bg-gray-800/50 p-6 ring-1 ring-gray-700/50">
            <ResultsViewer />
          </div>

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
