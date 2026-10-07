import { bnNumber, changeMeta, unitShort } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const items = [...products, ...products]; // infinite loop er jonno duplicate

  return (
    <div className="overflow-hidden border-b border-base-300 bg-base-100">
      <div className="marquee-track">
        {items.map((p, i) => {
          const m = changeMeta(p.change);
          return (
            <div
              key={`${p.slug}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap border-r border-base-300 px-5 py-2.5 text-sm"
            >
              <span>{p.emoji}</span>
              <span className="font-medium">{p.name}</span>
              <span className="text-base-content/70">
                {bnNumber(p.price)} টাকা/{unitShort(p.unit)}
              </span>
              <span className={`font-semibold ${m.cls.split(" ")[0]}`}>
                {m.arrow} {m.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}