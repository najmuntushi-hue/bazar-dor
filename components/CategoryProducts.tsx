"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown, { type SortValue } from "./SortDropdown";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortValue>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mt-6 flex items-center justify-end rounded-2xl border border-base-300 bg-base-200 px-4 py-3">
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <p className="mb-4 mt-5 text-sm text-base-content/60">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}