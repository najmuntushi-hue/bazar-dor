"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
const { data: session, isPending } = authClient.useSession();

if (isPending) {
return ( <main className="mx-auto max-w-3xl px-4 py-10"> <p>প্রোফাইল লোড হচ্ছে...</p> </main>
);
}

if (!session?.user) {
return ( <main className="mx-auto max-w-3xl px-4 py-10"> <div className="rounded-2xl border border-base-300 p-6"> <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1> <p className="mt-2">প্রোফাইল দেখতে আগে সাইন ইন করুন।</p> <Link href="/signin" className="btn btn-primary mt-4">
সাইন ইন </Link> </div> </main>
);
}

return ( <main className="mx-auto max-w-3xl px-4 py-10"> <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm"> <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1> <p className="mt-2 text-sm text-base-content/60">
Bazar Dor-এ আপনার অ্যাকাউন্টের তথ্য। </p>


    <div className="mt-6 space-y-4">
      <div>
        <p className="text-sm text-base-content/60">নাম</p>
        <p className="font-semibold">{session.user.name || "নাম দেওয়া নেই"}</p>
      </div>

      <div>
        <p className="text-sm text-base-content/60">ইমেইল</p>
        <p className="font-semibold">{session.user.email}</p>
      </div>
    </div>

    <Link
      href="/profile/update"
      className="btn btn-primary mt-6"
    >
      প্রোফাইল আপডেট
    </Link>
  </div>
</main>

);
}
