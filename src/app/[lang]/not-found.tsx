import { getDictionary } from '@/app/[lang]/dictionaries';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SupportedLang } from '@/lib/translations';

export default async function NotFoundPage({
  params,
}: {
  params?: Promise<{ lang: SupportedLang }>;
}) {
  // Handle case where params might be undefined (when not-found is called outside locale context)
  const lang = params ? (await params).lang : 'en';
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6 text-center">
      <Typography variant="h1" className="mb-4">
        404
      </Typography>
      <Typography variant="h2" className="mb-4">
        {dict.errors.notFound.title}
      </Typography>
      <Typography variant="body1" color="secondary" className="mb-8 max-w-md">
        {dict.errors.notFound.message}
      </Typography>
      <Link href={`/${lang}`}>
        <Button size="lg">
          <Typography component="span">{dict.errors.notFound.returnHome}</Typography>
        </Button>
      </Link>
    </div>
  );
}
