import { createClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${request.headers.get("origin")}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(
      new URL(`/signup?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }

  // If email confirmation is required, show a message
  if (data?.user?.identities?.length === 0) {
    return NextResponse.redirect(
      new URL(
        "/signup?error=Email already registered. Please sign in instead.",
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      "/login?message=Check your email to confirm your account",
      request.url
    )
  );
}
