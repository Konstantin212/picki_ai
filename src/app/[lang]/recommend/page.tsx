import { createClient } from '@/lib/supabase';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect } from 'next/navigation';
import { getDictionary } from '@/app/[lang]/dictionaries';

export default async function RecommendPage({
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
    <main className="flex min-h-screen flex-col bg-gray-900 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <Typography variant="h1" className="mb-4">
            {dict.recommend.title}
          </Typography>
          <Typography variant="body1" color="secondary" className="mx-auto max-w-2xl">
            {dict.recommend.description}
          </Typography>
        </div>

        <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
          <form className="space-y-6">
            <div>
              <Typography variant="h3" className="mb-2">
                {dict.recommend.preferences}
              </Typography>
              <Input placeholder="Enter your preferences..." className="w-full" />
            </div>

            <div>
              <Typography variant="h3" className="mb-2">
                {dict.recommend.criteria}
              </Typography>
              <Input placeholder="What criteria are important to you?" className="w-full" />
            </div>

            <div className="flex justify-center">
              <Button size="lg" type="submit">
                <Typography component="span">{dict.recommend.getRecommendations}</Typography>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
