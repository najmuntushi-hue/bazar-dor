import { bnDate } from "@/lib/bn";

export default function Hero() {
  return (
    <section className="mt-6 grid items-center gap-6 rounded-3xl border border-base-300 bg-base-200 p-6 md:grid-cols-2 md:p-10">
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
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
          গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="btn btn-primary mt-5">
          সব পণ্য দেখুন
        </a>
      </div>
      <div className="flex justify-center text-8xl sm:text-9xl" aria-hidden>
        🧺🍅
      </div>
    </section>
  );
}