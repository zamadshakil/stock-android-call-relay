import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if the user already has a subscription
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', user.id)
          .single();

        // New user (no subscription) → go to onboarding
        // Returning user → go to dashboard
        const redirectTo = subscription ? '/dashboard' : '/onboarding';
        return NextResponse.redirect(`${origin}${redirectTo}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could+not+authenticate+user`);
}
