import { bnDate } from "@/lib/bn";

export default function Hero() {
  return (
    <section className="mt-6 grid items-center gap-6 rounded-3xl border border-base-300 bg-base-200 p-6 md:grid-cols-2 md:p-10">
      {/* Hero Content */}
      <div>
        <span
          className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-content"
          suppressHydrationWarning
        >
          {bnDate()}
        </span>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-3 text-base-content/70">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
          বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
          দামের পরিবর্তন এক জায়গায়।
        </p>

        <a href="#সব-পণ্য" className="btn btn-primary mt-5">
          সব পণ্য দেখুন
        </a>
      </div>

      {/* Image and Statistics */}
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {/* Market Basket */}
        <div
          className="text-6xl sm:text-7xl"
          aria-hidden="true"
        >
          🧺🍅
        </div>

        {/* Statistics Cards */}
        <div className="grid flex-1 gap-2">
          <div className="rounded-xl border border-base-300 bg-base-100 p-3">
            <h2 className="text-2xl font-bold">৩৩</h2>
            <p className="text-xs text-base-content/70 sm:text-sm">
              টি নিত্যদিনের পণ্য
            </p>
          </div>

          <div className="rounded-xl border border-base-300 bg-base-100 p-3">
            <h2 className="text-2xl font-bold">১২</h2>
            <p className="text-xs text-base-content/70 sm:text-sm">
              টি বাজার অন্তর্ভুক্ত
            </p>
          </div>

          <div className="rounded-xl border border-base-300 bg-base-100 p-3">
            <h2 className="text-2xl font-bold">৬</h2>
            <p className="text-xs text-base-content/70 sm:text-sm">
              টি বিভাগ
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

