"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
const router = useRouter();
const { data: session, isPending } = authClient.useSession();

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function handleLogout() {
if (loading) return;

setLoading(true);
setError("");

try {
  const result = await authClient.signOut();

  if (result.error) {
    setError("Logout করা যায়নি। আবার চেষ্টা করো।");
    return;
  }

  router.replace("/");
  router.refresh();
} catch {
  setError("সমস্যা হয়েছে। আবার চেষ্টা করো।");
} finally {
  setLoading(false);
}


}

// Session check চললেও authentication buttons দেখাবে
if (isPending) {
return ( <div className="flex items-center gap-2"> <Link
       href="/signin"
       className="rounded-lg border border-base-300 px-3 py-2 text-sm font-semibold transition hover:bg-base-100"
     >
সাইন ইন </Link>


    <Link
      href="/signup"
      className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-content transition hover:opacity-90"
    >
      সাইন আপ
    </Link>
  </div>
);


}

// Login করা না থাকলে
if (!session?.user) {
return ( <div className="flex items-center gap-2"> <Link
       href="/signin"
       className="rounded-lg border border-base-300 px-3 py-2 text-sm font-semibold transition hover:bg-base-100"
     >
সাইন ইন </Link>


    <Link
      href="/signup"
      className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-content transition hover:opacity-90"
    >
      সাইন আপ
    </Link>
  </div>
);


}

// Login করা থাকলে user menu
const displayName = session.user.name || session.user.email || "ব্যবহারকারী";

return ( <div className="relative"> <details className="group"> <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3 py-2 transition hover:bg-base-200"> <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-content">
{displayName.charAt(0).toUpperCase()} </span>


      <span className="max-w-28 truncate text-sm font-semibold">
        {session.user.name || "আমার অ্যাকাউন্ট"}
      </span>

      <span className="text-xs">▾</span>
    </summary>

    <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-base-300 bg-base-100 p-3 shadow-xl">
      <p className="truncate font-semibold">
        {session.user.name || "ব্যবহারকারী"}
      </p>

      <p className="mt-1 truncate text-xs text-base-content/60">
        {session.user.email}
      </p>

      <div className="my-3 border-t border-base-300" />

      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-error transition hover:bg-base-200 disabled:opacity-50"
      >
        {loading ? "Logout হচ্ছে..." : "লগ আউট"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  </details>
</div>


);
}
