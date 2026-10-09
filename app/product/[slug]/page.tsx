
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProduct(slug);

  if (!product) notFound();

  const isUp = product.change > 0;
  const isDown = product.change < 0;

  const markets = product.markets;
  const cheapest = [...markets].sort((a, b) => a.min - b.min)[0];
  const costliest = [...markets].sort((a, b) => b.max - a.max)[0];

  const marketAverage =
    markets.length > 0
      ? markets.reduce((sum, m) => sum + m.price, 0) / markets.length
      : product.avg;

  const priceHistory = [
    { label: "আজকের দাম", price: product.price },
    { label: "গতকালের দাম", price: product.yesterday },
    { label: "গত সপ্তাহের দাম", price: product.lastWeek },
    { label: "গত মাসের দাম", price: product.lastMonth },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href={`/category/${product.category}`}
        className="mb-6 inline-flex text-sm font-medium text-primary hover:underline"
      >
        ← ক্যাটাগরিতে ফিরে যান
      </Link>

      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex min-h-[250px] items-center justify-center rounded-3xl bg-secondary text-8xl">
          {product.emoji}
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <p className="mb-2 text-sm text-base-content/60">
            {product.description}
          </p>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="mt-2 text-sm text-base-content/60">
            প্রতি {product.unit}
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div>
              <p className="text-sm text-base-content/60">আজকের দাম</p>
              <p className="text-4xl font-bold text-primary">
                {formatPrice(product.price)} টাকা
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                isUp
                  ? "bg-success/10 text-success"
                  : isDown
                    ? "bg-error/10 text-error"
                    : "bg-base-200 text-base-content/60"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {formatPrice(Math.abs(product.change))}%
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs text-base-content/60">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-xl font-bold">
                {formatPrice(product.min)} টাকা
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs text-base-content/60">গড় দাম</p>
              <p className="mt-1 text-xl font-bold">
                {formatPrice(product.avg)} টাকা
              </p>
            </div>

            <div className="rounded-2xl bg-base-200 p-4">
              <p className="text-xs text-base-content/60">সর্বাধিক দাম</p>
              <p className="mt-1 text-xl font-bold">
                {formatPrice(product.max)} টাকা
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">দামের ইতিহাস</h2>
        <p className="mt-1 text-sm text-base-content/60">
          {product.name}-এর বিভিন্ন সময়ের বাজারদর
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {priceHistory.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-base-300 bg-base-100 p-5"
            >
              <p className="text-sm text-base-content/60">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-primary">
                {formatPrice(item.price)} টাকা
              </p>
              <p className="mt-1 text-xs text-base-content/50">
                প্রতি {product.unit}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
            <p className="mt-1 text-sm text-base-content/60">
              {product.name} · প্রতি {product.unit}
            </p>
          </div>

          <span className="badge badge-outline">
            মোট {formatPrice(markets.length)}টি বাজার
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <p className="text-sm text-base-content/60">সর্বনিম্ন বাজারদর</p>
            <p className="mt-2 text-xl font-bold text-success">
              {cheapest ? `${formatPrice(cheapest.min)} টাকা` : "তথ্য নেই"}
            </p>
            {cheapest && (
              <p className="mt-1 text-sm">{cheapest.name}</p>
            )}
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <p className="text-sm text-base-content/60">বাজারগুলোর গড়</p>
            <p className="mt-2 text-xl font-bold">
              {markets.length ? `${formatPrice(marketAverage)} টাকা` : "তথ্য নেই"}
            </p>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <p className="text-sm text-base-content/60">সর্বাধিক বাজারদর</p>
            <p className="mt-2 text-xl font-bold text-error">
              {costliest ? `${formatPrice(costliest.max)} টাকা` : "তথ্য নেই"}
            </p>
            {costliest && (
              <p className="mt-1 text-sm">{costliest.name}</p>
            )}
          </div>
        </div>

        {markets.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-base-300 bg-base-200 p-8 text-center">
            <p className="text-3xl">🏪</p>
            <p className="mt-3 font-semibold">
              বাজারভিত্তিক তথ্য পাওয়া যায়নি
            </p>
          </div>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>বাজারের নাম</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন</th>
                  <th>সর্বাধিক</th>
                  <th>গড় দাম</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr key={`${market.name}-${index}`}>
                    <td className="font-semibold">{market.name}</td>
                    <td>{market.division || "তথ্য নেই"}</td>
                    <td>{formatPrice(market.min)} টাকা</td>
                    <td>{formatPrice(market.max)} টাকা</td>
                    <td className="font-semibold text-primary">
                      {formatPrice(market.price)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-3 text-xs text-base-content/50">
          বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম API-তে পাওয়া তথ্যের ভিত্তিতে
          দেখানো হচ্ছে।
        </p>
      </section>
    </main>
  );
}