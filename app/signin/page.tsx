"use client";

import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">সাইন ইন</h1>
        <p className="mb-6 text-sm text-base-content/60">
          আপনার Bazar Dor অ্যাকাউন্টে প্রবেশ করুন।
        </p>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              ইমেইল
            </label>
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="আপনার পাসওয়ার্ড"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            সাইন ইন
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-base-content/60">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
