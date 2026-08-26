import type { Metadata } from "next";
import Link from "next/link";
import { 
  Radio, Shield, Mic, Bell, Smartphone, Zap, 
  Sliders, ShieldCheck, FileCheck, AlertTriangle, ArrowRight 
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore CallRelay's powerful features: real-time audio relay, end-to-end encryption, three relay modes, instant push notifications, and full call control from your iPhone.",
};

const FEATURES = [
  {
    icon: Radio,
    title: "Real-time Call Relay",
    desc: "Sub-second audio bridging over LiveKit WebRTC. Your calls relay with minimal latency over any WiFi or mobile data connection.",
    tag: "Core",
  },
  {
    icon: Shield,
    title: "End-to-End Encrypted",
    desc: "Every device uses a unique P-256 ECDSA key pair. Communications are signed and verified — no man-in-the-middle possible.",
    tag: "Security",
  },
  {
    icon: Mic,
    title: "Three Relay Modes",
    desc: "Listen-only, Talk-only, or Full Duplex — switch modes live during a call. Perfect for different use cases.",
    tag: "Audio",
  },
  {
    icon: Bell,
    title: "Instant Push Notifications",
    desc: "Firebase Cloud Messaging delivers call alerts to your iPhone the moment a call arrives on your Android — even when the app is closed.",
    tag: "Notifications",
  },
  {
    icon: Smartphone,
    title: "No App Store Required",
    desc: "The iPhone side runs as a Progressive Web App (PWA) directly in Safari. No App Store approval, no downloads, just open the URL.",
    tag: "Convenience",
  },
  {
    icon: Zap,
    title: "Full Call Control",
    desc: "Mute, unmute, send DTMF tones, switch relay modes — all from your iPhone. Complete control without touching the Android.",
    tag: "Control",
  },
];

const DEEP_DIVES = [
  {
    icon: Sliders,
    title: "Three Relay Modes, Your Way",
    subtitle: "Flexible audio for every situation",
    points: [
      { label: "Listen Mode", desc: "Hear the caller on your iPhone. Speak from Android. Great for monitoring calls hands-free." },
      { label: "Talk Mode", desc: "Speak from your iPhone, caller hears your voice. Android stays silent." },
      { label: "Full Duplex", desc: "Complete two-way audio. Both you and the caller interact naturally through your iPhone." },
    ],
    note: "Full duplex performance is handset and firmware dependent. We recommend testing on your specific device.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Privacy by Design",
    subtitle: "Your calls are yours — we never store them",
    points: [
      { label: "Zero audio storage", desc: "No call audio is ever recorded or stored. The relay is live-only." },
      { label: "24-hour metadata expiry", desc: "Call metadata (timing, IDs) automatically purges after 24 hours." },
      { label: "Invite-only enrollment", desc: "Only your paired devices can relay. No unauthorized access." },
    ],
    note: "This system is designed for consenting, non-emergency calls only.",
  },
  {
    icon: FileCheck,
    title: "Compatibility",
    subtitle: "Works with your existing devices",
    points: [
      { label: "Android: API 29+", desc: "Any Android phone running Android 10 or newer with a working SIM and Google Play Services." },
      { label: "iPhone: Any modern iOS", desc: "Works in Safari on any iPhone with iOS 15+. No native app install needed." },
      { label: "Network: WiFi or 4G/5G", desc: "Both devices need an active internet connection. Works on any ISP." },
    ],
    note: "The Android phone must remain powered on with the Call Relay app in the foreground or as a foreground service.",
  },
];

const SPECS = [
  { label: "Android minimum", value: "API 29 (Android 10)" },
  { label: "iPhone minimum", value: "iOS 15 (Safari)" },
  { label: "Network", value: "WiFi or 4G/5G" },
  { label: "Audio protocol", value: "LiveKit WebRTC" },
  { label: "Push delivery", value: "Firebase Cloud Messaging" },
  { label: "Encryption", value: "P-256 ECDSA + WebRTC DTLS" },
  { label: "Device pairs", value: "1 per subscription" },
  { label: "Audio storage", value: "None — zero storage" },
  { label: "Metadata retention", value: "24 hours max" },
  { label: "Relay modes", value: "Listen, Talk, Full Duplex" },
  { label: "Call controls", value: "Mute, DTMF, mode switch" },
  { label: "Emergency calls", value: "Not supported" },
];

export default function FeaturesPage() {
  return (
    <div className={styles.page}>

      {/* ─── PAGE HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className="section-label">Features</span>
            <h1 className={styles.heroTitle}>
              Everything You Need to<br />
              <span className="gradient-text">Stay Connected</span>
            </h1>
            <p className={styles.heroSub}>
              Powerful features engineered for seamless, secure call relay between your Android and iPhone.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FEATURE GRID ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.featureGrid}>
            {FEATURES.map((f, i) => {
              const IconComp = f.icon;
              return (
                <div key={i} className={`card ${styles.featureCard}`}>
                  <div className={styles.cardTag}>
                    <span className="badge badge-primary">{f.tag}</span>
                  </div>
                  <div className={styles.featureIcon}>
                    <IconComp size={24} className="text-accent" />
                  </div>
                  <h2 className={styles.featureTitle}>{f.title}</h2>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DEEP DIVE SECTIONS ─── */}
      {DEEP_DIVES.map((dive, i) => {
        const DiveIcon = dive.icon;
        return (
          <section key={i} className={`section ${i % 2 === 0 ? styles.altSection : ""}`}>
            <div className="container">
              <div className={`${styles.deepDive} ${i % 2 !== 0 ? styles.deepDiveReverse : ""}`}>
                <div className={styles.deepDiveText}>
                  <span className={styles.deepDiveIcon}>
                    <DiveIcon size={24} className="text-accent" />
                  </span>
                  <span className="section-label">{dive.subtitle}</span>
                  <h2 className="section-title">{dive.title}</h2>
                  <div className={styles.pointsList}>
                    {dive.points.map((p, pi) => (
                      <div key={pi} className={styles.point}>
                        <div className={styles.pointDot} />
                        <div>
                          <p className={styles.pointLabel}>{p.label}</p>
                          <p className={styles.pointDesc}>{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {dive.note && (
                    <p className={styles.note}>
                      <AlertTriangle size={16} className="text-warning inline-block mr-1 align-text-bottom" />
                      {dive.note}
                    </p>
                  )}
                </div>
                <div className={styles.deepDiveVisual}>
                  <div className={styles.visualBox}>
                    <span className={styles.visualIcon}>
                      <DiveIcon size={48} className="text-accent opacity-80" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── TECH SPECS ─── */}
      <section className={`section ${styles.specsSection}`}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">Technical Specs</span>
            <h2 className="section-title">Requirements at a <span className="gradient-text">Glance</span></h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Specification</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {SPECS.map(({ label, value }) => (
                  <tr key={label}>
                    <td className={styles.specLabel}>{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to try it for free?</h2>
            <p className={styles.ctaSub}>7-day free trial. No credit card required. Cancel anytime.</p>
            <div className={styles.ctaBtns}>
              <Link href="/signup" className="btn btn-primary btn-lg">
                Start Free Trial <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" className="btn btn-outline btn-lg">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
