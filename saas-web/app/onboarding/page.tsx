"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Check, ArrowRight, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import styles from "./page.module.css";

const PLANS = [
  {
    id: "free_trial",
    name: "Free Trial",
    price: "PKR 0",
    period: "7 days",
    desc: "Full access to try CallRelay at no cost.",
    features: ["APK download access", "iPhone PWA access", "1 device pair", "Community support", "All relay modes"],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: "PKR 2,800",
    period: "per month",
    desc: "Everything you need for ongoing relay access.",
    features: ["Everything in Free Trial", "Email support", "1 device pair", "All relay modes", "Priority bug fixes"],
    cta: "Get Pro Monthly",
    featured: true,
  },
  {
    id: "pro_annual",
    name: "Pro Annual",
    price: "PKR 22,000",
    period: "per year",
    desc: "Best value — save 34% vs monthly.",
    features: ["Everything in Pro Monthly", "Priority email support", "1 device pair", "All relay modes", "Early feature access"],
    cta: "Get Annual",
    featured: false,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handlePlan = async (planId: string) => {
    setLoading(planId);

    if (planId === "free_trial") {
      // Activate directly — no payment needed
      try {
        const res = await fetch("/api/subscriptions/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: "free_trial" }),
        });
        if (res.ok) {
          router.push("/dashboard");
        } else {
          setLoading(null);
        }
      } catch {
        setLoading(null);
      }
    } else {
      // Go to demo payment page
      router.push(`/onboarding/payment?plan=${planId}`);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bgOrb} />
      <div className={styles.bgOrb2} />

      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Zap size={20} />
          Call<span>Relay</span>
        </Link>
      </header>

      <div className={styles.content}>
        <div className={styles.heading}>
          <span className="section-label">Welcome to CallRelay</span>
          <h1 className={styles.title}>Choose your <span className="gradient-text">plan</span></h1>
          <p className={styles.subtitle}>
            Start free for 7 days. Upgrade anytime. Cancel anytime.
          </p>
        </div>

        {/* Plan cards */}
        <div className={styles.plans}>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${plan.featured ? styles.featured : ""}`}
            >
              {plan.featured && (
                <div className={styles.popularBadge}>
                  <Sparkles size={12} />
                  Most Popular
                </div>
              )}

              <div className={styles.planHeader}>
                <p className={styles.planName}>{plan.name}</p>
                <p className={styles.planDesc}>{plan.desc}</p>
              </div>

              <div className={styles.planPricing}>
                <span className={styles.planPrice}>{plan.price}</span>
                <span className={styles.planPeriod}> / {plan.period}</span>
              </div>

              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <Check size={14} className={styles.checkIcon} />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`btn btn-full ${plan.featured ? "btn-primary" : "btn-outline"}`}
                onClick={() => handlePlan(plan.id)}
                disabled={loading !== null}
              >
                {loading === plan.id ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    {plan.cta}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <p className={styles.guarantee}>
          <ShieldCheck size={15} />
          30-day money-back guarantee on all paid plans. No questions asked.
        </p>
      </div>
    </div>
  );
}
