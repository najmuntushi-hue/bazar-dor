"use client";

import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">সাইন আপ</h1>

        <p className="mb-6 text-sm text-base-content/60">
          Bazar Dor-এ নতুন অ্যাকাউন্ট তৈরি করুন।
        </p>

        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              নাম
            </label>
            <input
              type="text"
              placeholder="আপনার নাম"
              className="input input-bordered w-full"
              required
            />
          </div>

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
            সাইন আপ
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-base-content/60">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-primary hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
