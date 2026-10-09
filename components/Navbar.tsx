"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import UserMenu from "./UserMenu";
import { bnDate } from "@/lib/bn";
import type { Category } from "@/lib/types";

export default function Navbar({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    router.push(
      `/search?q=${encodeURIComponent(query)}`
    );
  }

  return (
    <header className="border-b border-base-300 bg-base-200">
      {/* Top Navbar */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-xl">
            🛒
          </span>

          <span className="leading-tight">
            <span className="block text-xl font-bold">
              বাজার দর
            </span>

            <span
              className="block text-xs text-base-content/70"
              suppressHydrationWarning
            >
              {bnDate()}
            </span>
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="order-3 flex w-full flex-1 md:order-2 md:max-w-md"
        >
          <div className="flex w-full items-center overflow-hidden rounded-xl border border-base-300 bg-base-100 focus-within:border-primary">
            <span className="px-3 text-lg">
              🔎
            </span>

            <input
              type="search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="পণ্যের নাম লিখে খুঁজুন..."
              className="w-full bg-transparent px-1 py-2.5 text-sm outline-none"
            />

            <button
              type="submit"
              className="bg-primary px-4 py-2.5 text-sm font-semibold text-primary-content transition hover:opacity-90"
            >
              খুঁজুন
            </button>
          </div>
        </form>

        {/* User Menu */}
        <div className="order-2 ml-auto md:order-3">
          <UserMenu />
        </div>
      </div>

      {/* Category Navigation */}
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