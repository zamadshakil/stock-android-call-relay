import type { Metadata } from "next";
import Link from "next/link";
import styles from "../auth.module.css";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your CallRelay account and start your 7-day free trial. No credit card required.",
};

export default function SignupPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.authOrb} />
      <div className={styles.authCard}>
        <Link href="/" className={styles.authLogo}>⚡ Call<span>Relay</span></Link>
        <h1 className={styles.authTitle}>Get started free</h1>
        <p className={styles.authSub}>7-day free trial · No credit card required</p>

        {/* Google button */}
        <button className={styles.googleBtn} id="google-signup-btn">
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/><path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"/></svg>
          Continue with Google
        </button>

        <div className="divider-text">or sign up with email</div>

        <form className={styles.form} id="signup-form">
          <div className="form-group">
            <label className="label" htmlFor="signup-name">Full name</label>
            <input className="input" type="text" id="signup-name" name="name" placeholder="Your name" required autoComplete="name" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="signup-email">Email address</label>
            <input className="input" type="email" id="signup-email" name="email" placeholder="you@example.com" required autoComplete="email" />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="signup-password">Password</label>
            <input className="input" type="password" id="signup-password" name="password" placeholder="Min 8 characters" required minLength={8} autoComplete="new-password" />
          </div>
          <div className={styles.termsRow}>
            <input type="checkbox" id="signup-terms" required />
            <label htmlFor="signup-terms" className={styles.termsLabel}>
              I agree to the <Link href="/terms" className={styles.switchLink}>Terms of Service</Link> and <Link href="/privacy" className={styles.switchLink}>Privacy Policy</Link>
            </label>
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg">Create Account →</button>
        </form>

        <p className={styles.switchAuth}>
          Already have an account? <Link href="/login" className={styles.switchLink}>Log in →</Link>
        </p>
      </div>
    </div>
  );
}
