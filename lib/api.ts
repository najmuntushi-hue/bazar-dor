import type { Category, Market, Product } from "./types";

const BASES = [
  "https://api.abcz.workers.dev/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
];

async function get(path: string): Promise<any> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, {
        next: { revalidate: 300 },
      });

      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Try the next API base.
    }
  }

  return null;
}

function num(value: unknown): number {
  if (typeof value === "number") return value;

  if (typeof value !== "string") return 0;

  const s = value
    .replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)))
    .replace(/[^\d.-]/g, "");

  return Number(s) || 0;
}

function list(json: any): any[] {
  if (Array.isArray(json)) return json;

  if (!json || typeof json !== "object") {
    return [];
  }

  for (const key of [
    "data",
    "products",
    "categories",
    "items",
    "results",
  ]) {
    if (Array.isArray(json[key])) {
      return json[key];
    }
  }

  const firstArray = Object.values(json).find(Array.isArray);

  return (firstArray as any[]) ?? [];
}

function toProduct(p: any): Product {
  const price = num(p.today);

  const change = num(p.change?.pct);

  const rawMarkets = Array.isArray(p.markets) ? p.markets : [];

  const markets: Market[] = rawMarkets.map((m: any) => ({
    name: String(m.market ?? ""),
    price: Math.round(
      (num(m.min) + num(m.max)) / 2
    ),
  }));

  const marketPrices = rawMarkets
    .flatMap((m: any) => [num(m.min), num(m.max)])
    .filter((value) => value > 0);

  const min =
    marketPrices.length > 0
      ? Math.min(...marketPrices)
      : price;

  const max =
    marketPrices.length > 0
      ? Math.max(...marketPrices)
      : price;

  const avg =
    marketPrices.length > 0
      ? Math.round(
          marketPrices.reduce((sum, value) => sum + value, 0) /
            marketPrices.length
        )
      : price;

  return {
    id: String(p.id ?? ""),
    slug: String(p.slug ?? ""),
    name: String(p.nameBn ?? p.name ?? ""),
    emoji: String(p.image ?? p.categoryIcon ?? "🛒"),
    unit: String(p.unit ?? "kg"),
    category: String(p.category ?? ""),
    price,
    change,
    description: String(p.categoryNameBn ?? ""),
    tags: [],
    min,
    max,
    avg,
    markets,
  };
}

function toCategory(c: any): Category {
  return {
    slug: String(c.slug ?? c.id ?? ""),
    name: String(c.nameBn ?? c.name ?? c.categoryNameBn ?? ""),
    emoji: String(c.icon ?? c.image ?? c.categoryIcon ?? "🛒"),
  };
}

export async function getProducts(
  category?: string
): Promise<Product[]> {
  const json = await get(
    category
      ? `/products?category=${encodeURIComponent(category)}`
      : "/products"
  );

  return list(json).map(toProduct);
}

export async function getProduct(
  slug: string
): Promise<Product | null> {
  const json = await get(`/products/${slug}`);

  if (!json) return null;

  const item = Array.isArray(json)
    ? json[0]
    : json.data ?? json.product ?? json;

  return item && typeof item === "object"
    ? toProduct(item)
    : null;
}

export async function getCategories(): Promise<Category[]> {
  const json = await get("/categories");

  return list(json).map(toCategory);
}

export async function getCategory(
  slug: string
): Promise<Category | null> {
  const json = await get(`/categories/${slug}`);

  if (!json) return null;

  const item = Array.isArray(json)
    ? json[0]
    : json.data ?? json.category ?? json;

  return item && typeof item === "object"
    ? toCategory(item)
    : null;
}
