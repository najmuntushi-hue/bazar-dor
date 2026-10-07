import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="skeleton h-40 w-full rounded-3xl" />
      <div className="mt-10">
        <ProductSkeleton count={6} />
      </div>
    </div>
  );
}