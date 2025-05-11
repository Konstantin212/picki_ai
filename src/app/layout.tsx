import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Picki AI - Compare and Make Better Decisions',
  description:
    'Picki AI helps you compare products, services, and options to make better-informed decisions with data-driven insights and personalized recommendations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
