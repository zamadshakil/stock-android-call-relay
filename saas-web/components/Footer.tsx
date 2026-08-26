import Link from "next/link";
import { Zap } from "lucide-react";
import styles from "./Footer.module.css";

const LINKS = {
  Product: [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/dashboard", label: "Dashboard" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "mailto:support@callrelay.app", label: "Contact" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Zap size={18} className="text-accent" />
            <span>Call<span className={styles.accent}>Relay</span></span>
          </Link>
          <p className={styles.tagline}>
            Bridge your Android calls to your iPhone. Stay connected, your way.
          </p>
          <div className={styles.disclaimer}>
            Not for emergency calls. Requires consenting participants.
          </div>
        </div>

        {Object.entries(LINKS).map(([group, links]) => (
          <div key={group} className={styles.col}>
            <p className={styles.colTitle}>{group}</p>
            <ul>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.colLink}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} CallRelay. All rights reserved.</span>
        <span className={styles.pkr}>Prices in PKR · Powered by Stripe</span>
      </div>
    </footer>
  );
}
