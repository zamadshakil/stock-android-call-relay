import type { Metadata } from "next";
import styles from "../terms/legal.module.css";
export const metadata: Metadata = { title: "Privacy Policy", description: "CallRelay Privacy Policy." };
export default function PrivacyPage() {
  return (
    <div className={styles.page}><div className={styles.content}>
      <span className="section-label">Legal</span>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: August 2026</p>
      <section><h2>1. No Audio Storage</h2><p>CallRelay does not record, store, or analyze any call audio. All audio relay is live-only and exists only in transit via LiveKit WebRTC.</p></section>
      <section><h2>2. Call Metadata</h2><p>We store minimal call metadata (session IDs, timestamps, device IDs) to operate the relay service. This data is automatically deleted after 24 hours.</p></section>
      <section><h2>3. Account Data</h2><p>We store your email address and subscription status via Supabase to manage your account. We do not sell this data to any third parties.</p></section>
      <section><h2>4. Payment Data</h2><p>Payment information is processed entirely by Stripe. We do not store credit card numbers or payment details on our servers.</p></section>
      <section><h2>5. Device Keys</h2><p>Each device has a unique P-256 cryptographic key pair. Private keys never leave your device. We store only public keys.</p></section>
      <section><h2>6. Analytics</h2><p>We do not use analytics services, advertising networks, or any third-party tracking on this website.</p></section>
      <section><h2>7. Contact</h2><p>For privacy questions, contact: <a href="mailto:support@callrelay.app">support@callrelay.app</a></p></section>
    </div></div>
  );
}
