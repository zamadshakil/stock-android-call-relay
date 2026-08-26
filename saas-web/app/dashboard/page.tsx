import type { Metadata } from "next";
import Link from "next/link";
import { Zap, LayoutDashboard, Download, CreditCard, User, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your CallRelay subscription, download the Android APK, and access the iPhone PWA.",
};

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "#overview" },
  { icon: Download, label: "Downloads", href: "#downloads" },
  { icon: CreditCard, label: "Billing", href: "#billing" },
  { icon: User, label: "Account", href: "#account" },
];

export default function DashboardPage() {
  // In production: this data comes from Supabase session + API call
  const mockSub = { plan: "Pro Monthly", status: "active", daysLeft: 18, renewDate: "Sep 13, 2026", priceLabel: "PKR 2,800/mo" };

  return (
    <div className={styles.dashPage}>

      {/* ─── SIDEBAR ─── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <Link href="/" className={styles.sidebarLogo}>
            <Zap size={18} className="text-accent inline-block mr-1" />
            Call<span>Relay</span>
          </Link>
          <nav className={styles.sidebarNav}>
            {SIDEBAR_ITEMS.map((item) => {
              const IconComp = item.icon;
              return (
                <a key={item.href} href={item.href} className={styles.sidebarLink}>
                  <span className={styles.sidebarIcon}>
                    <IconComp size={16} />
                  </span>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
        <div className={styles.sidebarBottom}>
          <div className={`badge ${mockSub.status === "active" ? "badge-success" : "badge-warning"}`}>
            <span className="status-dot active" />
            {mockSub.status === "active" ? "Active" : "Expired"}
          </div>
          <p className={styles.sidebarPlan}>{mockSub.plan}</p>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className={styles.dashMain}>

        {/* Overview */}
        <section id="overview" className={styles.panel}>
          <h1 className={styles.panelTitle}>Overview</h1>
          <div className={styles.statCards}>
            <div className={`card ${styles.statCard}`}>
              <p className={styles.statLabel}>Subscription</p>
              <p className={styles.statValue}>{mockSub.plan}</p>
              <span className="badge badge-success">Active</span>
            </div>
            <div className={`card ${styles.statCard}`}>
              <p className={styles.statLabel}>Days Remaining</p>
              <p className={styles.statValue}>{mockSub.daysLeft}</p>
              <p className={styles.statSub}>Renews {mockSub.renewDate}</p>
            </div>
            <div className={`card ${styles.statCard}`}>
              <p className={styles.statLabel}>Device Pairs</p>
              <p className={styles.statValue}>1 / 1</p>
              <p className={styles.statSub}>1 pair included</p>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section id="downloads" className={styles.panel}>
          <h2 className={styles.panelTitle}>Downloads &amp; Apps</h2>
          <p className={styles.panelSub}>Your subscription gives you access to both the Android APK and the iPhone PWA.</p>

          <div className={styles.downloadGrid}>
            {/* Android APK Card */}
            <div className={`card ${styles.downloadCard}`}>
              <div className={styles.downloadIconWrap}>
                <div className={styles.androidIcon}>
                  <svg viewBox="0 0 24 24" fill="none" width="48" height="48">
                    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zm-2.5-1C2.67 17 2 17.67 2 18.5v7c0 .83.67 1.5 1.5 1.5S5 26.33 5 25.5v-7C5 17.67 4.33 17 3.5 17zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zM15.53 2.16l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0 0 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" fill="#3DDC84"/>
                  </svg>
                </div>
                <span className="badge badge-success" style={{ marginTop: 8 }}>v{process.env.APK_CURRENT_VERSION || "1.0.0"}</span>
              </div>
              <div className={styles.downloadInfo}>
                <h3 className={styles.downloadTitle}>Android APK</h3>
                <p className={styles.downloadDesc}>Install on your Android phone. Set as default dialer to enable call relay.</p>
                <div className={styles.downloadMeta}>
                  <span>Android 10+</span>
                  <span>·</span>
                  <span>Requires Google Play Services</span>
                </div>
              </div>
              <a href="/api/downloads/apk" className="btn btn-primary btn-full" id="apk-download-btn">
                <Download size={16} /> Download APK
              </a>
              <details className={styles.setupDetails}>
                <summary>Setup instructions</summary>
                <ol className={styles.setupList}>
                  <li>Download the APK file to your Android phone</li>
                  <li>Enable &quot;Install from unknown sources&quot; in Settings</li>
                  <li>Open the APK and install Call Relay</li>
                  <li>Set Call Relay as your default phone app</li>
                  <li>Grant all requested permissions</li>
                </ol>
              </details>
            </div>

            {/* iPhone PWA Card */}
            <div className={`card ${styles.downloadCard}`}>
              <div className={styles.downloadIconWrap}>
                <div className={styles.iphoneIcon}>
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none">
                    <rect x="5" y="1" width="14" height="22" rx="3" fill="#fff" stroke="#ddd" strokeWidth="1"/>
                    <rect x="7" y="4" width="10" height="15" rx="1" fill="#007AFF"/>
                    <circle cx="12" cy="21" r="0.8" fill="#999"/>
                    <rect x="9.5" y="2" width="5" height="0.8" rx="0.4" fill="#ccc"/>
                    <text x="12" y="13" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">CR</text>
                  </svg>
                </div>
                <span className="badge badge-accent" style={{ marginTop: 8 }}>PWA</span>
              </div>
              <div className={styles.downloadInfo}>
                <h3 className={styles.downloadTitle}>iPhone PWA</h3>
                <p className={styles.downloadDesc}>Open in Safari on your iPhone. No App Store needed — it works as a Progressive Web App.</p>
                <div className={styles.downloadMeta}>
                  <span>iOS 15+</span>
                  <span>·</span>
                  <span>Safari required</span>
                </div>
              </div>
              <a href="#" className="btn btn-outline btn-full" id="pwa-open-btn">
                Open iPhone App <ArrowRight size={16} />
              </a>
              <details className={styles.setupDetails}>
                <summary>Setup instructions</summary>
                <ol className={styles.setupList}>
                  <li>Open this link in Safari on your iPhone</li>
                  <li>Tap the Share button (□↑) in Safari</li>
                  <li>Tap &quot;Add to Home Screen&quot;</li>
                  <li>Open Call Relay from your home screen</li>
                  <li>Allow microphone access when prompted</li>
                </ol>
              </details>
            </div>
          </div>
        </section>

        {/* Billing */}
        <section id="billing" className={styles.panel}>
          <h2 className={styles.panelTitle}>Billing</h2>
          <div className={`card ${styles.billingCard}`}>
            <div className={styles.billingInfo}>
              <div>
                <p className={styles.statLabel}>Current Plan</p>
                <p className={styles.billingPlan}>{mockSub.plan}</p>
                <p className={styles.billingPrice}>{mockSub.priceLabel}</p>
              </div>
              <div>
                <p className={styles.statLabel}>Next Renewal</p>
                <p className={styles.billingDate}>{mockSub.renewDate}</p>
              </div>
              <div>
                <p className={styles.statLabel}>Status</p>
                <span className="badge badge-success">Active</span>
              </div>
            </div>
            <div className={styles.billingActions}>
              <Link href="/pricing" className="btn btn-outline btn-sm">Upgrade Plan</Link>
              <button className="btn btn-ghost btn-sm" id="manage-billing-btn">
                Manage Billing <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Account */}
        <section id="account" className={styles.panel}>
          <h2 className={styles.panelTitle}>Account</h2>
          <div className={`card ${styles.accountCard}`}>
            <div className={styles.accountRow}>
              <div className={styles.accountAvatar}>U</div>
              <div>
                <p className={styles.accountName}>User Name</p>
                <p className={styles.accountEmail}>user@example.com</p>
              </div>
            </div>
            <div className={styles.accountActions}>
              <button className="btn btn-ghost btn-sm">Change Password</button>
              <button className="btn btn-danger btn-sm" id="signout-btn">Sign Out</button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
