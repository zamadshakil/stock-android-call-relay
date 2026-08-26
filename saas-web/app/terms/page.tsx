import type { Metadata } from "next";
import styles from "./legal.module.css";
export const metadata: Metadata = { title: "Terms of Service", description: "CallRelay Terms of Service." };
export default function TermsPage() {
  return (
    <div className={styles.page}><div className={styles.content}>
      <span className="section-label">Legal</span>
      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.updated}>Last updated: August 2026</p>
      <section><h2>1. Acceptance of Terms</h2><p>By creating an account and using CallRelay, you agree to these Terms of Service. If you do not agree, do not use the service.</p></section>
      <section><h2>2. Description of Service</h2><p>CallRelay is an experimental call relay service that bridges audio from an Android SIM to an iPhone browser using WebRTC technology. The service is provided &quot;as is&quot; and is subject to change.</p></section>
      <section><h2>3. Prohibited Uses</h2><p>You may not use CallRelay for: emergency calls (911, 15, 115 or equivalent), short codes, MMI/USSD, any illegal interception, unauthorized recording of calls, or any activity that violates local telecommunications law.</p></section>
      <section><h2>4. Consent Requirement</h2><p>You must obtain explicit consent from every call participant before using call relay. Failure to do so may violate wiretapping and recording laws in your jurisdiction.</p></section>
      <section><h2>5. Subscriptions and Billing</h2><p>Subscriptions are billed in PKR via Stripe. You may cancel anytime; access continues until the end of the billing period. We offer a 30-day money-back guarantee on paid plans.</p></section>
      <section><h2>6. Privacy</h2><p>We do not record or store call audio. Call metadata expires after 24 hours. See our Privacy Policy for full details.</p></section>
      <section><h2>7. Limitation of Liability</h2><p>CallRelay is an experimental product. We are not liable for call quality, missed calls, or any direct or indirect damages arising from use of the service.</p></section>
      <section><h2>8. Contact</h2><p>Questions? Email us at <a href="mailto:support@callrelay.app">support@callrelay.app</a></p></section>
    </div></div>
  );
}
