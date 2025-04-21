import * as React from "react";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { login, signup } from "@/app/login/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
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
            <Button formAction={signup} fullWidth type="submit">
              Sign up
            </Button>
          </div>

          <div className="text-sm text-center">
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Button formAction={login} variant="link" type="submit">
                Sign in
              </Button>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
