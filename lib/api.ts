import type { Category, Market, Product } from "./types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get(path: string): Promise<any> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch {
      /* next base try korbo */
    }
  }
  return null;
}

const BN = "০১২৩৪৫৬৭৮৯";

function num(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return 0;
  const s = v
    .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
    .replace(/[^\d.\-]/g, "");
  return Number(s) || 0;
}

function pick(o: any, keys: string[]): any {
  for (const k of keys) {
    if (o?.[k] !== undefined && o[k] !== null) return o[k];
  }
  return undefined;
}

function list(json: any): any[] {
  if (Array.isArray(json)) return json;
  if (!json || typeof json !== "object") return [];
  for (const k of ["data", "products", "categories", "items", "results"]) {
    if (Array.isArray(json[k])) return json[k];
  }
  const first = Object.values(json).find(Array.isArray);
  return (first as any[]) ?? [];
}

function toProduct(p: any): Product {
  const price = num(
    pick(p, ["price", "today_price", "todayPrice", "current_price", "currentPrice"])
  );

  const rawChange = pick(p, [
    "change", "change_percent", "changePercent", "percent", "percentage", "change_pct",
  ]);
  let change = 0;
  if (rawChange !== undefined) {
    change = num(rawChange);
    if (typeof rawChange === "string" && rawChange.includes("▼")) {
      change = -Math.abs(change);
    }
  } else {
    const prev = num(
      pick(p, ["previous_price", "previousPrice", "yesterday_price", "yesterdayPrice"])
    );
    change = prev ? ((price - prev) / prev) * 100 : 0;
  }

  const rawMarkets = pick(p, ["markets", "bazars", "bazar_prices", "prices"]);
  const markets: Market[] = Array.isArray(rawMarkets)
    ? rawMarkets.map((m: any) => ({
        name: String(pick(m, ["name", "market", "bazar", "bazar_name", "label"]) ?? ""),
        price: num(pick(m, ["price", "today_price", "value"])),
      }))
    : [];

  const prices = markets.map((m) => m.price).filter(Boolean);
  const min = num(pick(p, ["min", "min_price", "minPrice"])) || (prices.length ? Math.min(...prices) : price);
  const max = num(pick(p, ["max", "max_price", "maxPrice"])) || (prices.length ? Math.max(...prices) : price);
  const avg =
    num(pick(p, ["avg", "average", "avg_price", "avgPrice"])) ||
    (prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : price);

  const cat = pick(p, ["category", "category_slug", "categorySlug"]);
  const category = typeof cat === "object" && cat ? String(cat.slug ?? cat.id ?? "") : String(cat ?? "");

  const tags = pick(p, ["tags", "categories"]);

  return {
    id: String(pick(p, ["id", "_id"]) ?? ""),
    slug: String(pick(p, ["slug", "id", "_id"]) ?? ""),
    name: String(pick(p, ["name", "name_bn", "title", "nameBn"]) ?? ""),
    emoji: String(pick(p, ["emoji", "icon", "image"]) ?? "🛒"),
    unit: String(pick(p, ["unit", "unit_bn"]) ?? "কেজি"),
    category,
    price,
    change,
    description: String(pick(p, ["description", "summary", "subtitle"]) ?? ""),
    tags: Array.isArray(tags) ? tags.map(String) : [],
    min,
    max,
    avg,
    markets,
  };
}

function toCategory(c: any): Category {
  return {
    slug: String(pick(c, ["slug", "id", "_id"]) ?? ""),
    name: String(pick(c, ["name", "name_bn", "title", "label"]) ?? ""),
    emoji: String(pick(c, ["emoji", "icon"]) ?? ""),
  };
}

export async function getProducts(category?: string): Promise<Product[]> {
  const json = await get(category ? `/products?category=${category}` : "/products");
  return list(json).map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const json = await get(`/products/${slug}`);
  if (!json) return null;
  const item = Array.isArray(json) ? json[0] : json.data ?? json.product ?? json;
  return item && typeof item === "object" ? toProduct(item) : null;
}

export async function getCategories(): Promise<Category[]> {
  const json = await get("/categories");
  return list(json).map(toCategory);
}

export async function getCategory(slug: string): Promise<Category | null> {
  const json = await get(`/categories/${slug}`);
  if (!json) return null;
  const item = Array.isArray(json) ? json[0] : json.data ?? json.category ?? json;
  return item && typeof item === "object" ? toCategory(item) : null;
}