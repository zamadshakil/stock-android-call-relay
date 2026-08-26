import type { Metadata } from "next";
import Link from "next/link";
import { 
  Radio, Cloud, Bell, Database, ShieldAlert, Clock, Key, Lock, 
  Trash2, EyeOff, AlertOctagon, Users, Volume2, FlaskConical, Globe, 
  Smartphone, Apple, Frown, ArrowDown, Zap, Mail, ArrowRight 
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CallRelay — why we built it, how it works, and our commitment to privacy. We built CallRelay because we faced the two-phone problem ourselves.",
};

const TECH_STACK = [
  { icon: Radio, name: "LiveKit WebRTC", desc: "Real-time audio relay infrastructure" },
  { icon: Cloud, name: "Cloudflare Workers", desc: "Zero-latency global edge API" },
  { icon: Bell, name: "Firebase Cloud Messaging", desc: "Instant push notification delivery" },
  { icon: Database, name: "Cloudflare D1", desc: "Lightweight SQLite at the edge" },
];

const PRIVACY_POINTS = [
  { icon: ShieldAlert, text: "No call audio is ever recorded or stored" },
  { icon: Clock, text: "Call metadata expires automatically after 24 hours" },
  { icon: Key, text: "Each device has a unique cryptographic key pair (P-256)" },
  { icon: Lock, text: "Enrollment requires an invite — no open registration" },
  { icon: Trash2, text: "Request nonces expire after 10 minutes" },
  { icon: EyeOff, text: "No analytics, no tracking, no ad networks" },
];

const LIMITATIONS = [
  { icon: AlertOctagon, text: "Not for emergency calls (911, 15, 115, etc.)" },
  { icon: Users, text: "Requires explicit consent from all call participants" },
  { icon: Volume2, text: "Android uses acoustic relay — speaker and mic are audible in the room" },
  { icon: FlaskConical, text: "Experimental — full duplex quality depends on your specific Android handset" },
  { icon: Globe, text: "Both devices require an active internet connection" },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>

      {/* ─── HERO ─── */}
      <section className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className="container">
          <div className={styles.heroContent}>
            <span className="section-label">About Us</span>
            <h1 className={styles.heroTitle}>
              Built for Real People<br />
              <span className="gradient-text">With Two Phones</span>
            </h1>
            <p className={styles.heroSub}>
              We built CallRelay because we faced this exact problem — a work SIM on Android, a personal iPhone, and no good way to handle calls across both.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionText}>
              <span className="section-label">Our Mission</span>
              <h2 className="section-title">Bridging the <span className="gradient-text">Device Gap</span></h2>
              <p className={styles.missionPara}>
                Millions of people carry two phones — one Android with a work or primary SIM, and an iPhone as their daily driver. The current solutions are bad: call forwarding loses the original caller ID, dual-SIM iPhones aren&apos;t universally available, and carrier solutions are expensive and limited.
              </p>
              <p className={styles.missionPara}>
                CallRelay takes a different approach. Your SIM stays on the Android. Your calls relay in real-time to your iPhone browser via WebRTC audio. No carrier changes. No SIM swap. No complex setup.
              </p>
              <div className={styles.missionStats}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>3</span>
                  <span className={styles.statLabel}>Relay modes</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <span className={styles.statNum}>0</span>
                  <span className={styles.statLabel}>Audio stored</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <span className={styles.statNum}>24h</span>
                  <span className={styles.statLabel}>Metadata expiry</span>
                </div>
              </div>
            </div>
            <div className={styles.missionVisual}>
              <div className={styles.problemBox}>
                <p className={styles.problemLabel}>The Problem</p>
                <div className={styles.problemItem}>
                  <Smartphone size={18} className="text-accent" />
                  <span>Work SIM on Android — can&apos;t easily use iPhone</span>
                </div>
                <div className={styles.problemItem}>
                  <Apple size={18} className="text-accent" />
                  <span>iPhone is the preferred daily device</span>
                </div>
                <div className={styles.problemItem}>
                  <Frown size={18} className="text-warning" />
                  <span>Carrying two phones everywhere is frustrating</span>
                </div>
                <div className={styles.problemArrow}>
                  <ArrowDown size={18} className="text-accent" />
                </div>
                <div className={styles.solutionBox}>
                  <Zap size={20} className="text-accent" />
                  <p className={styles.solutionText}>CallRelay bridges both devices seamlessly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT'S BUILT ─── */}
      <section className={`section ${styles.techSection}`}>
        <div className="container">
          <div className="section-header centered">
            <span className="section-label">Technical Transparency</span>
            <h2 className="section-title">How It&apos;s <span className="gradient-text">Built</span></h2>
            <p className="section-subtitle">We use proven, production-grade infrastructure. No custom media servers — just best-in-class tools.</p>
          </div>
          <div className={styles.techGrid}>
            {TECH_STACK.map((t, i) => {
              const IconComp = t.icon;
              return (
                <div key={i} className="card">
                  <div className={styles.techIcon}>
                    <IconComp size={24} className="text-accent" />
                  </div>
                  <h3 className={styles.techName}>{t.name}</h3>
                  <p className={styles.techDesc}>{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PRIVACY ─── */}
      <section className="section">
        <div className="container">
          <div className={styles.privacyGrid}>
            <div>
              <span className="section-label">Privacy</span>
              <h2 className="section-title">Your Calls Are <span className="gradient-text">Yours</span></h2>
              <p className={styles.missionPara} style={{ maxWidth: 460 }}>
                We built this tool for ourselves first. We never want our calls stored, tracked, or analysed. So we didn&apos;t build any of that.
              </p>
            </div>
            <ul className={styles.privacyList}>
              {PRIVACY_POINTS.map((p, i) => {
                const IconComp = p.icon;
                return (
                  <li key={i} className={styles.privacyItem}>
                    <span className={styles.privacyIcon}>
                      <IconComp size={18} className="text-accent" />
                    </span>
                    <span>{p.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── LIMITATIONS ─── */}
      <section className={`section ${styles.limitsSection}`}>
        <div className="container-sm">
          <div className="section-header centered">
            <span className="section-label">Honest Disclosure</span>
            <h2 className="section-title">Important <span className="gradient-text">Limitations</span></h2>
            <p className="section-subtitle">We believe in transparency. Here&apos;s what CallRelay cannot do.</p>
          </div>
          <div className={styles.limitsList}>
            {LIMITATIONS.map((l, i) => {
              const IconComp = l.icon;
              return (
                <div key={i} className={styles.limitItem}>
                  <span className={styles.limitIcon}>
                    <IconComp size={18} className="text-warning" />
                  </span>
                  <span>{l.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactContent}>
            <h2 className={styles.contactTitle}>Have Questions?</h2>
            <p className={styles.contactSub}>We&apos;re a small team and we respond to every message personally.</p>
            <a href="mailto:support@callrelay.app" className="btn btn-primary btn-lg">
              <Mail size={16} /> Contact Support
            </a>
            <p className={styles.contactNote}>Or start with our <Link href="/pricing" className={styles.contactLink}>free trial</Link> — no commitment required.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
