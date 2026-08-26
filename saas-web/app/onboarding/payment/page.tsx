"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Zap, CreditCard, Lock, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import styles from "./page.module.css";

const PLAN_DETAILS: Record<string, { name: string; price: string; period: string }> = {
  pro_monthly: { name: "Pro Monthly", price: "PKR 2,800", period: "per month" },
  pro_annual:  { name: "Pro Annual",  price: "PKR 22,000", period: "per year" },
};

function PaymentForm() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = params.get("plan") || "pro_monthly";
  const planInfo = PLAN_DETAILS[plan] || PLAN_DETAILS.pro_monthly;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Format card number with spaces
  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  // Format expiry MM/YY
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic demo validation
    if (cardNumber.replace(/\s/g, "").length < 16) {
      setError("Please enter a valid 16-digit card number.");
      return;
    }
    if (expiry.length < 5) {
      setError("Please enter a valid expiry date (MM/YY).");
      return;
    }
    if (cvv.length < 3) {
      setError("Please enter a valid CVV.");
      return;
    }

    setLoading(true);

    // Simulate payment processing delay
    await new Promise((r) => setTimeout(r, 1800));

    try {
      const res = await fetch("/api/subscriptions/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        const data = await res.json();
        setError(data.error || "Payment failed. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successScreen}>
        <div className={styles.successIcon}>
          <CheckCircle2 size={48} />
        </div>
        <h2 className={styles.successTitle}>Payment Successful!</h2>
        <p className={styles.successSub}>
          Your <strong>{planInfo.name}</strong> plan is now active. Redirecting to your dashboard...
        </p>
        <div className={styles.successLoader}>
          <Loader2 size={20} className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {/* Order summary */}
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Plan</span>
          <span className={styles.summaryValue}>{planInfo.name}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Amount</span>
          <span className={styles.summaryPrice}>{planInfo.price}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Billing</span>
          <span className={styles.summaryValue}>{planInfo.period}</span>
        </div>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Cardholder Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Name on card"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="cc-name"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Card Number</label>
          <div className={styles.inputIcon}>
            <CreditCard size={16} className={styles.inputIconSvg} />
            <input
              className={`${styles.input} ${styles.inputWithIcon}`}
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCard(e.target.value))}
              required
              autoComplete="cc-number"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Expiry Date</label>
            <input
              className={styles.input}
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              required
              autoComplete="cc-exp"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>CVV</label>
            <input
              className={styles.input}
              type="text"
              inputMode="numeric"
              placeholder="•••"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
              required
              autoComplete="cc-csc"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-full btn-lg ${styles.payBtn}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing payment...
            </>
          ) : (
            <>
              <Lock size={16} />
              Pay {planInfo.price}
            </>
          )}
        </button>
      </form>

      <p className={styles.secureNote}>
        <Lock size={12} />
        Demo mode — no real payment is processed
      </p>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bgOrb} />

      <header className={styles.header}>
        <Link href="/onboarding" className={styles.backBtn}>
          <ArrowLeft size={16} />
          Back to plans
        </Link>
        <Link href="/" className={styles.logo}>
          <Zap size={18} />
          Call<span>Relay</span>
        </Link>
      </header>

      <div className={styles.content}>
        <div className={styles.heading}>
          <span className="section-label">Secure Checkout</span>
          <h1 className={styles.title}>Complete your <span className="gradient-text">subscription</span></h1>
        </div>

        <Suspense fallback={<div className={styles.card} style={{ padding: 48, textAlign: "center" }}><Loader2 size={24} className="animate-spin" /></div>}>
          <PaymentForm />
        </Suspense>
      </div>
    </div>
  );
}
