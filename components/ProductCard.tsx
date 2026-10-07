import Link from "next/link";
import { bnNumber, changeMeta, unitLabel } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ProductCard({ product: p }: { product: Product }) {
  const m = changeMeta(p.change);

  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-base-300 bg-base-200 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-base-300/60 text-2xl">
          {p.emoji}
        </span>
        <div>
          <h3 className="font-semibold leading-tight">{p.name}</h3>
          <p className="text-xs text-base-content/60">{unitLabel(p.unit)}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-base-content/60">আজকের দাম</p>
        <div className="flex items-end justify-between gap-2">
          <p className="text-xl font-bold">{bnNumber(p.price)} টাকা</p>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${m.cls}`}
          >
            {m.arrow} {m.text}
          </span>
        </div>
      </div>
    </Link>
  );
}