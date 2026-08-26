"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setActivePath(window.location.pathname);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>Call<span className={styles.logoAccent}>Relay</span></span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${activePath === href ? styles.active : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className={styles.cta}>
            <Link href="/login" className="btn btn-ghost btn-sm">Log In</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Get Started →</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <ul className={styles.drawerLinks}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={styles.drawerLink} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.drawerCta}>
          <Link href="/login" className="btn btn-ghost btn-full" onClick={() => setMenuOpen(false)}>Log In</Link>
          <Link href="/signup" className="btn btn-primary btn-full" onClick={() => setMenuOpen(false)}>Get Started →</Link>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </>
  );
}
