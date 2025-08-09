import { getDictionary, type RecommendDict } from '@/app/[lang]/dictionaries';
import { TranslationParams, Langs } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { RecommendationForm } from '@/components/RecommendationForm';
import { RecommendationTitle } from '@/components/RecommendationForm/RecommendationTitle';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function RecommendPage({
  params,
}: {
  params: Promise<TranslationParams> | undefined;
}) {
  const { lang } = params ? await params : { lang: Langs.en };
  const fullDict = await getDictionary(lang);
  const dict = fullDict.recommend as RecommendDict;

  return (
    <>
      <Navbar dict={fullDict} lang={lang} />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <RecommendationTitle dict={dict} />
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,146,172,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
          {/* Back Navigation */}
          <Link
            href={`/${lang}`}
            className="absolute left-6 top-6 flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white md:left-8 md:top-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Main Content */}
          <div className="w-full max-w-4xl">
            <div className="overflow-hidden rounded-2xl bg-gray-800/50 shadow-2xl ring-1 ring-gray-700/50 backdrop-blur-sm">
              <div className="px-8 py-8 sm:px-10 sm:py-10">
                <RecommendationForm dict={dict} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
