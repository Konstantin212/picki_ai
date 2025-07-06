import { createClient } from '@/lib/supabase';
import { Navbar } from '@/components/navigation/Navbar';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Search, Check } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const supabase = await createClient();

  // Get session for auth state
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <Navbar session={session} />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-indigo-900 px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <Typography variant="h1" className="mb-6" tKey="home.heroTitle" />
            <Typography
              variant="body1"
              color="secondary"
              className="mb-8"
              tKey="home.heroDescription"
            />
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg">
                <Link href="/login" className="flex items-center">
                  <Typography component="span" tKey="home.getStarted" />
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#features">
                  <Typography component="span" tKey="home.learnMore" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <Typography variant="h2" className="mb-4" tKey="home.featuresTitle" />
              <Typography
                variant="body1"
                color="secondary"
                className="mx-auto max-w-2xl"
                tKey="home.featuresDescription"
              />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 shadow-md">
                <div className="mb-4 rounded-full bg-indigo-600 p-3">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <Typography variant="h4" className="mb-2 text-center" tKey="home.feature1Title" />
                <Typography
                  variant="body2"
                  color="secondary"
                  className="text-center"
                  tKey="home.feature1Description"
                />
              </div>

              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 shadow-md">
                <div className="mb-4 rounded-full bg-indigo-600 p-3">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
                <Typography variant="h4" className="mb-2 text-center" tKey="home.feature2Title" />
                <Typography
                  variant="body2"
                  color="secondary"
                  className="text-center"
                  tKey="home.feature2Description"
                />
              </div>

              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 shadow-md">
                <div className="mb-4 rounded-full bg-indigo-600 p-3">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <Typography variant="h4" className="mb-2 text-center" tKey="home.feature3Title" />
                <Typography
                  variant="body2"
                  color="secondary"
                  className="text-center"
                  tKey="home.feature3Description"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-800 px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Typography variant="h3" className="mb-6" tKey="home.ctaTitle" />
            <Typography
              variant="body1"
              color="secondary"
              className="mb-8"
              tKey="home.ctaDescription"
            />
            <Button asChild size="lg">
              <Link href="/login">
                <Typography component="span" tKey="home.ctaButton" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
