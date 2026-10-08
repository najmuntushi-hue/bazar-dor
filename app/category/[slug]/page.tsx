import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategories, getProducts } from "@/lib/api";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(slug),
  ]);

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 rounded-3xl bg-secondary p-6">
        <div className="mb-2 text-4xl">
          {category.emoji}
        </div>

        <h1 className="text-2xl font-bold">
          {category.name}
        </h1>

        <p className="mt-2 text-sm text-base-content/70">
          এই ক্যাটাগরির বাজারদর ও পণ্যের তথ্য দেখুন।
        </p>
      </div>

      <CategoryProducts products={products} />
    </main>
  );
}