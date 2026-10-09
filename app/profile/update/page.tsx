
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdatePage() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setEmail(session.user.email ?? "");
    }
  }, [session]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "আপডেট করা যায়নি।");
        return;
      }

      setMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে!");

      // Refresh the page with the updated profile data.
      window.setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    } catch (err) {
      console.error("Profile update error:", err);
      setError("সার্ভারের সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <p>প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-2xl border border-base-300 p-6">
          <h1 className="text-2xl font-bold">
            প্রোফাইল আপডেট
          </h1>

          <p className="mt-2">
            এই পেজ ব্যবহার করতে আগে Sign In করুন।
          </p>

          <Link href="/signin" className="btn btn-primary mt-4">
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="text-2xl font-bold">
          প্রোফাইল আপডেট
        </h1>

        <p className="mt-2 text-sm text-base-content/60">
          তোমার নাম ও ইমেইল পরিবর্তন করো।
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className="label">
              <span className="label-text">নাম</span>
            </label>

            <input
              id="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="তোমার নাম লিখো"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={80}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="label">
              <span className="label-text">ইমেইল</span>
            </label>

            <input
              id="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="তোমার ইমেইল লিখো"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={254}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-success" role="status">
              {message}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "সেভ হচ্ছে..." : "Save Changes"}
            </button>

            <Link href="/profile" className="btn btn-outline">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
