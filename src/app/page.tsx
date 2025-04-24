import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { User, LogOut } from "lucide-react";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <Typography variant="h5" weight="bold" className="text-white">
                Picki AI
              </Typography>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full p-2"
              asChild
            >
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Link>
            </Button>

            <form action="/auth/sign-out" method="post">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2"
                type="submit"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Typography variant="h2" className="mb-6">
          Welcome, {session.user.email}
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your main content cards or sections here */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-md">
            <Typography variant="h4" className="mb-4">
              Your Dashboard
            </Typography>
            <Typography variant="body1" color="secondary">
              This is your personalized dashboard. Add your content here.
            </Typography>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <Typography variant="body2" align="center" color="secondary">
            © {new Date().getFullYear()} Picki AI. All rights reserved.
          </Typography>
        </div>
      </footer>
    </div>
  );
}
