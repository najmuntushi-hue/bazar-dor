import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ProductCard from "@/components/ProductCard";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";
import { bnNumber } from "@/lib/bn";

export default async function Home() {
  const products = await getProducts();

  // Top 6 products whose price increased the most
  const risers = products
    .filter((product) => product.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  // Top 6 products whose price decreased the most
  const fallers = products
    .filter((product) => product.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10">
      {/* =========================
          Hero Section
      ========================== */}
      <Hero />

      {/* =========================
          Price Ticker
      ========================== */}
      <Ticker products={products} />

      {/* =========================
          Price Increased
      ========================== */}
      <ProductSection
        title="আজ দাম বেড়েছে"
        arrow="▲"
        arrowClass="text-success"
        products={risers}
      />

      {/* =========================
          Price Decreased
      ========================== */}
      <ProductSection
        title="আজ দাম কমেছে"
        arrow="▼"
        arrowClass="text-error"
        products={fallers}
      />

      {/* =========================
          All Products
      ========================== */}
      <section
        id="সব-পণ্য"
        className="mt-12 scroll-mt-6"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            দৈনন্দিন প্রয়োজনীয় সব পণ্যের বর্তমান বাজারদর
          </p>

          <p className="mt-1 text-sm text-base-content/60">
            মোট {bnNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center">
            <div className="text-4xl">😕</div>

            <h3 className="mt-3 font-semibold">
              কোনো পণ্য পাওয়া যায়নি
            </h3>

            <p className="mt-1 text-sm text-base-content/60">
              ডেটা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
            </p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}