import { bnDate, bnNumber } from "@/lib/bn";
import { getCategories, getProducts } from "@/lib/api";

export default async function Hero() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

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

        {/* Market Illustration + Statistics */}
        <div className="grid items-center gap-4 sm:grid-cols-2">
          {/* Illustration */}
          <div className="flex min-h-52 items-center justify-center rounded-3xl bg-base-100 p-4">
            <svg
              viewBox="0 0 240 220"
              role="img"
              aria-label="তাজা সবজি ও বাজারের ঝুড়ির চিত্র"
              className="w-full max-w-60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="120" cy="105" r="87" fill="#DCFCE7" />

              {/* Leaves */}
              <path
                d="M103 89 C65 79 65 43 68 35 C99 44 115 64 103 89Z"
                fill="#16A34A"
              />
              <path
                d="M111 84 C112 49 145 34 159 35 C156 67 136 84 111 84Z"
                fill="#15803D"
              />
              <path
                d="M109 91 L80 48 M111 85 L146 44"
                stroke="#BBF7D0"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Tomato */}
              <circle cx="70" cy="107" r="24" fill="#EF4444" />
              <path
                d="M70 83 L75 91 L85 87 L80 97 L88 101 L76 102 L70 110 L65 101 L54 100 L63 94 L61 86 L69 91Z"
                fill="#15803D"
              />

              {/* Carrot */}
              <path
                d="M140 95 L181 111 L155 163 Q151 169 148 161 L132 108Z"
                fill="#F97316"
              />
              <path
                d="M140 96 Q130 77 139 68 Q151 80 146 98Z"
                fill="#16A34A"
              />
              <path
                d="M145 99 Q151 78 164 78 Q165 93 148 103Z"
                fill="#15803D"
              />
              <path
                d="M145 117 L158 124 M151 133 L162 137"
                stroke="#FDBA74"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Basket */}
              <path
                d="M54 119 L186 119 L171 183 Q169 190 160 190 L80 190 Q71 190 69 182Z"
                fill="#D97706"
              />
              <path
                d="M82 120 Q120 52 158 120"
                fill="none"
                stroke="#92400E"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M80 132 L169 132 M76 151 L176 151 M73 170 L173 170"
                stroke="#FCD34D"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M98 124 L94 183 M124 124 L124 186 M150 124 L155 183"
                stroke="#FCD34D"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Decorative sparkles */}
              <path
                d="M39 63 L43 73 L53 77 L43 81 L39 91 L35 81 L25 77 L35 73Z"
                fill="#F59E0B"
              />
              <path
                d="M191 49 L194 57 L202 60 L194 63 L191 71 L188 63 L180 60 L188 57Z"
                fill="#F59E0B"
              />
            </svg>
          </div>

          {/* Statistics */}
          <div className="grid gap-3">
            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <p className="text-sm text-base-content/65">
                🛒 নিত্যপণ্যের তালিকা
              </p>
              <h2 className="mt-1 text-3xl font-extrabold">
                {bnNumber(products.length)}
              </h2>
              <p className="mt-1 text-xs text-base-content/60">
                টি নিত্যদিনের পণ্য
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <p className="text-sm text-base-content/65">
                🗂️ পণ্যের বিভাগ
              </p>
              <h2 className="mt-1 text-3xl font-extrabold">
                {bnNumber(categories.length)}
              </h2>
              <p className="mt-1 text-xs text-base-content/60">
                টি বিভাগ
              </p>
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
              <p className="text-sm text-base-content/65">
                🇧🇩 আমাদের লক্ষ্য
              </p>
              <h2 className="mt-1 text-lg font-bold">
                সবার জন্য বাজারদর
              </h2>
              <p className="mt-1 text-xs text-base-content/60">
                সহজ তথ্য, সহজ সিদ্ধান্ত
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
