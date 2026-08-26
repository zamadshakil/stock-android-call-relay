import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Admin — CallRelay",
  description: "Admin dashboard for CallRelay.",
};

// Mock data — replaced with real Supabase queries in production
const STATS = [
  { label: "Total Users", value: "248", icon: "👥", change: "+12 this week" },
  { label: "Active Subscriptions", value: "184", icon: "💳", change: "74% conversion" },
  { label: "Trial Users", value: "36", icon: "⏱️", change: "7-day trials" },
  { label: "Revenue (PKR)", value: "515,200", icon: "💰", change: "This month" },
];

const RECENT_USERS = [
  { email: "user1@example.com", plan: "Pro Monthly", status: "active", joined: "Aug 26, 2026" },
  { email: "user2@example.com", plan: "Free Trial", status: "trialing", joined: "Aug 25, 2026" },
  { email: "user3@example.com", plan: "Pro Annual", status: "active", joined: "Aug 24, 2026" },
  { email: "user4@example.com", plan: "Free Trial", status: "expired", joined: "Aug 20, 2026" },
  { email: "user5@example.com", plan: "Pro Monthly", status: "past_due", joined: "Aug 18, 2026" },
];

const STATUS_BADGE: Record<string, string> = {
  active: "badge-success",
  trialing: "badge-accent",
  expired: "badge-danger",
  past_due: "badge-warning",
};

export default function AdminPage() {
  return (
    <div className={styles.adminPage}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>⚡ Call<span>Relay</span></Link>
        <p className={styles.adminLabel}>Admin Panel</p>
        <nav className={styles.sidebarNav}>
          {[
            { icon: "⊞", label: "Overview", href: "/admin" },
            { icon: "👥", label: "Users", href: "/admin/users" },
            { icon: "💳", label: "Subscriptions", href: "/admin/subscriptions" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className={styles.sidebarLink}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/dashboard" className={styles.backLink}>← Back to Dashboard</Link>
      </aside>

      <main className={styles.adminMain}>
        <div className={styles.adminHeader}>
          <h1 className={styles.adminTitle}>Admin Overview</h1>
          <p className={styles.adminSub}>Real-time platform metrics and recent activity</p>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {STATS.map((s, i) => (
            <div key={i} className={`card ${styles.statCard}`}>
              <div className={styles.statIcon}>{s.icon}</div>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statChange}>{s.change}</p>
            </div>
          ))}
        </div>

        {/* Recent users */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Sign-ups</h2>
            <Link href="/admin/users" className="btn btn-ghost btn-sm">View All →</Link>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_USERS.map((u, i) => (
                  <tr key={i}>
                    <td>{u.email}</td>
                    <td>{u.plan}</td>
                    <td><span className={`badge ${STATUS_BADGE[u.status] ?? "badge-primary"}`}>{u.status}</span></td>
                    <td>{u.joined}</td>
                    <td>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button className="btn btn-ghost btn-sm">View</button>
                        <button className="btn btn-danger btn-sm">Revoke</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
