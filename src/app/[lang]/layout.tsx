import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from '@/providers/providers';
import { SupportedLang } from '@/lib/translations';
import '../globals.css';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/images/logo.svg', type: 'image/svg+xml' },
      { url: '/images/logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/logo.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: ['/images/logo.png'],
    apple: [{ url: '/images/logo.png' }],
  },
};

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
