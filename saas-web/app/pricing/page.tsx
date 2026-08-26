"use client";
import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, ShieldCheck, Check, Minus, ChevronDown, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

const PLANS = {
  monthly: [
    {
      name: "Free Trial",
      price: "PKR 0",
      period: "7 days",
      desc: "Full access to try CallRelay at no cost.",
      features: ["APK download access", "iPhone PWA access", "1 device pair", "Community support", "All relay modes"],
      cta: "Start Free Trial",
      href: "/signup",
      featured: false,
    },
    {
      name: "Pro Monthly",
      price: "PKR 2,800",
      period: "per month",
      desc: "Everything you need for ongoing relay access.",
      features: ["Everything in Free Trial", "Email support", "1 device pair", "All relay modes", "Priority bug fixes"],
      cta: "Get Pro",
      href: "/signup",
      featured: true,
    },
    {
      name: "Pro Annual",
      price: "PKR 22,000",
      period: "per year",
      desc: "Best value — save 34% vs monthly.",
      features: ["Everything in Pro Monthly", "Priority email support", "1 device pair", "All relay modes", "Early access to new features"],
      cta: "Get Annual",
      href: "/signup",
      featured: false,
    },
  ],
  annual: [
    {
      name: "Free Trial",
      price: "PKR 0",
      period: "7 days",
      desc: "Full access to try CallRelay at no cost.",
      features: ["APK download access", "iPhone PWA access", "1 device pair", "Community support", "All relay modes"],
      cta: "Start Free Trial",
      href: "/signup",
      featured: false,
    },
    {
      name: "Pro Annual",
      price: "PKR 22,000",
      period: "per year · save 34%",
      desc: "Best value — the full experience.",
      features: ["Everything in Free Trial", "Priority email support", "1 device pair", "All relay modes", "Early access to new features"],
      cta: "Get Annual",
      href: "/signup",
      featured: true,
    },
    {
      name: "Pro Monthly",
      price: "PKR 2,800",
      period: "per month",
      desc: "Flexible monthly billing if you prefer.",
      features: ["Everything in Free Trial", "Email support", "1 device pair", "All relay modes", "Priority bug fixes"],
      cta: "Get Monthly",
      href: "/signup",
      featured: false,
    },
  ],
};

const COMPARISON = [
  { feature: "APK Download", trial: true, monthly: true, annual: true },
  { feature: "iPhone PWA Access", trial: true, monthly: true, annual: true },
  { feature: "Device Pairs", trial: "1", monthly: "1", annual: "1" },
  { feature: "Relay Modes (Listen/Talk/Duplex)", trial: true, monthly: true, annual: true },
  { feature: "Push Notifications", trial: true, monthly: true, annual: true },
  { feature: "DTMF & Mute Control", trial: true, monthly: true, annual: true },
  { feature: "Community Support", trial: true, monthly: true, annual: true },
  { feature: "Email Support", trial: false, monthly: true, annual: true },
  { feature: "Priority Support", trial: false, monthly: false, annual: true },
  { feature: "Early Feature Access", trial: false, monthly: false, annual: true },
];

const FAQS = [
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription at any time from the billing panel in your dashboard. You'll keep access until the end of your current billing period." },
  { q: "What happens after the free trial ends?", a: "After 7 days, you'll be prompted to subscribe. Your access will be paused until you choose a plan. Your enrolled devices and pairings are preserved." },
  { q: "Does it work on all Android phones?", a: "CallRelay works on Android 10 (API 29) and above with Google Play Services. Full duplex audio quality is handset-dependent — we recommend testing on your specific device first." },
  { q: "Is my call audio stored anywhere?", a: "No. CallRelay is a live relay system only. No audio is recorded or stored at any time. Call metadata (timing, IDs) expires automatically after 24 hours." },
  { q: "Can I use one subscription on multiple device pairs?", a: "Each subscription covers 1 Android device paired with 1 iPhone. Multiple pairs require separate subscriptions." },
  { q: "What currency are prices in?", a: "All prices are in Pakistani Rupees (PKR) and are processed securely via Stripe." },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const plans = PLANS[billing];

  return (
    <div className={styles.page}>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className="section-label">Pricing</span>
            <h1 className={styles.heroTitle}>
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className={styles.heroSub}>
              Start free for 7 days. No credit card required. Prices in PKR.
            </p>

            {/* Toggle */}
            <div className={styles.toggle}>
              <button
                className={`${styles.toggleBtn} ${billing === "monthly" ? styles.toggleActive : ""}`}
                onClick={() => setBilling("monthly")}
              >
                Monthly
              </button>
              <button
                className={`${styles.toggleBtn} ${billing === "annual" ? styles.toggleActive : ""}`}
                onClick={() => setBilling("annual")}
              >
                Annual
                <span className={styles.saveBadge}>Save 34%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLAN CARDS ─── */}
      <section className={styles.plansSection}>
        <div className="container">
          <div className={styles.plans}>
            {plans.map((plan, i) => (
              <div key={i} className={`card ${styles.planCard} ${plan.featured ? styles.featured : ""}`}>
                {plan.featured && (
                  <div className={`badge badge-primary ${styles.popularBadge}`}>
                    <Sparkles size={12} /> Most Popular
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
                <ul className={`check-list ${styles.planFeatures}`}>
                  {plan.features.map((f, fi) => <li key={fi}>{f}</li>)}
                </ul>
                <Link href={plan.href} className={`btn btn-full ${plan.featured ? "btn-primary" : "btn-outline"}`}>
                  {plan.cta} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          <p className={styles.guarantee}>
            <ShieldCheck size={16} className="text-accent inline-block mr-1.5 align-text-bottom" />
            30-day money-back guarantee on all paid plans. No questions asked.
          </p>
        </div>
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">Compare Plans</span>
            <h2 className="section-title">Full <span className="gradient-text">Feature Comparison</span></h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th style={{ textAlign: "center" }}>Free Trial</th>
                  <th style={{ textAlign: "center" }}>Pro Monthly</th>
                  <th style={{ textAlign: "center" }}>Pro Annual</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(({ feature, trial, monthly, annual }) => (
                  <tr key={feature}>
                    <td>{feature}</td>
                    {[trial, monthly, annual].map((val, vi) => (
                      <td key={vi} style={{ textAlign: "center" }}>
                        {typeof val === "boolean"
                          ? val 
                            ? <Check size={16} className="text-success inline-block" /> 
                            : <Minus size={16} className="text-muted inline-block" />
                          : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container-sm">
          <div className="section-header centered">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Common <span className="gradient-text">Questions</span></h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}>
                <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-accent transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} 
                  />
                </button>
                {openFaq === i && <p className={styles.faqA}>{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Start your free trial today</h2>
            <p className={styles.ctaSub}>7 days free. No credit card. Cancel anytime.</p>
            <Link href="/signup" className="btn btn-primary btn-lg">
              Get Started Free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
