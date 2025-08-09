import { getDictionary } from '@/app/[lang]/dictionaries';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { SupportedLang } from '@/lib/translations';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: SupportedLang }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <head>
        <title>Picki AI — Profile</title>
      </head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h1" className="mb-6">
            {dict.profile.title}
          </Typography>
          <Typography variant="body1" color="secondary" className="mb-8">
            {dict.profile.personalInfo}
          </Typography>
          <Button size="lg">
            <Typography component="span">{dict.profile.preferences}</Typography>
          </Button>
        </div>
      </main>
    </>
  );
}
