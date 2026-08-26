"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      className="btn btn-danger btn-sm"
      id="signout-btn"
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
