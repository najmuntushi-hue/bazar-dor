"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
const router = useRouter();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const [loading, setLoading] = useState(false);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();


setError("");
setSuccess("");
setLoading(true);

try {
  const { data, error: signUpError } =
    await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
    });

  if (signUpError) {
    setError(
      signUpError.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।"
    );
    return;
  }

  if (data) {
    setSuccess("অ্যাকাউন্ট তৈরি হয়েছে! এখন Sign In করুন।");

    setTimeout(() => {
      router.push("/signin");
      router.refresh();
    }, 1000);
  } else {
    setError("অ্যাকাউন্ট তৈরির ফলাফল পাওয়া যায়নি। আবার চেষ্টা করুন।");
  }
} catch (err) {
  console.error("Sign Up error:", err);
  setError("সমস্যা হয়েছে। ইন্টারনেট ও server পরীক্ষা করে আবার চেষ্টা করুন।");
} finally {
  setLoading(false);
}


}

return ( <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10"> <div className="w-full rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"> <h1 className="mb-2 text-2xl font-bold">সাইন আপ</h1>


    <p className="mb-6 text-sm text-base-content/60">
      Bazar Dor-এ নতুন অ্যাকাউন্ট তৈরি করুন।
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          নাম
        </label>
        <input
          id="name"
          type="text"
          placeholder="আপনার নাম"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          ইমেইল
        </label>
        <input
          id="email"
          type="email"
          placeholder="আপনার ইমেইল"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
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
          placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="text-sm text-success">
          {success}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
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
