import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton h-28 w-full rounded-3xl" />
      <div className="skeleton mt-6 h-16 w-full rounded-2xl" />
      <div className="mt-8">
        <ProductSkeleton count={6} />
      </div>
    </div>
  );
}