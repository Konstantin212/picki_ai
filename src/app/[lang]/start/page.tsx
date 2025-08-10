import { Dictionary, getDictionary } from '@/app/[lang]/dictionaries';
import { TranslationParams } from '@/lib/translations';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default async function StartPage({ params }: { params: Promise<TranslationParams> }) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)).start as Dictionary['start'];

  return (
    <>
      <head>
        <title>Picki AI — Start</title>
      </head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h1" className="mb-6">
            {dict.title}
          </Typography>
          <Typography variant="body1" color="secondary" className="mb-8">
            {dict.description}
          </Typography>
          <Link href={`/${lang}/recommend`}>
            <Button size="lg">
              <Typography component="span">{dict.beginSetup}</Typography>
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
