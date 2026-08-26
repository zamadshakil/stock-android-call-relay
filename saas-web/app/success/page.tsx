import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "Payment Successful" };

export default function SuccessPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.confetti}>🎉</div>
        <h1 className={styles.title}>You&apos;re all set!</h1>
        <p className={styles.sub}>Your subscription is now active. Welcome to CallRelay.</p>
        <div className={styles.details}>
          <div className={styles.detail}><span>✓</span><span>APK download unlocked</span></div>
          <div className={styles.detail}><span>✓</span><span>iPhone PWA access active</span></div>
          <div className={styles.detail}><span>✓</span><span>1 device pair included</span></div>
        </div>
        <Link href="/dashboard" className="btn btn-primary btn-full btn-lg">Go to Dashboard →</Link>
      </div>
    </div>
  );
}
