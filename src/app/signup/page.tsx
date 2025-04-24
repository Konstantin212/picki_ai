import * as React from 'react';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { login, signup } from '@/app/login/actions';
import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export default async function SignUpPage({ searchParams }: { searchParams: { error?: string } }) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Typography variant="h2" align="center" className="mt-6">
            Create your account
          </Typography>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              label="Email address"
            />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Password"
              label="Password"
            />
          </div>

          {searchParams.error && (
            <Typography variant="body2" color="error" align="center">
              {searchParams.error}
            </Typography>
          )}

          <div>
            <button
              formAction={signup}
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Sign up
            </button>
          </div>

          <div className="text-center text-sm">
            <Typography variant="body2" align="center">
              Already have an account?{' '}
              <button
                formAction={login}
                className="text-indigo-600 underline hover:text-indigo-500"
                type="submit"
              >
                Sign in
              </button>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
