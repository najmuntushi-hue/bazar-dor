import CategoryProducts from "@/components/CategoryProducts";
import EmptyState from "@/components/EmptyState";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category?.name || products.length === 0) {
    return (
      <EmptyState
        emoji="🛒"
        title="৪০৪ — এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="ক্যাটাগরিটি খুঁজে পাওয়া যায়নি অথবা এতে কোনো পণ্য নেই।"
      />
    );
  }

  const emoji = category.emoji || products[0].emoji;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="flex items-center gap-4 rounded-3xl border border-base-300 bg-base-200 p-6">
        <span className="text-6xl">{emoji}</span>
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-base-content/70">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      <CategoryProducts products={products} />
    </div>
  );
}