
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";
import { bnNumber } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();

  const risers = [...products]
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10">
      {/* Hero Section */}
      <Hero />

      {/* Market Price Ticker */}
      <Ticker products={products} />

      {/* Products with Increased Prices */}
      <ProductSection
        title="আজ দাম বেড়েছে"
        arrow="▲"
        arrowClass="text-success"
        products={risers}
      />

      {/* Products with Decreased Prices */}
      <ProductSection
        title="আজ দাম কমেছে"
        arrow="▼"
        arrowClass="text-error"
        products={fallers}
      />

      {/* All Products */}
      <section
        id="সব-পণ্য"
        className="mt-12 scroll-mt-6"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-base-content/70">
            দৈনন্দিন প্রয়োজনীয় সব পণ্যের বর্তমান বাজারদর
          </p>

          <p className="mt-1 text-sm text-base-content/60">
            মোট {bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-base-300 p-8 text-center">
            <p className="text-3xl">🛒</p>

            <h3 className="mt-3 text-lg font-bold">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-1 text-sm text-base-content/60">
              কিছুক্ষণ পর আবার চেষ্টা করো।
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
