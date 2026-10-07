import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";
import { bnNumber } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-6">
      <Hero />

      <ProductSection
        title="আজ দাম বেড়েছে"
        arrow="▲"
        arrowClass="text-error"
        products={risers}
      />
      <ProductSection
        title="আজ দাম কমেছে"
        arrow="▼"
        arrowClass="text-success"
        products={fallers}
      />

      <section id="সব-পণ্য" className="mt-12 scroll-mt-6">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 text-sm text-base-content/60">
          মোট {bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        {products.length === 0 ? (
          <p className="rounded-2xl border border-base-300 bg-base-200 p-6 text-center">
            ডেটা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}