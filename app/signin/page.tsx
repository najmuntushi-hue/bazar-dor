"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function SignInPage() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [socialLoading, setSocialLoading] = useState<SocialProvider | "">("");
const [error, setError] = useState("");

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();


setError("");
setLoading(true);

try {
  const result = await authClient.signIn.email({
    email: email.trim(),
    password,
  });

  if (result.error) {
    setError(
      result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
    );
    return;
  }

  router.replace("/");
  router.refresh();
} catch (err) {
  console.error("Sign In error:", err);
  setError("সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
} finally {
  setLoading(false);
}


}

async function handleSocialSignIn(provider: SocialProvider) {
setError("");
setSocialLoading(provider);


try {
  const result = await authClient.signIn.social({
    provider,
    callbackURL: "/",
  });

  if (result.error) {
    setError(
      result.error.message ||
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে Sign In করা যায়নি।`
    );
    setSocialLoading("");
  }
} catch (err) {
  console.error(`${provider} Sign In error:`, err);
  setError("Social Sign In ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
  setSocialLoading("");
}


}

const isBusy = loading || socialLoading !== "";

return ( <main className="min-h-[70vh] bg-[#f0f6f1] px-4 py-12"> <div className="mx-auto flex max-w-md flex-col items-center"> <div className="mb-6 text-center"> <h1 className="text-2xl font-bold text-[#14231a]">
সাইন ইন </h1>


      <p className="mt-2 text-sm text-gray-500">
        নিজের বাজারদরের অ্যাকাউন্টে প্রবেশ করুন।
      </p>
    </div>

    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium"
          >
            ইমেইল
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="আপনার ইমেইল"
            className="input input-bordered w-full rounded-md bg-white"
            required
            disabled={isBusy}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium"
          >
            পাসওয়ার্ড
          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="আপনার পাসওয়ার্ড"
            className="input input-bordered w-full rounded-md bg-white"
            required
            disabled={isBusy}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isBusy}
          className="w-full rounded-md border border-[#15803d] bg-white py-2.5 text-sm font-semibold text-[#166534] transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-gray-400">
        <div className="h-px flex-1 bg-gray-200" />
        অথবা
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={isBusy}
          className="rounded-md border border-gray-200 px-2 py-2 text-xs font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "google"
            ? "Google খুলছে..."
            : "🌐 Google দিয়ে সাইন ইন"}
        </button>

        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          disabled={isBusy}
          className="rounded-md border border-gray-200 px-2 py-2 text-xs font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === "github"
            ? "GitHub খুলছে..."
            : "◉ GitHub দিয়ে সাইন ইন"}
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-gray-500">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-green-700 hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>

    <Link
      href="/"
      className="mt-5 text-xs text-gray-500 hover:text-green-700"
    >
      ← হোম পেজে ফিরে যান
    </Link>
  </div>
</main>


);
}
