import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const isUp = product.change > 0;
  const isDown = product.change < 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* Back */}
      <Link
        href={`/category/${product.category}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        ← {product.description || "ক্যাটাগরিতে ফিরে যান"}
      </Link>

      {/* Product Header */}
      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Product Icon */}
        <div className="flex min-h-[280px] items-center justify-center rounded-3xl bg-secondary text-8xl">
          {product.emoji}
        </div>

        {/* Product Info */}
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="mb-2 text-sm text-base-content/60">
            {product.description}
          </div>

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            প্রতি {product.unit}
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-sm text-base-content/60">
                আজকের দাম
              </p>

              <p className="text-4xl font-bold text-primary">
                {formatPrice(product.price)} টাকা
              </p>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                isUp
                  ? "bg-success/10 text-success"
                  : isDown
                    ? "bg-error/10 text-error"
                    : "bg-base-200 text-base-content/60"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {Math.abs(product.change).toLocaleString("bn-BD")}%
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs text-base-content/60">
                সর্বনিম্ন
              </p>
              <p className="mt-1 text-lg font-bold">
                {formatPrice(product.min)} টাকা
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs text-base-content/60">
                গড় দাম
              </p>
              <p className="mt-1 text-lg font-bold">
                {formatPrice(product.avg)} টাকা
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs text-base-content/60">
                সর্বোচ্চ
              </p>
              <p className="mt-1 text-lg font-bold">
                {formatPrice(product.max)} টাকা
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Prices */}
      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">
            বাজারভিত্তিক দাম
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            বিভিন্ন বাজারে {product.name}-এর বর্তমান দাম
          </p>
        </div>

        {product.markets.length === 0 ? (
          <div className="rounded-2xl border border-base-300 bg-base-200 p-6 text-center">
            এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.markets.map((market) => (
              <div
                key={market.name}
                className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
              >
                <p className="font-semibold">
                  {market.name}
                </p>

                <p className="mt-2 text-xl font-bold text-primary">
                  {formatPrice(market.price)} টাকা
                </p>

                <p className="mt-1 text-xs text-base-content/50">
                  প্রতি {product.unit}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Price History */}
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">
          দামের ইতিহাস
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-base-300 p-5">
            <p className="text-sm text-base-content/60">
              আজ
            </p>
            <p className="mt-1 text-xl font-bold">
              {formatPrice(product.price)} টাকা
            </p>
          </div>

          <div className="rounded-2xl border border-base-300 p-5">
            <p className="text-sm text-base-content/60">
              গতকাল
            </p>
            <p className="mt-1 text-xl font-bold">
              {formatPrice(
                product.price - product.change
              )} টাকা
            </p>
          </div>

          <div className="rounded-2xl border border-base-300 p-5">
            <p className="text-sm text-base-content/60">
              গত সপ্তাহ
            </p>
            <p className="mt-1 text-xl font-bold">
              বাজারদর
            </p>
          </div>

          <div className="rounded-2xl border border-base-300 p-5">
            <p className="text-sm text-base-content/60">
              গত মাস
            </p>
            <p className="mt-1 text-xl font-bold">
              বাজারদর
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}