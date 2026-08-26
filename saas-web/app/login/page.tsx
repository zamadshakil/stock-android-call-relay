"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import styles from "../auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError(null);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes("your-project")) {
        setTimeout(() => {
          router.push("/dashboard");
        }, 600);
        return;
      }

      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (authError) {
        setError(authError.message);
        setGoogleLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl.includes("your-project")) {
        setTimeout(() => {
          router.push("/dashboard");
        }, 600);
        return;
      }

      const supabase = createClient();
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
      } else {
        // Check if user has a subscription → onboarding if not
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("user_id", signInData.user!.id)
          .single();
        router.push(sub ? "/dashboard" : "/onboarding");
      }
    } catch (err: any) {
      setError(err?.message || "An error occurred during log in.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authOrb} />
      <div className={styles.authCard}>
        <Link href="/" className={styles.authLogo}>
          <Zap size={20} className="text-accent inline-block mr-1" />
          Call<span>Relay</span>
        </Link>
        <h1 className={styles.authTitle}>Welcome back</h1>
        <p className={styles.authSub}>Log in to your CallRelay account</p>

        {error && (
          <div className="badge badge-danger" style={{ width: "100%", padding: "10px 14px", marginBottom: 16, textTransform: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Google button */}
        <button 
          className={styles.googleBtn} 
          id="google-signin-btn"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          type="button"
        >
          {googleLoading ? (
            <Loader2 size={18} className="animate-spin text-accent" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/><path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"/></svg>
          )}
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <div className="divider-text">or continue with email</div>

        <form className={styles.form} id="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="login-email">Email address</label>
            <input 
              className="input" 
              type="email" 
              id="login-email" 
              name="email" 
              placeholder="you@example.com" 
              required 
              autoComplete="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className={styles.labelRow}>
              <label className="label" htmlFor="login-password">Password</label>
              <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <input 
              className="input" 
              type="password" 
              id="login-password" 
              name="password" 
              placeholder="••••••••" 
              required 
              autoComplete="current-password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading || googleLoading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Log In"}
          </button>
        </form>

        <p className={styles.switchAuth}>
          Don&apos;t have an account? <Link href="/signup" className={styles.switchLink}>Sign up free <ArrowRight size={14} className="inline-block" /></Link>
        </p>
      </div>
    </div>
  );
}
