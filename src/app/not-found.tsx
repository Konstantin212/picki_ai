import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-6 py-24 text-center">
      <Typography variant="h2" className="mb-6" tKey="notFound.title" />
      <Typography variant="body1" color="secondary" className="mb-8" tKey="notFound.message" />
      <Button asChild size="lg">
        <Link href="/">
          <Typography component="span" tKey="notFound.returnHome" />
        </Link>
      </Button>
    </main>
  );
}
