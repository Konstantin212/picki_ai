import { type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();

    // Get the current URL to determine redirect logic
    const currentUrl = new URL(request.url);
    const pathname = currentUrl.pathname;

    // If user is on home page, redirect to same page to refresh session state
    // If user is on any other page, redirect to home page
    const isHomePage = pathname === '/' || pathname.match(/^\/[a-z]{2}$/); // Matches /en, /de, /uk, etc.

    if (isHomePage) {
      // Stay on home page but refresh to update session state
      return NextResponse.redirect(currentUrl);
    } else {
      // Redirect to home page
      const homeUrl = new URL('/', currentUrl.origin);
      return NextResponse.redirect(homeUrl);
    }
  } catch (error) {
    console.error('Logout error:', error);
    // Fallback to home page on error
    return NextResponse.redirect(new URL('/', request.url));
  }
}
