
"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGoogleLink = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await authClient.linkSocial({
        provider: "google",
        callbackURL: "/profile",
      });

      if (result.error) {
        setMessage(result.error.message || "Google account link করা যায়নি।");
        setLoading(false);
      }
    } catch {
      setMessage("সমস্যা হয়েছে। আবার চেষ্টা করো।");
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p>প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-base-300 p-6">
          <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
          <p className="mt-2">
            প্রোফাইল দেখতে আগে সাইন ইন করুন।
          </p>
          <Link href="/signin" className="btn btn-primary mt-4">
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>

        <p className="mt-2 text-sm text-base-content/60">
          Bazar Dor-এ আপনার অ্যাকাউন্টের তথ্য।
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm text-base-content/60">নাম</p>
            <p className="font-semibold">
              {session.user.name || "নাম দেওয়া নেই"}
            </p>
          </div>

          <div>
            <p className="text-sm text-base-content/60">ইমেইল</p>
            <p className="font-semibold">{session.user.email}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/profile/update" className="btn btn-primary">
            প্রোফাইল আপডেট
          </Link>

          <button
            type="button"
            onClick={handleGoogleLink}
            disabled={loading}
            className="btn btn-outline"
          >
            {loading ? "Google খুলছে..." : "Google Account Link"}
          </button>
        </div>

        {message && (
          <p role="alert" className="mt-4 text-sm text-error">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
