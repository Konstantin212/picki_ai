import { ReactNode } from 'react';
import { Providers } from '@/providers/providers';
import { SupportedLang } from '@/lib/translations';
import '../globals.css';

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: SupportedLang }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
