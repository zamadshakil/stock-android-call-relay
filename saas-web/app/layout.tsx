import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "CallRelay — Android Calls on Your iPhone", template: "%s | CallRelay" },
  description: "CallRelay bridges your Android SIM calls to your iPhone in real-time. Keep your number, use your iPhone. Start your free 7-day trial today.",
  keywords: ["call relay", "android to iphone", "call forwarding", "SIM relay", "iPhone call"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "CallRelay",
    title: "CallRelay — Android Calls on Your iPhone",
    description: "Bridge your Android SIM calls to your iPhone in real-time.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main style={{ paddingTop: "var(--nav-h)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
