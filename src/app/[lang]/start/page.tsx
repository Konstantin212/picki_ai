import { createClient } from '@/lib/supabase';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { getDictionary } from '@/app/[lang]/dictionaries';

export default async function StartPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'de' | 'uk' }>;
}) {
  const { lang } = await params;
  const supabase = await createClient();
  const dict = await getDictionary(lang);

  // Get session for auth state
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect(`/${lang}/login`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Typography variant="h1" className="mb-6">
          {dict.start.title}
        </Typography>
        <Typography variant="body1" color="secondary" className="mb-8">
          {dict.start.description}
        </Typography>

        <div className="space-y-4">
          <Button size="lg" className="w-full sm:w-auto">
            <Typography component="span">{dict.start.beginSetup}</Typography>
          </Button>
        </div>
      </div>
    </main>
  );
}
