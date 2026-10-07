import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

type Props = {
  title: string;
  arrow: string;
  arrowClass: string;
  products: Product[];
};

export default function ProductSection({ title, arrow, arrowClass, products }: Props) {
  if (!products.length) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
        <span className={`text-sm ${arrowClass}`}>{arrow}</span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}