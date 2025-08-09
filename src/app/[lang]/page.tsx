import { getDictionary } from '@/app/[lang]/dictionaries';
import { Navbar } from '@/components/Navbar';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { SupportedLang } from '@/lib/translations';
import { createClient } from '@/lib/supabase-server';
import { ArrowRight, BarChart3, Brain, Target } from 'lucide-react';
import TiltedCard from '@/components/TiltedCard';
import DarkVeil from '@/components/backgrounds/DarkVeil';

export default async function HomePage({ params }: { params: Promise<{ lang: SupportedLang }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Get session for authentication state
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <head>
        <title>Picki AI — Home</title>
      </head>
      <Navbar dict={dict} lang={lang} session={session} />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="relative">
          {/* Hero Section */}
          <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
            {/* Dark Veil WebGL background (slightly transparent so base gradient tints it) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
              <DarkVeil className="h-full w-full opacity-80" speed={0.8} hueShift={350} />
            </div>
            <div className="relative z-10 mx-auto max-w-4xl">
              <Typography
                variant="h1"
                className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              >
                {dict.home.heroTitle}
              </Typography>
              <Typography
                variant="body1"
                color="secondary"
                className="mb-12 max-w-3xl text-lg text-gray-300 md:text-xl"
              >
                {dict.home.heroDescription}
              </Typography>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                <Link href={`/${lang}/start`}>
                  <Button variant="gradient" size="xl" className="w-full rounded-xl sm:w-auto">
                    <div className="flex items-center justify-center">
                      <Typography component="span" className="text-white">
                        {dict.home.getStarted}
                      </Typography>
                      <ArrowRight className="ml-2 h-5 w-5 text-white" />
                    </div>
                  </Button>
                </Link>
                <Link href={`/${lang}/recommend`}>
                  <Button variant="outline" size="xl" className="w-full rounded-xl sm:w-auto">
                    <Typography component="span">{dict.home.learnMore}</Typography>
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative border-t border-gray-700/50 bg-gray-900/80 px-6 py-24 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 text-center">
                <Typography
                  variant="h2"
                  className="mb-6 text-center text-3xl font-bold text-white md:text-4xl"
                >
                  {dict.home.featuresTitle}
                </Typography>
                <Typography
                  variant="body1"
                  color="secondary"
                  className="mx-auto max-w-3xl text-lg text-gray-300"
                >
                  {dict.home.featuresDescription}
                </Typography>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {/* Feature 1 */}
                <TiltedCard minHeight={280}>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-blue-400 transition-all duration-300 group-hover:scale-110">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <Typography variant="h3" className="mb-4 text-xl font-semibold text-white">
                    {dict.home.feature1Title}
                  </Typography>
                  <Typography variant="body2" color="secondary" className="text-gray-300">
                    {dict.home.feature1Description}
                  </Typography>
                </TiltedCard>

                {/* Feature 2 */}
                <TiltedCard minHeight={280}>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-purple-400 transition-all duration-300 group-hover:scale-110">
                    <Brain className="h-8 w-8" />
                  </div>
                  <Typography variant="h3" className="mb-4 text-xl font-semibold text-white">
                    {dict.home.feature2Title}
                  </Typography>
                  <Typography variant="body2" color="secondary" className="text-gray-300">
                    {dict.home.feature2Description}
                  </Typography>
                </TiltedCard>

                {/* Feature 3 */}
                <TiltedCard minHeight={280}>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-blue-400 transition-all duration-300 group-hover:scale-110">
                    <Target className="h-8 w-8" />
                  </div>
                  <Typography variant="h3" className="mb-4 text-xl font-semibold text-white">
                    {dict.home.feature3Title}
                  </Typography>
                  <Typography variant="body2" color="secondary" className="text-gray-300">
                    {dict.home.feature3Description}
                  </Typography>
                </TiltedCard>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative border-t border-gray-600/30 bg-gray-800/60 px-6 py-24 text-center backdrop-blur-sm">
            <div className="mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-700/70 to-gray-800/70 p-12 shadow-2xl ring-1 ring-gray-600/50 backdrop-blur-sm">
                <Typography variant="h2" className="mb-6 text-3xl font-bold text-white md:text-4xl">
                  {dict.home.ctaTitle}
                </Typography>
                <Typography
                  variant="body1"
                  color="secondary"
                  className="mb-10 text-lg text-gray-300"
                >
                  {dict.home.ctaDescription}
                </Typography>
                <Link href={`/${lang}/start`}>
                  <Button variant="gradient" size="xl" className="rounded-xl px-10">
                    <div className="flex items-center justify-center">
                      <Typography component="span" className="text-white">
                        {dict.home.ctaButton}
                      </Typography>
                      <ArrowRight className="ml-2 h-5 w-5 text-white" />
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
