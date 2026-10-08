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
    return value;
  }

  if (typeof value !== "string") {
    return 0;
  }

  const s = value
    .replace(/[০-৯]/g, (d) =>
      String("০১২৩৪৫৬৭৮৯".indexOf(d))
    )
    .replace(/[^\d.-]/g, "");

  return Number(s) || 0;
}

/* =========================
   Emoji Fallback
   Only used when API icon
   is missing.
========================= */

function getFallbackEmoji(
  name: string,
  category: string
): string {
  const n = name
    .trim()
    .replace(/\s+/g, "");

  /* ===== চাল ===== */

  if (
    n.includes("স্বর্ণমাছি") ||
    n.includes("মিনিকেট") ||
    n.includes("নাজির") ||
    n.includes("বাটাম")
  ) {
    return "🍚";
  }

  /* ===== ডাল ===== */

  if (
    n.includes("আমনডাল") ||
    n.includes("আমন") ||
    n.includes("মসুরডাল") ||
    n.includes("মসুর") ||
    n.includes("মুগডাল") ||
    n.includes("মুগ") ||
    n.includes("ছোলা") ||
    n.includes("চোলা")
  ) {
    return "🫘";
  }

  /* ===== তেল ===== */

  if (
    n.includes("ঘানিভাঙাসরিষারতেল") ||
    n.includes("ঘানিভাঙাসরিষাতেল") ||
    n.includes("সরিষারতেল") ||
    n.includes("সরিষাতেল")
  ) {
    return "🫗";
  }

  if (n.includes("পামতেল")) {
    return "🫗";
  }

  /* ===== সবজি ===== */

  if (n.includes("আলু")) {
    return "🥔";
  }

  if (
    n.includes("পেঁয়াজ") ||
    n.includes("পেঁয়াজ")
  ) {
    return "🧅";
  }

  if (n.includes("কাঁচামরিচ")) {
    return "🌶️";
  }

  if (n.includes("বেগুন")) {
    return "🍆";
  }

  if (
    n.includes("ঢেঁড়স") ||
    n.includes("ঢেঁড়স")
  ) {
    return "🥬";
  }

  /* ===== মাছ ===== */

  if (n.includes("রুই")) {
    return "🐟";
  }

  if (
    n.includes("তেলাপিয়া") ||
    n.includes("তেলাপিয়া")
  ) {
    return "🐟";
  }

  if (n.includes("ইলিশ")) {
    return "🐟";
  }

  if (n.includes("কাতলা")) {
    return "🐟";
  }

  if (
    n.includes("চিংড়ি") ||
    n.includes("চিংড়ি")
  ) {
    return "🦐";
  }

  /* ===== মাংস ===== */

  if (n.includes("মুরগি")) {
    return "🍗";
  }

  if (n.includes("গরু")) {
    return "🥩";
  }

  if (n.includes("খাসি")) {
    return "🥩";
  }

  if (n.includes("হাঁস")) {
    return "🦆";
  }

  /* ===== ডিম-দুধ ===== */

  if (n.includes("ডিম")) {
    return "🥚";
  }

  if (n.includes("দুধ")) {
    return "🥛";
  }

  if (n.includes("দই")) {
    return "🥣";
  }

  if (n.includes("মাখন")) {
    return "🧈";
  }

  /* ===== মসলা ===== */

  if (n.includes("আদা")) {
    return "🫚";
  }

  if (n.includes("রসুন")) {
    return "🧄";
  }

  if (n.includes("মরিচ")) {
    return "🌶️";
  }

  if (n.includes("ধনে")) {
    return "🌿";
  }

  /* ===== Category fallback ===== */

  if (category === "chal") {
    return "🍚";
  }

  if (category === "dal") {
    return "🫘";
  }

  if (category === "tel") {
    return "🫗";
  }

  if (category === "sobji") {
    return "🥬";
  }

  if (category === "mach") {
    return "🐟";
  }

  if (category === "mangsho") {
    return "🍗";
  }

  if (category === "dim-dui") {
    return "🥛";
  }

  if (category === "mosla") {
    return "🌶️";
  }

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
    (item): item is any[] =>
      Array.isArray(item)
  );

  return firstArray ?? [];
}

