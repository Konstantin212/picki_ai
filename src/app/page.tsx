import { createClient } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart2, Search, Check } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();

  // Get session for auth state
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Note: For better security, consider using getUser() in components that need authenticated user data
  // const { data: userData } = await supabase.auth.getUser();

  return (
    <>
      <Navbar session={session} />
      <main className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-indigo-900 px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <Typography variant="h1" className="mb-6">
              Make Better Decisions with Picki AI
            </Typography>
            <Typography variant="body1" color="secondary" className="mb-8">
              Compare products, services, and options with our advanced AI-powered comparison
              engine. Get insights, analysis, and recommendations tailored to your needs.
            </Typography>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Button size="lg">
                <Link href="/login" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-900 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <Typography variant="h2" className="mb-4">
                Why Choose Picki AI
              </Typography>
              <Typography variant="body1" color="secondary" className="mx-auto max-w-2xl">
                Our platform offers powerful tools to help you make informed decisions by comparing
                options across multiple parameters.
              </Typography>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 shadow-md">
                <div className="mb-4 rounded-full bg-indigo-600 p-3">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <Typography variant="h4" className="mb-2 text-center">
                  Detailed Comparisons
                </Typography>
                <Typography variant="body2" color="secondary" className="text-center">
                  Compare products side-by-side with detailed specifications, features, and user
                  reviews.
                </Typography>
              </div>

              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 shadow-md">
                <div className="mb-4 rounded-full bg-indigo-600 p-3">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
                <Typography variant="h4" className="mb-2 text-center">
                  Data-Driven Insights
                </Typography>
                <Typography variant="body2" color="secondary" className="text-center">
                  Get objective analysis backed by data to help you understand the pros and cons of
                  each option.
                </Typography>
              </div>

              <div className="flex flex-col items-center rounded-lg bg-gray-800 p-6 shadow-md">
                <div className="mb-4 rounded-full bg-indigo-600 p-3">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <Typography variant="h4" className="mb-2 text-center">
                  Personalized Recommendations
                </Typography>
                <Typography variant="body2" color="secondary" className="text-center">
                  Get tailored suggestions based on your specific needs, preferences, and
                  priorities.
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-800 px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Typography variant="h3" className="mb-6">
              Ready to make better decisions?
            </Typography>
            <Typography variant="body1" color="secondary" className="mb-8">
              Join thousands of users who use Picki AI to make confident, informed choices.
            </Typography>
            <Button size="lg">
              <Link href="/login">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
