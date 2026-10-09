export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-10">
      {/* Hero Skeleton */}
      <section className="mt-6">
        <div className="grid min-h-[320px] animate-pulse items-center gap-8 rounded-3xl bg-base-200 p-8 lg:grid-cols-2">
          <div>
            <div className="h-4 w-32 rounded bg-base-300" />

            <div className="mt-4 h-10 w-3/4 rounded bg-base-300" />

            <div className="mt-3 h-5 w-full rounded bg-base-300" />
            <div className="mt-2 h-5 w-2/3 rounded bg-base-300" />

            <div className="mt-6 h-11 w-32 rounded-xl bg-base-300" />
          </div>

          <div className="h-56 rounded-3xl bg-base-300" />
        </div>
      </section>

      {/* Product Sections */}
      {[1, 2].map((section) => (
        <section key={section} className="mt-10">
          <div className="mb-5">
            <div className="h-7 w-48 animate-pulse rounded bg-base-300" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-3xl border border-base-300 bg-base-100 p-5"
              >
                <div className="h-32 rounded-2xl bg-base-300" />

                <div className="mt-4 h-4 w-1/3 rounded bg-base-300" />

                <div className="mt-2 h-6 w-2/3 rounded bg-base-300" />

                <div className="mt-2 h-4 w-1/2 rounded bg-base-300" />

                <div className="mt-5 h-8 w-1/2 rounded bg-base-300" />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* All Products Skeleton */}
      <section className="mt-12">
        <div className="mb-5">
          <div className="h-7 w-32 animate-pulse rounded bg-base-300" />

          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-base-300" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-3xl border border-base-300 bg-base-100 p-5"
            >
              <div className="h-32 rounded-2xl bg-base-300" />

              <div className="mt-4 h-4 w-1/3 rounded bg-base-300" />

              <div className="mt-2 h-6 w-2/3 rounded bg-base-300" />

              <div className="mt-2 h-4 w-1/2 rounded bg-base-300" />

              <div className="mt-5 h-8 w-1/2 rounded bg-base-300" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}