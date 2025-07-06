import { redirect } from 'next/navigation';

export default function GlobalNotFound() {
  // Redirect to default locale (English)
  redirect('/en');
}
