import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan } = await request.json();
    const validPlans = ['free_trial', 'pro_monthly', 'pro_annual'];
    if (!validPlans.includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Calculate subscription end date
    const now = new Date();
    let trialEndsAt: string | null = null;
    let currentPeriodEnd: string | null = null;

    if (plan === 'free_trial') {
      const end = new Date(now);
      end.setDate(end.getDate() + 7);
      trialEndsAt = end.toISOString();
    } else if (plan === 'pro_monthly') {
      const end = new Date(now);
      end.setDate(end.getDate() + 30);
      currentPeriodEnd = end.toISOString();
    } else if (plan === 'pro_annual') {
      const end = new Date(now);
      end.setFullYear(end.getFullYear() + 1);
      currentPeriodEnd = end.toISOString();
    }

    // Upsert subscription (one per user)
    const { error: subError } = await supabase
      .from('subscriptions')
      .upsert(
        {
          user_id: user.id,
          plan,
          status: 'active',
          trial_ends_at: trialEndsAt,
          current_period_end: currentPeriodEnd,
        },
        { onConflict: 'user_id' }
      );

    if (subError) {
      return NextResponse.json({ error: subError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
