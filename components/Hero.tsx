import Image from "next/image";
import { bnDate, bnNumber } from "@/lib/bn";
import { getProducts } from "@/lib/api";

export default async function Hero() {
  const products = await getProducts();

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-base-300 bg-base-200">
      <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-2 md:p-10">
        {/* Hero Content */}
        <div className="relative z-10">
          <span
            className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-content"
            suppressHydrationWarning
          >
            📅 {bnDate()}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম
            <span className="mt-1 block text-primary">
              এক নজরে
            </span>
          </h1>

          <p className="mt-4 max-w-lg leading-7 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার
            সর্বশেষ বাজারদর জানুন এক জায়গায়। দামের
            পরিবর্তন দেখুন সহজেই।
          </p>

          <a
            href="#সব-পণ্য"
            className="btn btn-primary mt-6 gap-2 rounded-xl px-6"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </a>

          <p className="mt-3 text-xs text-base-content/60">
            সহজেই জানুন নিত্যপণ্যের বাজারদর
          </p>
        </div>

        {/* Hero Image and Statistics */}
        <div className="grid items-center gap-4 sm:grid-cols-2">
          {/* Hero Image */}
          <div className="flex min-h-52 items-center justify-center rounded-3xl bg-base-100 p-4">
            <Image
              src="/bazar-hero.png"
              alt="তাজা সবজি ও বাজারের ঝুড়ির চিত্র"
              width={480}
              height={440}
              priority
              className="h-auto w-full max-w-60 object-contain"
            />
          </div>

          {/* Statistics */}
          <div className="grid gap-3">
            {/* Products */}
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <p className="text-sm text-base-content/65">
                🛒 পণ্য
              </p>

              <h2 className="mt-1 text-3xl font-extrabold">
                {bnNumber(products.length)}
              </h2>

              <p className="mt-1 text-xs text-base-content/60">
                টি নিত্যদিনের পণ্য
              </p>
            </div>

            {/* Markets */}
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <p className="text-sm text-base-content/65">
                🏪 বাজার
              </p>

              <h2 className="mt-1 text-3xl font-extrabold">
                {bnNumber(12)}
              </h2>

              <p className="mt-1 text-xs text-base-content/60">
                টি বাজার অন্তর্ভুক্ত
              </p>
            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <p className="text-sm text-base-content/65">
                🗂️ বিভাগ
              </p>

              <h2 className="mt-1 text-3xl font-extrabold">
                {bnNumber(6)}
              </h2>

              <p className="mt-1 text-xs text-base-content/60">
                টি বিভাগের তথ্য
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
