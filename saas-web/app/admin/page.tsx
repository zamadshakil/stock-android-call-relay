import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Users, CreditCard, Clock, Coins, LayoutDashboard, ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Admin — CallRelay",
  description: "Admin dashboard for CallRelay.",
};

// Mock data — replaced with real Supabase queries in production
const STATS = [
  { label: "Total Users", value: "248", icon: Users, change: "+12 this week" },
  { label: "Active Subscriptions", value: "184", icon: CreditCard, change: "74% conversion" },
  { label: "Trial Users", value: "36", icon: Clock, change: "7-day trials" },
  { label: "Revenue (PKR)", value: "515,200", icon: Coins, change: "This month" },
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

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
];

export default function AdminPage() {
  return (
    <div className={styles.adminPage}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarLogo}>
          <Zap size={18} className="text-accent inline-block mr-1" />
          Call<span>Relay</span>
        </Link>
        <p className={styles.adminLabel}>Admin Panel</p>
        <nav className={styles.sidebarNav}>
          {SIDEBAR_ITEMS.map((item) => {
            const IconComp = item.icon;
            return (
              <Link key={item.href} href={item.href} className={styles.sidebarLink}>
                <IconComp size={16} /> {item.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/dashboard" className={styles.backLink}>
          <ArrowLeft size={14} className="inline-block mr-1" /> Back to Dashboard
        </Link>
      </aside>

      <main className={styles.adminMain}>
        <div className={styles.adminHeader}>
          <h1 className={styles.adminTitle}>Admin Overview</h1>
          <p className={styles.adminSub}>Real-time platform metrics and recent activity</p>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {STATS.map((s, i) => {
            const StatIcon = s.icon;
            return (
              <div key={i} className={`card ${styles.statCard}`}>
                <div className={styles.statIcon}>
                  <StatIcon size={20} className="text-accent" />
                </div>
                <p className={styles.statValue}>{s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
                <p className={styles.statChange}>{s.change}</p>
              </div>
            );
          })}
        </div>

        {/* Recent users */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Sign-ups</h2>
            <Link href="/admin/users" className="btn btn-ghost btn-sm">
              View All <ArrowRight size={14} />
            </Link>
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
