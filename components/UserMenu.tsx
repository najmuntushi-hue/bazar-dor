import Link from "next/link";

export default function UserMenu() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
        সাইন ইন
      </Link>
      <Link href="/signup" className="btn btn-outline btn-primary btn-sm sm:btn-md">
        সাইন আপ
      </Link>
    </div>
  );
}