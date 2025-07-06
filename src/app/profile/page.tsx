import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function ProfilePage() {
  const supabase = await createClient();

  // Get session to check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect('/login?redirectedFrom=/profile');
  }

  // Get authenticated user data - more secure than using session directly
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Dummy user data
  const userData = {
    name: 'John Doe',
    email: user?.email || 'unknown@example.com',
    role: 'User',
    joinedDate: 'January 2023',
    preferences: {
      itemsPerPage: 10,
      darkMode: true,
      notifications: {
        email: true,
        push: false,
      },
    },
    recentComparisons: [
      { id: 1, title: 'Laptop Comparison: Dell XPS vs MacBook Pro', date: '2023-10-15' },
      { id: 2, title: 'Smartphone Comparison: iPhone 15 vs Pixel 8', date: '2023-09-28' },
      { id: 3, title: 'Headphones Comparison: Sony vs Bose', date: '2023-08-17' },
    ],
  };

  return (
    <main className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Typography variant="h2" className="mb-6">
          User Profile
        </Typography>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-gray-800 p-6 shadow-md">
          <div className="flex flex-col items-center">
            <div className="relative mb-4 h-32 w-32">
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
                {userData.name
                  .split(' ')
                  .map((name) => name[0])
                  .join('')}
              </div>
            </div>
            <Typography variant="h4" className="mb-1">
              {userData.name}
            </Typography>
            <Typography variant="body2" color="secondary" className="mb-4">
              {userData.email}
            </Typography>
            <div className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-medium">
              {userData.role}
            </div>
            <Typography variant="body2" color="muted" className="mt-4">
              Member since {userData.joinedDate}
            </Typography>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6 shadow-md md:col-span-2">
          <Typography variant="h4" className="mb-6">
            User Preferences
          </Typography>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Typography variant="h6" className="mb-2">
                Display Settings
              </Typography>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="body2">Items per page</Typography>
                  <Typography variant="body2" color="primary">
                    {userData.preferences.itemsPerPage}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body2">Dark mode</Typography>
                  <Typography variant="body2" color="primary">
                    {userData.preferences.darkMode ? 'On' : 'Off'}
                  </Typography>
                </div>
              </div>
            </div>

            <div>
              <Typography variant="h6" className="mb-2">
                Notification Settings
              </Typography>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="body2">Email notifications</Typography>
                  <Typography variant="body2" color="primary">
                    {userData.preferences.notifications.email ? 'On' : 'Off'}
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="body2">Push notifications</Typography>
                  <Typography variant="body2" color="primary">
                    {userData.preferences.notifications.push ? 'On' : 'Off'}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-800 p-6 shadow-md md:col-span-3">
          <Typography variant="h4" className="mb-6">
            Recent Comparisons
          </Typography>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Comparison
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {userData.recentComparisons.map((comparison) => (
                  <tr key={comparison.id} className="hover:bg-gray-700">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                      {comparison.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                      {comparison.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
