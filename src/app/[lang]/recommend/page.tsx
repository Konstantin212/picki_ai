import { getDictionary, type RecommendDict } from '@/app/[lang]/dictionaries';
import { TranslationParams, Langs } from '@/lib/translations';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function RecommendPage({
  params,
}: {
  params: Promise<TranslationParams> | undefined;
}) {
  const { lang } = params ? await params : { lang: Langs.en };
  const dict = (await getDictionary(lang)).recommend as RecommendDict;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Typography variant="h1" className="mb-6">
          {dict.title}
        </Typography>
        <Typography variant="body1" color="secondary" className="mb-8">
          {dict.description}
        </Typography>
        <Link href={`/${lang}/results`}>
          <Button size="lg">
            <Typography component="span">{dict.getRecommendations}</Typography>
          </Button>
        </Link>
      </div>
    </main>
  );
}
