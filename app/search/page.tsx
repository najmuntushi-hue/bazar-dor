import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default async function SearchPage({
  searchParams,
}: Props) {
  const { q } = await searchParams;

  const query = (q ?? "").trim().toLowerCase();

  if (!query) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-base-300 bg-base-200 p-10 text-center">
          <div className="text-5xl">🔎</div>

          <h1 className="mt-4 text-2xl font-bold">
            পণ্য খুঁজুন
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            উপরের Search Bar-এ পণ্যের নাম লিখে খুঁজুন।
          </p>
        </div>
      </main>
    );
  }

  const categories = await getCategories();

  const productLists = await Promise.all(
    categories.map((category) =>
      getProducts(category.slug)
    )
  );

  const allProducts: Product[] =
    productLists.flat();

  const products = allProducts.filter((product) => {
    const name = product.name.toLowerCase();
    const category = product.description.toLowerCase();

    return (
      name.includes(query) ||
      category.includes(query)
    );
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-secondary p-6">
        <p className="text-sm text-base-content/60">
          সার্চ রেজাল্ট
        </p>

        <h1 className="mt-1 text-2xl font-bold">
          “{q}” এর ফলাফল
        </h1>

        <p className="mt-2 text-sm text-base-content/60">
          মোট{" "}
          {new Intl.NumberFormat("bn-BD").format(
            products.length
          )}{" "}
          টি পণ্য পাওয়া গেছে।
        </p>
      </div>

      {/* No Result */}
      {products.length === 0 ? (
        <div className="rounded-3xl border border-base-300 bg-base-200 p-10 text-center">
          <div className="text-5xl">😕</div>

          <h2 className="mt-4 text-xl font-bold">
            কোনো পণ্য পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm text-base-content/60">
            অন্য কোনো পণ্যের নাম দিয়ে আবার চেষ্টা করুন।
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-content"
          >
            হোমে ফিরে যান
          </Link>
        </div>
      ) : (
        /* Results */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const isUp = product.change > 0;
            const isDown = product.change < 0;

            return (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="group rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex items-start justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary text-4xl">
                    {product.emoji}
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isUp
                        ? "bg-success/10 text-success"
                        : isDown
                          ? "bg-error/10 text-error"
                          : "bg-base-200 text-base-content/60"
                    }`}
                  >
                    {isUp
                      ? "▲"
                      : isDown
                        ? "▼"
                        : "—"}{" "}
                    {Math.abs(product.change).toLocaleString(
                      "bn-BD"
                    )}
                    %
                  </span>
                </div>

                {/* Product Info */}
                <div className="mt-4">
                  <p className="text-xs text-base-content/50">
                    {product.description}
                  </p>

                  <h2 className="mt-1 text-lg font-bold group-hover:text-primary">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-xs text-base-content/50">
                    প্রতি {product.unit}
                  </p>
                </div>

                {/* Price */}
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-base-content/50">
                      আজকের দাম
                    </p>

                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(product.price)} টাকা
                    </p>
                  </div>

                  <span className="text-sm font-medium text-primary">
                    বিস্তারিত →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}