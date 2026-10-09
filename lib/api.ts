
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

/* =========================
   Number Helper
========================= */

function num(value: unknown): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const s = value
    .replace(/[০-৯]/g, (d) =>
      String("০১২৩৪৫৬৭৮৯".indexOf(d))
    )
    .replace(/[^\d.-]/g, "");

  const result = Number(s);
  return Number.isFinite(result) ? result : 0;
}

/* =========================
   Emoji Fallback
========================= */

function getFallbackEmoji(
  name: string,
  category: string
): string {
  const n = name.trim().replace(/\s+/g, "");

  if (
    n.includes("স্বর্ণমাছি") ||
    n.includes("মিনিকেট") ||
    n.includes("নাজির") ||
    n.includes("বাটাম") ||
    category === "chal"
  ) {
    return "🍚";
  }

  if (
    n.includes("ডাল") ||
    n.includes("আমন") ||
    n.includes("মসুর") ||
    n.includes("মুগ") ||
    n.includes("ছোলা") ||
    n.includes("চোলা") ||
    category === "dal"
  ) {
    return "🫘";
  }

  if (
    n.includes("তেল") ||
    category === "tel"
  ) {
    return "🫗";
  }

  if (n.includes("আলু")) return "🥔";

  if (
    n.includes("পেঁয়াজ") ||
    n.includes("পেঁয়াজ")
  ) {
    return "🧅";
  }

  if (
    n.includes("মরিচ") ||
    category === "mosla"
  ) {
    return "🌶️";
  }

  if (n.includes("বেগুন")) return "🍆";

  if (
    n.includes("ঢেঁড়স") ||
    n.includes("ঢেঁড়স") ||
    category === "sobji"
  ) {
    return "🥬";
  }

  if (
    n.includes("চিংড়ি") ||
    n.includes("চিংড়ি")
  ) {
    return "🦐";
  }

  if (
    n.includes("রুই") ||
    n.includes("তেলাপিয়া") ||
    n.includes("তেলাপিয়া") ||
    n.includes("ইলিশ") ||
    n.includes("কাতলা") ||
    category === "mach"
  ) {
    return "🐟";
  }

  if (
    n.includes("মুরগি") ||
    category === "mangsho"
  ) {
    return "🍗";
  }

  if (
    n.includes("গরু") ||
    n.includes("খাসি")
  ) {
    return "🥩";
  }

  if (n.includes("হাঁস")) return "🦆";
  if (n.includes("ডিম")) return "🥚";
  if (n.includes("দুধ")) return "🥛";
  if (n.includes("দই")) return "🥣";
  if (n.includes("মাখন")) return "🧈";
  if (n.includes("আদা")) return "🫚";
  if (n.includes("রসুন")) return "🧄";

  if (category === "dim-dui") return "🥛";

  return "🛒";
}

/* =========================
   List Helper
========================= */

function list(json: any): any[] {
  if (Array.isArray(json)) {
    return json;
  }

  if (!json || typeof json !== "object") {
    return [];
  }

  for (const key of [
    "data",
    "products",
    "categories",
    "items",
    "results",
    "value",
  ]) {
    if (Array.isArray(json[key])) {
      return json[key];
    }
  }

  const firstArray = Object.values(json).find(
    (item): item is any[] => Array.isArray(item)
  );

  return firstArray ?? [];
}

/* =========================
   Market Mapper
========================= */

function toMarket(m: any): Market {
  const min = num(m.min);
  const max = num(m.max);

  // Use the middle of the actual min/max range.
  const price =
    min > 0 && max > 0
      ? Math.round((min + max) / 2)
      : min > 0
        ? min
        : max;

  return {
    name: String(
      m.market ?? m.marketNameBn ?? m.marketName ?? m.name ?? ""
    ),

    // Read the division only if the API provides it.
    division: String(
      m.divisionBn ??
        m.divisionNameBn ??
        m.divisionName ??
        m.division ??
        m.regionBn ??
        m.region ??
        ""
    ),

    min,
    max,
    price,
  };
}

/* =========================
   Product Mapper
========================= */

function toProduct(p: any): Product {
  const price = num(p.today);
  const yesterday = num(p.yesterday);
  const lastWeek = num(p.lastWeek);
  const lastMonth = num(p.lastMonth);
  const change = num(p.change?.pct);

  const rawMarkets = Array.isArray(p.markets)
    ? p.markets
    : [];

  const markets: Market[] = rawMarkets.map(toMarket);

  // Only use positive market prices to calculate the range.
  const marketMins = markets
    .map((market) => market.min)
    .filter((value) => value > 0);

  const marketMaxs = markets
    .map((market) => market.max)
    .filter((value) => value > 0);

  const validMarketPrices = markets
    .map((market) => market.price)
    .filter((value) => value > 0);

  const min =
    marketMins.length > 0
      ? Math.min(...marketMins)
      : price;

  const max =
    marketMaxs.length > 0
      ? Math.max(...marketMaxs)
      : price;

  const avg =
    validMarketPrices.length > 0
      ? Math.round(
          validMarketPrices.reduce(
            (sum, value) => sum + value,
            0
          ) / validMarketPrices.length
        )
      : price;

  const name = String(p.nameBn ?? p.name ?? "");
  const category = String(p.category ?? "");

  const apiIcon =
    typeof p.emoji === "string" && p.emoji.trim() !== ""
      ? p.emoji.trim()
      : typeof p.icon === "string" && p.icon.trim() !== ""
        ? p.icon.trim()
        : typeof p.image === "string" &&
            p.image.trim() !== "" &&
            !p.image.trim().startsWith("http")
          ? p.image.trim()
          : "";

  const emoji =
    apiIcon || getFallbackEmoji(name, category);

  return {
    id: String(p.id ?? ""),
    slug: String(p.slug ?? ""),
    name,
    emoji,
    unit: String(p.unit ?? "kg"),
    category,

    price,
    yesterday,
    lastWeek,
    lastMonth,
    change,

    description: String(p.categoryNameBn ?? ""),
    tags: [],

    min,
    max,
    avg,
    markets,
  };
}

/* =========================
   Category Mapper
========================= */

function toCategory(c: any): Category {
  return {
    slug: String(c.slug ?? c.id ?? ""),
    name: String(
      c.nameBn ??
        c.name ??
        c.categoryNameBn ??
        ""
    ),
    emoji: String(
      c.icon ??
        c.emoji ??
        c.categoryIcon ??
        "🛒"
    ),
  };
}

/* =========================
   Get Products
========================= */

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

/* =========================
   Get Single Product
========================= */

export async function getProduct(
  slug: string
): Promise<Product | null> {
  // First try the complete product list.
  const allProducts = await getProducts();

  const found = allProducts.find(
    (item) => item.slug === slug
  );

  if (found) {
    return found;
  }

  // If necessary, search category by category.
  const categories = await getCategories();

  for (const category of categories) {
    const products = await getProducts(category.slug);

    const product = products.find(
      (item) => item.slug === slug
    );

    if (product) {
      return product;
    }
  }

  return null;
}

/* =========================
   Get Categories
========================= */

export async function getCategories(): Promise<Category[]> {
  const json = await get("/categories");

  return list(json).map(toCategory);
}

/* =========================
   Get Single Category
========================= */

export async function getCategory(
  slug: string
): Promise<Category | null> {
  const categories = await getCategories();

  return (
    categories.find((item) => item.slug === slug) ?? null
  );
}
