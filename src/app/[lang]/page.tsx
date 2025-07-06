import { getDictionary } from '@/app/[lang]/dictionaries';
import { Navbar } from '@/components/navigation/Navbar';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'de' | 'uk' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center bg-gray-900 px-6 py-24 text-center">
          <Typography variant="h1" className="mb-6">
            {dict.home.heroTitle}
          </Typography>
          <Typography variant="body1" color="secondary" className="mb-8 max-w-2xl">
            {dict.home.heroDescription}
          </Typography>
          <div className="space-x-4">
            <Link href={`/${lang}/start`}>
              <Button size="lg">
                <Typography component="span">{dict.home.getStarted}</Typography>
              </Button>
            </Link>
            <Link href={`/${lang}/recommend`}>
              <Button variant="outline" size="lg">
                <Typography component="span">{dict.home.learnMore}</Typography>
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-800 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <Typography variant="h2" className="mb-4">
                {dict.home.featuresTitle}
              </Typography>
              <Typography variant="body1" color="secondary" className="mx-auto max-w-2xl">
                {dict.home.featuresDescription}
              </Typography>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <Typography variant="h3" className="mb-4">
                  {dict.home.feature1Title}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {dict.home.feature1Description}
                </Typography>
              </div>
              <div className="text-center">
                <Typography variant="h3" className="mb-4">
                  {dict.home.feature2Title}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {dict.home.feature2Description}
                </Typography>
              </div>
              <div className="text-center">
                <Typography variant="h3" className="mb-4">
                  {dict.home.feature3Title}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {dict.home.feature3Description}
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 px-6 py-24 text-center">
          <div className="mx-auto max-w-4xl">
            <Typography variant="h2" className="mb-6">
              {dict.home.ctaTitle}
            </Typography>
            <Typography variant="body1" color="secondary" className="mb-8">
              {dict.home.ctaDescription}
            </Typography>
            <Link href={`/${lang}/start`}>
              <Button size="lg">
                <Typography component="span">{dict.home.ctaButton}</Typography>
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