/* =========================
   Product Mapper
========================= */

function toProduct(p: any): Product {
  const price = num(p.today);

  const yesterday = num(p.yesterday);

  const lastWeek = num(p.lastWeek);

  const lastMonth = num(p.lastMonth);

  const change = num(
    p.change?.pct
  );

  const rawMarkets =
    Array.isArray(p.markets)
      ? p.markets
      : [];

  const markets: Market[] =
    rawMarkets.map((m: any) => ({
      name: String(
        m.market ?? ""
      ),

      price: Math.round(
        (num(m.min) +
          num(m.max)) /
          2
      ),
    }));

  const marketPrices: number[] =
    rawMarkets
      .flatMap((m: any) => [
        num(m.min),
        num(m.max),
      ])
      .filter(
        (value: number) =>
          value > 0
      );

  const min =
    marketPrices.length > 0
      ? Math.min(
          ...marketPrices
        )
      : price;

  const max =
    marketPrices.length > 0
      ? Math.max(
          ...marketPrices
        )
      : price;

  const total =
    marketPrices.reduce(
      (sum: number, value: number) =>
        sum + value,
      0
    );

  const avg =
    marketPrices.length > 0
      ? Math.round(
          total /
            marketPrices.length
        )
      : price;

  const name = String(
    p.nameBn ??
      p.name ??
      ""
  );

  const category = String(
    p.category ?? ""
  );

  /*
   * API icon/image থাকলে
   * সেটাই আগে নেওয়া হবে।
   *
   * API icon না থাকলে
   * fallback emoji ব্যবহার হবে।
   */

  const apiIcon =
    typeof p.image === "string" &&
    p.image.trim() !== ""
      ? p.image.trim()
      : typeof p.icon === "string" &&
          p.icon.trim() !== ""
        ? p.icon.trim()
        : typeof p.emoji === "string" &&
            p.emoji.trim() !== ""
          ? p.emoji.trim()
          : "";

  const emoji =
    apiIcon !== ""
      ? apiIcon
      : getFallbackEmoji(
          name,
          category
        );

  return {
    id: String(
      p.id ?? ""
    ),

    slug: String(
      p.slug ?? ""
    ),

    name,

    emoji,

    unit: String(
      p.unit ?? "kg"
    ),

    category,

    price,

    yesterday,

    lastWeek,

    lastMonth,

    change,

    description: String(
      p.categoryNameBn ?? ""
    ),

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

function toCategory(
  c: any
): Category {
  return {
    slug: String(
      c.slug ??
        c.id ??
        ""
    ),

    name: String(
      c.nameBn ??
        c.name ??
        c.categoryNameBn ??
        ""
    ),

    emoji: String(
      c.icon ??
        c.image ??
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
      ? `/products?category=${encodeURIComponent(
          category
        )}`
      : "/products"
  );

  return list(json).map(
    toProduct
  );
}

/* =========================
   Get Single Product
========================= */

export async function getProduct(
  slug: string
): Promise<Product | null> {
  /*
   * API does not have:
   *
   * /products/:slug
   *
   * So we search products
   * category by category.
   */

  const categories =
    await getCategories();

  for (const category of categories) {
    const products =
      await getProducts(
        category.slug
      );

    const product =
      products.find(
        (item) =>
          item.slug === slug
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
  const json = await get(
    "/categories"
  );

  return list(json).map(
    toCategory
  );
}

/* =========================
   Get Single Category
========================= */

export async function getCategory(
  slug: string
): Promise<Category | null> {
  const categories =
    await getCategories();

  return (
    categories.find(
      (item) =>
        item.slug === slug
    ) ?? null
  );
}