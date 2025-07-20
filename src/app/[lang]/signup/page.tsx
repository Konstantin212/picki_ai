import { getDictionary } from '@/app/[lang]/dictionaries';
import { AuthForm } from '@/components/AuthForm';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SupportedLang } from '@/lib/translations';

export default async function SignupPage({ params }: { params: Promise<{ lang: SupportedLang }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict} lang={lang} showNavItems={false} />
      <main className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>

        <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
          {/* Back to Home Link */}
          <Link
            href={`/${lang}`}
            className="absolute left-6 top-6 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white md:left-8 md:top-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Auth Container */}
          <div className="w-full max-w-md">
            <div className="overflow-hidden rounded-2xl bg-gray-800/50 shadow-2xl ring-1 ring-gray-700/50 backdrop-blur-sm">
              <div className="px-8 py-8 sm:px-10 sm:py-10">
                <AuthForm dict={dict} mode="signup" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
