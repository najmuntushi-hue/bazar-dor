"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import { bnDate } from "@/lib/bn";
import type { Category } from "@/lib/types";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-base-300 bg-base-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-xl">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold">বাজার দর</span>
            <span
              className="block text-xs text-base-content/70"
              suppressHydrationWarning
            >
              {bnDate()}
            </span>
          </span>
        </Link>
        <UserMenu />
      </div>

      <nav className="border-t border-base-300">
        <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {categories.map((c) => {
            const href = `/category/${c.slug}`;
            const active = pathname === href;
            return (
              <li key={c.slug}>
                <Link
                  href={href}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
                    active
                      ? "bg-primary font-semibold text-primary-content"
                      : "hover:bg-secondary"
                  }`}
                >
                  <span>{c.emoji}</span>
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}