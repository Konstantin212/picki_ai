import { createClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("data");
  console.log(data);

  console.log("error");
  console.log(error);

  debugger;

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }

  return NextResponse.redirect(new URL("/", request.url));
}
