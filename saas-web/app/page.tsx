import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CallRelay — Android Calls on Your iPhone",
  description: "CallRelay bridges your Android SIM calls to your iPhone in real-time. No SIM change. 7-day free trial.",
};

const FEATURES_PREVIEW = [
  { icon: "📡", title: "Real-time Relay", desc: "Sub-second audio bridging over LiveKit WebRTC." },
  { icon: "🔒", title: "End-to-End Encrypted", desc: "P-256 key pairs. Zero audio storage, ever." },
  { icon: "🎤", title: "Three Relay Modes", desc: "Listen, Talk, or Full Duplex — your choice." },
];

const STEPS = [
  { num: "01", icon: "🤖", title: "Install APK on Android", desc: "Download and install the CallRelay APK on your Android phone. Set it as your default dialer." },
  { num: "02", icon: "🍎", title: "Open PWA on iPhone", desc: "Open CallRelay in Safari on your iPhone. No App Store download needed — it works as a PWA." },
  { num: "03", icon: "⚡", title: "Calls Relay Seamlessly", desc: "When a call comes in, your iPhone gets an instant push notification and audio bridges in real-time." },
];

export default function HomePage() {
  return (
    <div className={styles.page}>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className="container">
          <div className={styles.heroContent}>
            <div className={`badge badge-accent ${styles.heroBadge}`}>
              <span>✦</span> Now in Beta — 7-Day Free Trial
            </div>

            <h1 className={styles.heroTitle}>
              Your Android&apos;s Calls.<br />
              <span className="gradient-text">On Your iPhone.</span>
            </h1>

            <p className={styles.heroSub}>
              CallRelay bridges the gap — keep your SIM on Android, answer and speak through your iPhone in real-time. No carrier switch. No SIM swap.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/signup" className="btn btn-primary btn-lg">
                Start Free Trial — PKR 0
              </Link>
              <Link href="/features" className="btn btn-outline btn-lg">
                See How It Works →
              </Link>
            </div>

            <div className={styles.heroStats}>
              <span>✓ 7-day free trial</span>
              <span>✓ No SIM change needed</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>

          {/* Phone animation */}
          <div className={styles.heroVisual}>
            <div className={styles.phoneLeft}>
              <div className={styles.phoneScreen}>
                <div className={styles.phoneStatusBar}>
                  <span>9:41</span>
                  <span>📶 SIM</span>
                </div>
                <div className={styles.callCard}>
                  <div className={styles.callAvatar}>📞</div>
                  <p className={styles.callName}>Incoming Call</p>
                  <p className={styles.callNumber}>+92 300 1234567</p>
                  <div className={styles.callButtons}>
                    <span className={styles.callAccept}>✓</span>
                    <span className={styles.callDecline}>✗</span>
                  </div>
                </div>
              </div>
              <p className={styles.phoneLabel}>Android (SIM stays here)</p>
            </div>

            <div className={styles.signalWaves}>
              <div className={styles.wave} />
              <div className={styles.wave} />
              <div className={styles.wave} />
              <div className={styles.waveArrow}>⚡</div>
            </div>

            <div className={styles.phoneRight}>
              <div className={`${styles.phoneScreen} ${styles.iphoneScreen}`}>
                <div className={styles.phoneStatusBar}>
                  <span>9:41</span>
                  <span>📶 WiFi</span>
                </div>
                <div className={`${styles.callCard} ${styles.callCardActive}`}>
                  <div className={`${styles.callAvatar} ${styles.callAvatarActive}`}>🎤</div>
                  <p className={styles.callName}>Relaying Call</p>
                  <p className={styles.callNumber}>Full Duplex Active</p>
                  <div className={styles.audioBars}>
                    {[40, 70, 55, 85, 60, 75, 45].map((h, i) => (
                      <div key={i} className={styles.audioBar} style={{ "--h": `${h}%`, "--delay": `${i * 0.1}s` } as React.CSSProperties} />
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.phoneLabel}>iPhone (speak &amp; listen here)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className={styles.trustBar}>
        <div className="container">
          <div className={styles.trustItems}>
            <span>🛡️ End-to-end encrypted</span>
            <span className={styles.trustDot} />
            <span>📵 No audio stored</span>
            <span className={styles.trustDot} />
            <span>🔄 Cancel anytime</span>
            <span className={styles.trustDot} />
            <span>📱 All Android phones</span>
            <span className={styles.trustDot} />
            <span>🍎 No iPhone app install</span>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">Simple Setup</span>
            <h2 className="section-title">Up and running in <span className="gradient-text">3 steps</span></h2>
            <p className="section-subtitle">No complex configuration. No carrier changes. Works with your existing SIM and iPhone.</p>
          </div>

          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
                {i < STEPS.length - 1 && <div className={styles.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE PREVIEW ─── */}
      <section className={`section ${styles.featuresSection}`}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">Features</span>
            <h2 className="section-title">Built for <span className="gradient-text">real conversations</span></h2>
            <p className="section-subtitle">Premium audio relay with the security and controls you need.</p>
          </div>

          <div className="grid grid-3">
            {FEATURES_PREVIEW.map((f, i) => (
              <div key={i} className="card">
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.featuresCta}>
            <Link href="/features" className="btn btn-outline">
              See All Features →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PRICING PREVIEW ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">Pricing</span>
            <h2 className="section-title">Simple <span className="gradient-text">PKR pricing</span></h2>
            <p className="section-subtitle">Start free. Upgrade when you&apos;re ready. Cancel anytime.</p>
          </div>

          <div className={styles.pricingPreview}>
            <div className={`card ${styles.planCard}`}>
              <p className={styles.planName}>Free Trial</p>
              <p className={styles.planPrice}>PKR 0</p>
              <p className={styles.planPeriod}>7 days, full access</p>
              <ul className="check-list" style={{ margin: "24px 0" }}>
                <li>APK download access</li>
                <li>iPhone PWA access</li>
                <li>1 device pair</li>
              </ul>
              <Link href="/signup" className="btn btn-outline btn-full">Start Free</Link>
            </div>

            <div className={`card ${styles.planCard} ${styles.planCardFeatured}`}>
              <div className={`badge badge-primary ${styles.popularBadge}`}>Most Popular</div>
              <p className={styles.planName}>Pro Monthly</p>
              <p className={styles.planPrice}>PKR 2,800</p>
              <p className={styles.planPeriod}>per month</p>
              <ul className="check-list" style={{ margin: "24px 0" }}>
                <li>Everything in Free</li>
                <li>Email support</li>
                <li>1 device pair</li>
              </ul>
              <Link href="/signup" className="btn btn-primary btn-full">Get Pro →</Link>
            </div>

            <div className={`card ${styles.planCard}`}>
              <p className={styles.planName}>Pro Annual</p>
              <p className={styles.planPrice}>PKR 22,000</p>
              <p className={styles.planPeriod}>per year · save 34%</p>
              <ul className="check-list" style={{ margin: "24px 0" }}>
                <li>Everything in Pro</li>
                <li>Priority support</li>
                <li>1 device pair</li>
              </ul>
              <Link href="/pricing" className="btn btn-outline btn-full">See All Plans</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaOrb} />
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to bridge your devices?</h2>
            <p className={styles.ctaSub}>Start your 7-day free trial today. No credit card required.</p>
            <Link href="/signup" className="btn btn-primary btn-lg">
              Get Started Free →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
