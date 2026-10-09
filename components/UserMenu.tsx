"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("Logout করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      toast.success("সফলভাবে লগ আউট হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg border border-base-300 px-3 py-2 text-sm font-semibold transition hover:bg-base-100"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-content transition hover:opacity-90"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const displayName =
    session.user.name || session.user.email || "ব্যবহারকারী";

  return (
    <div className="relative">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3 py-2 transition hover:bg-base-200">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-content">
            {displayName.charAt(0).toUpperCase()}
          </span>

          <span className="max-w-28 truncate text-sm font-semibold">
            {session.user.name || "আমার অ্যাকাউন্ট"}
          </span>

          <span className="text-xs transition group-open:rotate-180">
            ▾
          </span>
        </summary>

        <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-base-300 bg-base-100 p-3 shadow-xl">
          <p className="truncate font-semibold">
            {displayName}
          </p>

          <p className="mt-1 truncate text-xs text-base-content/60">
            {session.user.email}
          </p>

          <div className="my-3 border-t border-base-300" />

          <Link
            href="/profile"
            className="block rounded-lg px-3 py-2 text-sm transition hover:bg-base-200"
          >
            👤 আমার প্রোফাইল
          </Link>

          <Link
            href="/profile/update"
            className="mt-1 block rounded-lg px-3 py-2 text-sm transition hover:bg-base-200"
          >
            ✏️ প্রোফাইল আপডেট
          </Link>

          <div className="my-3 border-t border-base-300" />

          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-error transition hover:bg-base-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "লগ আউট হচ্ছে..." : "↪ লগ আউট"}
          </button>
        </div>
      </details>
    </div>
  );
}