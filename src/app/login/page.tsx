import * as React from 'react';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { login, signup } from '@/app/login/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string; redirectedFrom?: string };
}) {
  const supabase = await createClient();
  const params = await searchParams;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect(params.redirectedFrom || '/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Typography variant="h2" align="center" className="mt-6">
            Sign in to your account
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
              autoComplete="current-password"
              required
              placeholder="Password"
              label="Password"
            />
          </div>

          {params.error && (
            <Typography variant="body2" color="error" align="center">
              {params.error}
            </Typography>
          )}

          {params.message && (
            <Typography variant="body2" color="success" align="center">
              {params.message}
            </Typography>
          )}

          <div>
            <Button formAction={login} fullWidth type="submit">
              Sign in
            </Button>
          </div>

          <div className="text-center text-sm">
            <Typography variant="body2" align="center">
              Don&apos;t have an account?{' '}
              <Button formAction={signup} variant="link" type="submit">
                Sign up
              </Button>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
