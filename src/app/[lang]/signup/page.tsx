import { getDictionary } from '@/app/[lang]/dictionaries';
import { AuthForm } from '@/components/auth/AuthForm';

export default async function SignupPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'de' | 'uk' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <AuthForm dict={dict} mode="signup" />;
}
